import fs from "node:fs";
import zlib from "node:zlib";

const GREEN = [17, 97, 73, 255];
const WHITE = [255, 255, 255, Math.round(255 * 0.94)];
const YELLOW = [242, 201, 76, 255];

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function writePng(path, width, height, pixels) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  fs.writeFileSync(
    path,
    Buffer.concat([
      signature,
      chunk("IHDR", ihdr),
      chunk("IDAT", zlib.deflateSync(raw)),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
}

function roundedRectContains(px, py, x, y, width, height, radius) {
  const cx = Math.max(x + radius, Math.min(px, x + width - radius));
  const cy = Math.max(y + radius, Math.min(py, y + height - radius));
  return (px - cx) ** 2 + (py - cy) ** 2 <= radius ** 2;
}

function rectContains(px, py, x, y, width, height) {
  return px >= x && px <= x + width && py >= y && py <= y + height;
}

function circleContains(px, py, cx, cy, radius) {
  return (px - cx) ** 2 + (py - cy) ** 2 <= radius ** 2;
}

function lineContains(px, py, x1, y1, x2, y2, width) {
  const vx = x2 - x1;
  const vy = y2 - y1;
  const lenSq = vx * vx + vy * vy;
  const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * vx + (py - y1) * vy) / lenSq));
  const x = x1 + t * vx;
  const y = y1 + t * vy;
  return (px - x) ** 2 + (py - y) ** 2 <= (width / 2) ** 2;
}

function blendPixel(pixels, offset, color, coverage) {
  if (coverage <= 0) return;
  const srcA = (color[3] / 255) * coverage;
  const dstA = pixels[offset + 3] / 255;
  const outA = srcA + dstA * (1 - srcA);

  if (outA === 0) return;

  pixels[offset] = Math.round((color[0] * srcA + pixels[offset] * dstA * (1 - srcA)) / outA);
  pixels[offset + 1] = Math.round((color[1] * srcA + pixels[offset + 1] * dstA * (1 - srcA)) / outA);
  pixels[offset + 2] = Math.round((color[2] * srcA + pixels[offset + 2] * dstA * (1 - srcA)) / outA);
  pixels[offset + 3] = Math.round(outA * 255);
}

function drawShape(pixels, size, color, contains, samples = 3) {
  const sampleCount = samples * samples;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let hits = 0;
      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const px = ((x + (sx + 0.5) / samples) / size) * 512;
          const py = ((y + (sy + 0.5) / samples) / size) * 512;
          if (contains(px, py)) hits += 1;
        }
      }
      if (hits) blendPixel(pixels, (y * size + x) * 4, color, hits / sampleCount);
    }
  }
}

function renderIcon(size) {
  const pixels = Buffer.alloc(size * size * 4);

  drawShape(pixels, size, GREEN, (x, y) => roundedRectContains(x, y, 0, 0, 512, 512, 96));
  drawShape(pixels, size, WHITE, (x, y) => rectContains(x, y, 142, 150, 228, 242));
  drawShape(pixels, size, GREEN, (x, y) => lineContains(x, y, 172, 198, 340, 198, 28));
  drawShape(pixels, size, GREEN, (x, y) => lineContains(x, y, 172, 250, 340, 250, 28));
  drawShape(pixels, size, GREEN, (x, y) => lineContains(x, y, 172, 302, 288, 302, 28));
  drawShape(pixels, size, YELLOW, (x, y) => circleContains(x, y, 360, 360, 72));
  drawShape(
    pixels,
    size,
    GREEN,
    (x, y) => lineContains(x, y, 326, 360, 350, 384, 22) || lineContains(x, y, 350, 384, 394, 330, 22),
  );

  return pixels;
}

for (const size of [192, 512]) {
  writePng(new URL(`../icon-${size}.png`, import.meta.url), size, size, renderIcon(size));
}
