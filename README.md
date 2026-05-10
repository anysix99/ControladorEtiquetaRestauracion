# Gestión de Caducidades APPCC

Aplicación móvil pensada para un restaurante chino en España. Sirve para etiquetar preparaciones, productos descongelados, salsas abiertas, semi-elaborados y alimentos listos para servicio.

## Abrir

Abre:

`index.html`

En Android:

1. Abre la página con Chrome.
2. Usa `Añadir a pantalla de inicio`.
3. La app se abrirá con aspecto de aplicación móvil.

Para usarla durante mucho tiempo en varios móviles, despliega esta carpeta en un sitio HTTPS. Ver instrucciones en `DEPLOY_HTTPS.md`.

## Funciones

- Crear etiquetas internas de alimentos.
- Registrar nombre del alimento o preparación.
- Registrar fecha/hora de elaboración.
- Registrar fecha/hora de descongelación.
- Registrar fecha/hora de caducidad.
- Registrar conservación: refrigerado, congelado, ambiente o mantenimiento caliente.
- Registrar recomendación de uso/conservación.
- Registrar lote interno, responsable o ubicación.
- Selección múltiple de los 14 alérgenos habituales en la UE.
- Aviso de productos caducados o próximos a caducar.
- Plantillas adaptadas a cocina china: carne descongelada, marisco, arroz/fideos, salsas, rellenos, asados.
- Dos inicios separados: cocina y bar.
- Plantillas separadas por zona: cocina y bar.
- Caducidad programada por plantilla en horas, días o meses.
- Impresión de etiquetas, por defecto 80 mm x 50 mm.
- Tamaño de etiqueta editable (ancho/alto en mm).
- Uso directo de plantillas: al pulsar `Usar`, aparece un modal para indicar fecha de caducidad opcional y se imprime la etiqueta.

## Uso APPCC

Esta app es un apoyo para el autocontrol APPCC del restaurante. Ayuda a mantener identificación, trazabilidad interna, control de descongelación, control de caducidad y declaración interna de alérgenos.

Debe ajustarse a los procedimientos reales del local, los productos usados, la carta, los equipos de frío y los criterios definidos por el responsable APPCC.

## Alérgenos

Incluye las categorías usadas en España/UE:

Gluten, crustáceos, huevos, pescado, cacahuetes, soja, leche, frutos de cáscara, apio, mostaza, sésamo, sulfitos, altramuces y moluscos.

Base normativa/documental:

- AESAN: información sobre alergias, intolerancias y Reglamento UE 1169/2011: https://www.aesan.gob.es/en/AECOSAN/web/seguridad_alimentaria/subdetalle/alergias_e_intolerancias.htm
- Reglamento UE 1169/2011, anexo II: sustancias o productos que causan alergias o intolerancias: https://eur-lex.europa.eu/legal-content/ES/ALL/?uri=celex%3A32011R1169

## Impresión

Pulsa `Imprimir` en una tarjeta de alimento.

En Android puedes usar:

- Impresora de etiquetas Bluetooth.
- Impresora Wi-Fi.
- Impresión del sistema.

## Datos

Por defecto se guarda en `localStorage` del dispositivo.

También se puede guardar en Supabase para compartir los datos entre varios dispositivos:

1. Crea un proyecto en Supabase.
2. Abre `SQL Editor`.
3. Ejecuta `supabase_setup.sql`.
4. En la app, entra en `Ajustes` > `Sincronización Supabase`.
5. Rellena:
   - `Project URL` (ejemplo: `https://xxxx.supabase.co`)
   - `Anon key` (clave pública)
   - `Tabla` (`food_expiry_state`)
   - `ID restaurante` (ejemplo: `restaurante-chino`)
6. Pulsa `Guardar conexión`.
7. Pulsa `Probar` y luego `Subir`.

Si activas `Sincronizar automáticamente al guardar`, cada cambio se sube de forma automática.

## Archivos

- `index.html`: entrada de la app.
- `styles.css`: diseño móvil y estilo de impresión.
- `app.js`: lógica de registros, avisos y etiquetas.
- `manifest.webmanifest`: instalación PWA.
- `sw.js`: caché offline.
- `icon.svg`: icono.
- `supabase_setup.sql`: tabla y políticas para Supabase.
