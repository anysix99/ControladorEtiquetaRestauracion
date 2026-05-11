const STORE_KEY = "food-expiry-manager-es-v1";

const allergens = [
  "Gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes", "Soja", "Leche",
  "Frutos de cáscara", "Apio", "Mostaza", "Sésamo", "Sulfitos", "Altramuces", "Moluscos",
];

const storageMethods = ["Refrigerado", "Congelado", "Ambiente", "Mantenimiento caliente"];
const storageZh = {
  Refrigerado: "冷藏",
  Congelado: "冷冻",
  Ambiente: "常温",
  "Mantenimiento caliente": "热保温",
};
const templateAreas = ["kitchen", "bar"];
const expiryUnits = ["hours", "days", "months"];

const i18n = {
  es: {
    appTitle: "Gestión de Caducidades APPCC",
    kicker: "Restaurante chino · APPCC",
    headerTitle: "Control de Caducidades",
    notify: "Avisos",
    nav_dashboard: "Inicio",
    nav_dashboard_kitchen: "Cocina",
    nav_dashboard_bar: "Bar",
    nav_new: "Nuevo",
    nav_list: "Lista",
    nav_templates: "Plantillas",
    nav_settings: "Ajustes",
    modalTitle: "Imprimir desde plantilla",
    modalExpiry: "Fecha de caducidad (opcional)",
    modalPrint: "Imprimir",
    modalCancel: "Cancelar",
    manualExpiry: "Manual",
    noDate: "Sin fecha",
    expired: "Caducado",
    soon: "Caduca en {time}",
    ok: "Correcto {time}",
    min: "{n} min",
    h: "{n} h",
    hm: "{h} h {m} min",
    metricExpired: "Caducados",
    metricSoon: "Próximos",
    metricOk: "Correctos",
    metricTotal: "Total",
    quickActions: "Acciones rápidas",
    newLabel: "Nueva etiqueta",
    viewList: "Ver listado",
    nextExpiry: "Próximas caducidades",
    noFoods: "No hay alimentos registrados.",
    dashboardTemplates: "Plantillas creadas",
    dashboardSoonList: "Próximas a caducar",
    dashboardSoonEmpty: "No hay productos próximos a caducar.",
    appccControl: "Control APPCC",
    templateForChinese: "Plantillas para restaurante chino",
    templateHint: "Pulsa “Cargar” para rellenar el formulario o usa impresión directa.",
    load: "Cargar",
    opening: "Apertura",
    thaw: "Descongel.",
    editLabel: "Modificar etiqueta",
    newLabelAppcc: "Nueva etiqueta APPCC",
    useTemplate: "Usar plantilla",
    noTemplate: "Sin plantilla",
    nameFood: "Nombre del alimento / preparación",
    nameFoodPlaceholder: "Ej: pollo kung pao preparado",
    storage: "Conservación",
    makeTime: "Fecha y hora de elaboración",
    openTime: "Fecha y hora de apertura (开封时间)",
    thawTime: "Fecha y hora de descongelación",
    expiryTime: "Fecha y hora de caducidad",
    quickExpiry: "Caducidad rápida",
    suggestion: "Recomendación de uso / conservación",
    suggestionPlaceholder: "Ej: conservar refrigerado y usar utensilio limpio.",
    allergensTitle: "Alérgenos",
    note: "Lote interno / responsable / ubicación",
    notePlaceholder: "Ej: lote interno, responsable, cámara o estante",
    savePrint: "Guardar e imprimir",
    saveChanges: "Guardar cambios",
    saveOnly: "Solo guardar",
    labelPreview: "Vista previa de etiqueta",
    foodList: "Listado de alimentos",
    foodListHint: "Ordenado por caducidad. Lo que caduca antes aparece primero.",
    makeCol: "Elaboración",
    openCol: "Apertura",
    expiryCol: "Caducidad",
    thawCol: "Descongel.",
    allergensCol: "Alérgenos",
    notDeclared: "Sin declarar",
    print: "Imprimir",
    edit: "Modificar",
    delete: "Eliminar",
    templateName: "Nombre de plantilla",
    templateNamePlaceholder: "Ej: salsa casera refrigerada",
    templateArea: "Zona",
    kitchen: "Cocina",
    bar: "Bar",
    kitchenTemplates: "Plantillas cocina",
    barTemplates: "Plantillas bar",
    noAreaTemplates: "No hay plantillas en esta zona.",
    expiryProgrammed: "Caducidad programada",
    expiryAmount: "Cantidad",
    expiryUnit: "Unidad",
    expiryUnit_hours: "Horas",
    expiryUnit_days: "Días",
    expiryUnit_months: "Meses",
    defaultSuggestion: "Recomendación",
    defaultAllergens: "Alérgenos por defecto",
    saveTemplate: "Guardar plantilla",
    noAllergens: "Sin alérgenos",
    useOpen: "Usar apertura",
    useThaw: "Usar descongel.",
    add: "Añadir",
    addTemplate: "Añadir plantilla",
    newTemplateTitle: "Nueva plantilla",
    editTemplateTitle: "Modificar plantilla",
    templateActionTitle: "Seleccionar opción",
    settings: "Ajustes",
    shopName: "Nombre del establecimiento",
    reminderMinutes: "Aviso antes de caducar (minutos)",
    labelSize: "Tamaño de etiqueta",
    custom: "Personalizado",
    widthMm: "Ancho etiqueta (mm)",
    heightMm: "Alto etiqueta (mm)",
    autoPrintSave: "Imprimir automáticamente al guardar",
    no: "No",
    yes: "Sí",
    saveSettings: "Guardar ajustes",
    supabaseSync: "Sincronización Supabase",
    supabaseHint: "Para usar varios móviles u ordenadores. Usa solo anon/public key, no service role.",
    table: "Tabla",
    rowId: "ID restaurante",
    autoSyncSave: "Sincronizar automáticamente al guardar",
    saveConnection: "Guardar conexión",
    test: "Probar",
    upload: "Subir",
    download: "Descargar",
    lastSync: "Última sincronización",
    never: "Nunca",
    androidUse: "Uso en Android",
    androidHint1: "Abre esta página con Chrome y usa “Añadir a pantalla de inicio”. Para imprimir, conecta una impresora de etiquetas Bluetooth, Wi-Fi o usa la impresión del sistema.",
    androidHint2: "Diseñado como apoyo al autocontrol APPCC: identifica preparación, conservación, descongelación, caducidad y alérgenos.",
    exportCopy: "Exportar copia",
    clearAll: "Borrar todo",
    msgNeedNameExpiry: "Indica el nombre del alimento y la fecha de caducidad.",
    msgNeedExpiry: "Indica la fecha de caducidad.",
    msgNeedProgrammedExpiry: "Configura una caducidad programada en la plantilla para usar descongelación.",
    msgSavedChanges: "Cambios guardados.",
    msgSavedFood: "Alimento guardado.",
    msgDeletedRecord: "Registro eliminado.",
    msgSavedTemplate: "Plantilla guardada.",
    msgUpdatedTemplate: "Plantilla modificada.",
    msgDeletedTemplate: "Plantilla eliminada.",
    msgSavedSettings: "Ajustes guardados.",
    msgConfirmClear: "¿Seguro que quieres borrar todos los registros y plantillas?",
    msgCleared: "Datos borrados.",
    msgFromTemplate: "Etiqueta creada desde plantilla.",
    modeOpen: "Apertura / 开封时间",
    modeThaw: "Descongelación / 解冻时间",
    msgNoNotification: "Este navegador no permite avisos del sistema.",
    msgNotificationsOn: "Avisos activados.",
    msgNotificationsOff: "Avisos no activados.",
    msgExpired: "{name} está caducado. Retirar o revisar.",
    msgSoon: "{name} caduca en {time}.",
    notifyTitle: "Aviso de caducidad APPCC",
    msgSupabaseSaved: "Conexión Supabase guardada.",
    msgSupabaseMissing: "Faltan URL o anon key de Supabase.",
    msgSupabaseOk: "Conexión Supabase correcta.",
    msgSupabaseError: "Error Supabase: {error}",
    msgSupabaseUploaded: "Subido a Supabase.",
    msgSupabaseNoData: "No hay datos en Supabase para este ID.",
    msgSupabaseDownloaded: "Datos descargados de Supabase.",
    msgAndroidPrintSent: "Etiqueta enviada a D35BT.",
    msgAndroidPrintError: "No se pudo enviar a D35BT.",
  },
  zh: {
    appTitle: "APPCC保质期管理",
    kicker: "中餐馆 · APPCC",
    headerTitle: "保质期管理",
    notify: "提醒",
    nav_dashboard: "首页",
    nav_dashboard_kitchen: "厨房",
    nav_dashboard_bar: "酒吧",
    nav_new: "新建",
    nav_list: "列表",
    nav_templates: "模板",
    nav_settings: "设置",
    modalTitle: "从模板打印",
    modalExpiry: "到期时间（可选）",
    modalPrint: "打印",
    modalCancel: "取消",
    manualExpiry: "手动",
    noDate: "无日期",
    expired: "已过期",
    soon: "{time}后到期",
    ok: "正常 {time}",
    min: "{n}分钟",
    h: "{n}小时",
    hm: "{h}小时{m}分钟",
    metricExpired: "已过期",
    metricSoon: "即将到期",
    metricOk: "正常",
    metricTotal: "总数",
    quickActions: "快捷操作",
    newLabel: "新建标签",
    viewList: "查看列表",
    nextExpiry: "即将到期",
    noFoods: "暂无记录。",
    dashboardTemplates: "已创建模板",
    dashboardSoonList: "即将到期",
    dashboardSoonEmpty: "暂无即将到期的食品。",
    appccControl: "APPCC控制",
    templateForChinese: "中餐模板",
    templateHint: "点“载入”可填充表单，或直接打印。",
    load: "载入",
    opening: "开封",
    thaw: "解冻",
    editLabel: "修改标签",
    newLabelAppcc: "新建APPCC标签",
    useTemplate: "使用模板",
    noTemplate: "无模板",
    nameFood: "食品/备菜名称",
    nameFoodPlaceholder: "例如：宫保鸡丁（已备）",
    storage: "保存方式",
    makeTime: "制作时间",
    openTime: "开封时间 (开封时间)",
    thawTime: "解冻时间",
    expiryTime: "到期时间",
    quickExpiry: "快速到期",
    suggestion: "使用/保存建议",
    suggestionPlaceholder: "例如：冷藏保存，使用干净工具。",
    allergensTitle: "过敏原",
    note: "批次/负责人/位置",
    notePlaceholder: "例如：内部批次、负责人、冰箱层位",
    savePrint: "保存并打印",
    saveChanges: "保存修改",
    saveOnly: "仅保存",
    labelPreview: "标签预览",
    foodList: "食品列表",
    foodListHint: "按到期排序，最先到期在前。",
    makeCol: "制作",
    openCol: "开封",
    expiryCol: "到期",
    thawCol: "解冻",
    allergensCol: "过敏原",
    notDeclared: "未填写",
    print: "打印",
    edit: "修改",
    delete: "删除",
    templateName: "模板名称",
    templateNamePlaceholder: "例如：冷藏自制酱汁",
    templateArea: "区域",
    kitchen: "厨房",
    bar: "酒吧",
    kitchenTemplates: "厨房模板",
    barTemplates: "酒吧模板",
    noAreaTemplates: "这个区域暂无模板。",
    expiryProgrammed: "预设到期时间",
    expiryAmount: "数量",
    expiryUnit: "单位",
    expiryUnit_hours: "小时",
    expiryUnit_days: "天",
    expiryUnit_months: "月",
    defaultSuggestion: "建议",
    defaultAllergens: "默认过敏原",
    saveTemplate: "保存模板",
    noAllergens: "无过敏原",
    useOpen: "用于开封",
    useThaw: "用于解冻",
    add: "新增",
    addTemplate: "新增模板",
    newTemplateTitle: "新建模板",
    editTemplateTitle: "修改模板",
    templateActionTitle: "请选择操作",
    settings: "设置",
    shopName: "店铺名称",
    reminderMinutes: "到期前提醒（分钟）",
    labelSize: "标签尺寸",
    custom: "自定义",
    widthMm: "标签宽度 (mm)",
    heightMm: "标签高度 (mm)",
    autoPrintSave: "保存后自动打印",
    no: "否",
    yes: "是",
    saveSettings: "保存设置",
    supabaseSync: "Supabase 同步",
    supabaseHint: "用于多设备共享。仅使用 anon/public key，不要用 service role。",
    table: "表名",
    rowId: "餐厅ID",
    autoSyncSave: "保存时自动同步",
    saveConnection: "保存连接",
    test: "测试",
    upload: "上传",
    download: "下载",
    lastSync: "最后同步",
    never: "从未",
    androidUse: "Android 使用",
    androidHint1: "用 Chrome 打开并“添加到主屏幕”。打印时可连接蓝牙/无线标签打印机。",
    androidHint2: "用于APPCC自控：制作、保存、解冻、到期和过敏原记录。",
    exportCopy: "导出备份",
    clearAll: "清空全部",
    msgNeedNameExpiry: "请填写食品名称和到期时间。",
    msgNeedExpiry: "请填写到期时间。",
    msgNeedProgrammedExpiry: "使用解冻功能前，请先在模板中设置预设到期时间。",
    msgSavedChanges: "修改已保存。",
    msgSavedFood: "记录已保存。",
    msgDeletedRecord: "记录已删除。",
    msgSavedTemplate: "模板已保存。",
    msgUpdatedTemplate: "模板已修改。",
    msgDeletedTemplate: "模板已删除。",
    msgSavedSettings: "设置已保存。",
    msgConfirmClear: "确定要删除所有记录和模板吗？",
    msgCleared: "数据已清空。",
    msgFromTemplate: "已从模板创建并打印标签。",
    modeOpen: "开封 / Apertura",
    modeThaw: "解冻 / Descongelación",
    msgNoNotification: "此浏览器不支持系统通知。",
    msgNotificationsOn: "通知已开启。",
    msgNotificationsOff: "通知未开启。",
    msgExpired: "{name} 已过期，请移除或复核。",
    msgSoon: "{name} 将在 {time} 后到期。",
    notifyTitle: "APPCC 到期提醒",
    msgSupabaseSaved: "Supabase 连接已保存。",
    msgSupabaseMissing: "缺少 Supabase URL 或 anon key。",
    msgSupabaseOk: "Supabase 连接正常。",
    msgSupabaseError: "Supabase 错误: {error}",
    msgSupabaseUploaded: "已上传到 Supabase。",
    msgSupabaseNoData: "该 ID 在 Supabase 中没有数据。",
    msgSupabaseDownloaded: "已从 Supabase 下载数据。",
    msgAndroidPrintSent: "标签已发送到 D35BT。",
    msgAndroidPrintError: "无法发送到 D35BT。",
  },
};

function currentLanguage() {
  return state?.settings?.language === "zh" ? "zh" : "es";
}

function t(key, vars = {}) {
  const lang = currentLanguage();
  const text = i18n[lang]?.[key] || i18n.es[key] || key;
  return String(text).replaceAll(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
}

function storageLabel(name) {
  if (currentLanguage() !== "zh") return name;
  return storageZh[name] || name;
}

function normalizeTemplateArea(area) {
  return templateAreas.includes(area) ? area : "kitchen";
}

function templateAreaLabel(area) {
  return t(normalizeTemplateArea(area));
}

function normalizeExpiryUnit(unit) {
  return expiryUnits.includes(unit) ? unit : "hours";
}

function expiryUnitLabel(unit) {
  return t(`expiryUnit_${normalizeExpiryUnit(unit)}`);
}

function templateHoursFromProgram(amount, unit) {
  const value = Number(amount || 0);
  if (!Number.isFinite(value) || value <= 0) return 0;
  const normalizedUnit = normalizeExpiryUnit(unit);
  if (normalizedUnit === "days") return value * 24;
  if (normalizedUnit === "months") return value * 24 * 30;
  return value;
}

function templateHasProgrammedExpiry(tpl) {
  return Number(tpl?.expiryAmount ?? tpl?.hours ?? 0) > 0;
}

function templateExpiryLabel(tpl) {
  const amount = Number(tpl?.expiryAmount ?? tpl?.hours ?? 0);
  if (!Number.isFinite(amount) || amount <= 0) return t("manualExpiry");
  const unit = normalizeExpiryUnit(tpl?.expiryUnit);
  if (currentLanguage() === "zh") return `${amount}${unit === "hours" ? "小时" : unit === "days" ? "天" : "个月"}`;
  if (unit === "hours") return `${amount} h`;
  if (unit === "days") return `${amount} ${amount === 1 ? "día" : "días"}`;
  return `${amount} ${amount === 1 ? "mes" : "meses"}`;
}

let state = loadState();
let view = "dashboardKitchen";
let editingId = null;
let reminderTimer = null;
let supabaseSyncTimer = null;
let supabaseSyncBusy = false;
let activeTemplateForPrint = null;
let activeTemplateMode = "open";
let templateManualExpiryRequired = false;
let editingTemplateId = null;
let activeTemplateActionId = null;

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindTopActions();
  render();
  startReminderLoop();
  registerServiceWorker();
});

function defaultState() {
  return {
    settings: {
      language: "es",
      shopName: "Restaurante Chino",
      reminderMinutes: 120,
      labelSize: "80x50",
      labelWidthMm: 80,
      labelHeightMm: 50,
      autoPrintAfterSave: false,
    },
    supabase: {
      enabled: false,
      url: "",
      anonKey: "",
      table: "food_expiry_state",
      rowId: "restaurante-chino",
      lastSync: "",
    },
    templates: [
      template("Plato cocinado refrigerado", "Refrigerado", 48, "Conservar tapado en refrigeración. Recalentar completamente antes del servicio."),
      template("Carne descongelada", "Refrigerado", 24, "Descongelar en refrigeración. No volver a congelar. Separar de alimentos listos para consumo."),
      template("Marisco descongelado", "Refrigerado", 24, "Descongelar en refrigeración y usar lo antes posible. Evitar contaminación cruzada."),
      template("Arroz / fideos cocidos", "Refrigerado", 24, "Enfriar rápidamente, tapar y refrigerar. Recalentar completamente."),
      template("Salsa abierta", "Refrigerado", 72, "Mantener cerrada, usar utensilio limpio y respetar FIFO."),
      template("Semi-elaborado casero", "Refrigerado", 48, "Identificar lote interno y aplicar primero en entrar, primero en salir."),
      template("Relleno de dumplings", "Refrigerado", 24, "Mantener refrigerado y separado de producto listo para consumo."),
      template("Pato / carne asada", "Refrigerado", 48, "Conservar tapado. Evitar contacto con alimentos crudos."),
      template("Fruta cortada para bar", "Refrigerado", 24, "Mantener tapada en refrigeración y usar utensilio limpio.", "bar"),
      template("Bebida preparada refrigerada", "Refrigerado", 24, "Mantener tapada y refrigerada hasta el servicio.", "bar"),
      template("Leche / nata abierta", "Refrigerado", 72, "Mantener cerrada en refrigeración y respetar FIFO.", "bar"),
    ],
    foods: [],
    notified: {},
  };
}

function template(name, storage, expiryAmount, suggestion, area = "kitchen", expiryUnit = "hours") {
  const normalizedUnit = normalizeExpiryUnit(expiryUnit);
  return {
    id: makeId("tpl"),
    area: normalizeTemplateArea(area),
    name,
    storage,
    hours: templateHoursFromProgram(expiryAmount, normalizedUnit),
    expiryAmount: Number(expiryAmount || 0),
    expiryUnit: normalizedUnit,
    suggestion,
    allergens: [],
  };
}

function normalizeTemplate(tpl) {
  const value = tpl && typeof tpl === "object" ? tpl : {};
  const expiryUnit = normalizeExpiryUnit(value.expiryUnit);
  const expiryAmount = Number(value.expiryAmount ?? value.hours ?? 48);
  return {
    id: value.id || makeId("tpl"),
    area: normalizeTemplateArea(value.area),
    name: value.name || "",
    storage: storageMethods.includes(value.storage) ? value.storage : "Refrigerado",
    hours: Number(value.hours ?? templateHoursFromProgram(expiryAmount, expiryUnit)),
    expiryAmount: Number.isFinite(expiryAmount) ? expiryAmount : 48,
    expiryUnit,
    suggestion: value.suggestion || "",
    allergens: Array.isArray(value.allergens) ? value.allergens : [],
  };
}

function mergeState(input) {
  const base = defaultState();
  const value = input && typeof input === "object" ? input : {};
  const sourceTemplates = Array.isArray(value.templates) ? value.templates : null;
  const templates = sourceTemplates ? sourceTemplates.map(normalizeTemplate) : base.templates;
  const hasStoredTemplateArea = sourceTemplates?.some((tpl) =>
    tpl && typeof tpl === "object" && Object.prototype.hasOwnProperty.call(tpl, "area")
  );
  if (sourceTemplates && !hasStoredTemplateArea && !templates.some((tpl) => tpl.area === "bar")) {
    templates.push(...base.templates.filter((tpl) => tpl.area === "bar"));
  }
  return {
    ...base,
    ...value,
    settings: { ...base.settings, ...(value.settings || {}) },
    supabase: { ...base.supabase, ...(value.supabase || {}) },
    templates,
    foods: Array.isArray(value.foods) ? value.foods : [],
    notified: value.notified && typeof value.notified === "object" ? value.notified : {},
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return mergeState(parsed);
  } catch (error) {
    console.error(error);
    return defaultState();
  }
}

function saveState(options = {}) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  if (options.sync !== false) scheduleSupabaseSync();
}

function scheduleSupabaseSync() {
  if (!state.supabase?.enabled || !supabaseReady()) return;
  clearTimeout(supabaseSyncTimer);
  supabaseSyncTimer = setTimeout(() => {
    syncToSupabase({ silent: true });
  }, 1200);
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function nowLocalValue() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function addHours(datetimeLocal, hours) {
  const date = new Date(datetimeLocal);
  date.setHours(date.getHours() + Number(hours || 0));
  return toLocalValue(date);
}

function addTemplateExpiry(datetimeLocal, tpl) {
  const amount = Number(tpl?.expiryAmount ?? tpl?.hours ?? 0);
  if (!Number.isFinite(amount) || amount <= 0) return "";
  const date = new Date(datetimeLocal);
  if (Number.isNaN(date.getTime())) return "";
  const unit = normalizeExpiryUnit(tpl?.expiryUnit);
  if (unit === "months") {
    date.setMonth(date.getMonth() + amount);
  } else if (unit === "days") {
    date.setDate(date.getDate() + amount);
  } else {
    date.setHours(date.getHours() + amount);
  }
  return toLocalValue(date);
}

function toLocalValue(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("es-ES", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function fullDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function bindNavigation() {
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      view = button.dataset.view;
      editingId = null;
      render();
    });
  });
}

function bindTopActions() {
  document.getElementById("notifyBtn").addEventListener("click", requestNotifications);
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      state.settings.language = languageSelect.value === "zh" ? "zh" : "es";
      saveState({ sync: false });
      render();
    });
  }
}

function setActiveNav() {
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
}

function updateChromeTexts() {
  document.documentElement.lang = currentLanguage() === "zh" ? "zh" : "es";
  document.title = t("appTitle");
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) languageSelect.value = currentLanguage();
  const notifyBtn = document.getElementById("notifyBtn");
  if (notifyBtn) {
    notifyBtn.textContent = t("notify");
    notifyBtn.setAttribute("aria-label", t("notify"));
  }
  const kicker = document.getElementById("kickerText");
  if (kicker) kicker.textContent = t("kicker");
  const headerTitle = document.getElementById("headerTitle");
  if (headerTitle) headerTitle.textContent = t("headerTitle");
  const navMap = {
    dashboard: "nav_dashboard",
    dashboardKitchen: "nav_dashboard_kitchen",
    dashboardBar: "nav_dashboard_bar",
    new: "nav_new",
    list: "nav_list",
    templates: "nav_templates",
    settings: "nav_settings",
  };
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.textContent = t(navMap[button.dataset.view] || "");
  });
  const modalTitle = document.getElementById("templatePrintTitle");
  if (modalTitle) modalTitle.textContent = t("modalTitle");
  const expiryLabel = document.getElementById("templateExpiryLabel");
  if (expiryLabel) {
    expiryLabel.childNodes[0].textContent = `${t("modalExpiry")} `;
  }
  const printBtn = document.getElementById("templatePrintConfirmBtn");
  if (printBtn) printBtn.textContent = t("modalPrint");
  const cancelBtn = document.getElementById("templatePrintCancelBtn");
  if (cancelBtn) cancelBtn.textContent = t("modalCancel");
}

function render() {
  updateChromeTexts();
  setActiveNav();
  const screen = document.getElementById("screen");
  const renderers = {
    dashboard: () => renderDashboard("kitchen"),
    dashboardKitchen: () => renderDashboard("kitchen"),
    dashboardBar: () => renderDashboard("bar"),
    new: renderFoodForm,
    list: renderList,
    templates: renderTemplates,
    settings: renderSettings,
  };
  screen.innerHTML = (renderers[view] || renderers.dashboardKitchen)();
  bindScreenEvents();
}

function bindScreenEvents() {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      view = button.dataset.go;
      render();
    });
  });

  const foodForm = document.getElementById("foodForm");
  if (foodForm) bindFoodForm(foodForm);

  const templateForm = document.getElementById("templateForm");
  if (templateForm) bindTemplateForm(templateForm);

  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) bindSettingsForm(settingsForm);

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => printFood(button.dataset.print));
  });
  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      editingId = button.dataset.edit;
      view = "new";
      render();
    });
  });
  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteFood(button.dataset.delete));
  });
  document.querySelectorAll("[data-use-template]").forEach((button) => {
    button.addEventListener("click", () => openTemplatePrintModal(button.dataset.useTemplate, button.dataset.mode));
  });
  document.querySelectorAll("[data-template-action]").forEach((button) => {
    button.addEventListener("click", () => openTemplateActionModal(button.dataset.templateAction));
  });
  document.querySelectorAll("[data-apply-template]").forEach((button) => {
    button.addEventListener("click", () => applyTemplateToFoodForm(button.dataset.applyTemplate));
  });
  document.querySelectorAll("[data-delete-template]").forEach((button) => {
    button.addEventListener("click", () => deleteTemplate(button.dataset.deleteTemplate));
  });
  document.querySelectorAll("[data-edit-template]").forEach((button) => {
    button.addEventListener("click", () => openTemplateCreateModal(button.dataset.editTemplate));
  });
  document.querySelectorAll("[data-open-template-create]").forEach((button) => {
    button.addEventListener("click", () => openTemplateCreateModal(null, button.dataset.templateArea));
  });
  document.getElementById("templateCreateCancelBtn")?.addEventListener("click", closeTemplateCreateModal);
  document.getElementById("templateCreateModal")?.addEventListener("click", (event) => {
    if (event.target.id === "templateCreateModal") closeTemplateCreateModal();
  });
  document.getElementById("templateActionOpenBtn")?.addEventListener("click", () => runTemplateAction("open"));
  document.getElementById("templateActionThawBtn")?.addEventListener("click", () => runTemplateAction("thaw"));
  document.getElementById("templateActionEditBtn")?.addEventListener("click", () => runTemplateAction("edit"));
  document.getElementById("templateActionDeleteBtn")?.addEventListener("click", () => runTemplateAction("delete"));
  document.getElementById("templateActionCancelBtn")?.addEventListener("click", closeTemplateActionModal);
  document.getElementById("templateActionModal")?.addEventListener("click", (event) => {
    if (event.target.id === "templateActionModal") closeTemplateActionModal();
  });
}

function getFoodStatus(food) {
  const now = Date.now();
  const expiry = new Date(food.expiryTime).getTime();
  const diffMin = Math.floor((expiry - now) / 60000);
  if (Number.isNaN(expiry)) return { key: "unknown", text: t("noDate"), className: "warn", diffMin: 0 };
  if (diffMin < 0) return { key: "expired", text: t("expired"), className: "bad", diffMin };
  if (diffMin <= Number(state.settings.reminderMinutes)) {
    return { key: "soon", text: t("soon", { time: humanMinutes(diffMin) }), className: "warn", diffMin };
  }
  return { key: "ok", text: t("ok", { time: humanMinutes(diffMin) }), className: "ok", diffMin };
}

function humanMinutes(min) {
  const m = Math.max(0, Number(min || 0));
  if (m < 60) return t("min", { n: m });
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? t("hm", { h, m: rest }) : t("h", { n: h });
}

function sortedFoods() {
  return [...state.foods].sort((a, b) => new Date(a.expiryTime) - new Date(b.expiryTime));
}

function activeFoods() {
  return sortedFoods().filter((food) => !food.discarded);
}

function templatesForArea(area) {
  const normalizedArea = normalizeTemplateArea(area);
  return state.templates.filter((tpl) => normalizeTemplateArea(tpl.area) === normalizedArea);
}

function templateOptionsHtml() {
  return templateAreas.map((area) => {
    const templates = templatesForArea(area);
    if (!templates.length) return "";
    return `
      <optgroup label="${escapeHtml(t(`${area}Templates`))}">
        ${templates.map((tpl) => `<option value="${tpl.id}">${escapeHtml(tpl.name)} - ${templateExpiryLabel(tpl)}</option>`).join("")}
      </optgroup>
    `;
  }).join("");
}

function renderDashboardTemplateGroup(area) {
  const templates = templatesForArea(area);
  return `
    <div class="template-area-group">
      <div class="dashboard-template-list">
        ${templates.length
          ? templates.map((tpl) => `
            <button class="primary dashboard-template-btn" data-template-action="${tpl.id}" type="button">
              ${escapeHtml(tpl.name)}
            </button>
          `).join("")
          : `<p class="muted">${t("noAreaTemplates")}</p>`}
      </div>
    </div>
  `;
}

function renderTemplateRows(area) {
  const templates = templatesForArea(area);
  return `
    <section class="template-area-group">
      <h3 class="template-area-title">${t(`${area}Templates`)}</h3>
      ${templates.length
        ? `
          <div class="grid">
            ${templates.map((tpl) => `
              <article class="template-row">
                <h3>${escapeHtml(tpl.name)}</h3>
                <span class="muted">${storageLabel(tpl.storage)} · ${templateExpiryLabel(tpl)} · ${(tpl.allergens || []).join(", ") || t("noAllergens")}</span>
                <p class="muted">${escapeHtml(tpl.suggestion || "")}</p>
                <div class="actions">
                  <button class="secondary" data-use-template="${tpl.id}" data-mode="open" type="button">${t("useOpen")}</button>
                  <button class="secondary" data-use-template="${tpl.id}" data-mode="thaw" type="button">${t("useThaw")}</button>
                  <button class="secondary" data-edit-template="${tpl.id}" type="button">${t("edit")}</button>
                  <button class="danger" data-delete-template="${tpl.id}" type="button">${t("delete")}</button>
                </div>
              </article>
            `).join("")}
          </div>
        `
        : `<p class="muted">${t("noAreaTemplates")}</p>`}
    </section>
  `;
}

function foodArea(food) {
  return normalizeTemplateArea(food?.area);
}

function renderDashboard(area = "kitchen") {
  const normalizedArea = normalizeTemplateArea(area);
  const soonFoods = activeFoods().filter((food) =>
    foodArea(food) === normalizedArea && getFoodStatus(food).key === "soon"
  );

  return `
    <section class="panel template-panel">
      <h2>${t(`${normalizedArea}Templates`)}</h2>
      <button class="secondary corner-add-btn" data-open-template-create data-template-area="${normalizedArea}" type="button">${t("add")}</button>
      ${renderDashboardTemplateGroup(normalizedArea)}
      ${templateCreateModalHtml()}
      ${templateActionModalHtml()}
    </section>

    <section class="panel">
      <h2>${t("dashboardSoonList")}</h2>
      ${soonFoods.length
        ? `
          <div class="dashboard-soon-list">
            ${soonFoods.map((food, idx) => `
              <div class="dashboard-soon-row">
                <span class="dashboard-soon-index">${idx + 1}</span>
                <span class="dashboard-soon-name">${escapeHtml(food.name)}</span>
              </div>
            `).join("")}
          </div>
        `
        : `<p class="muted">${t("dashboardSoonEmpty")}</p>`}
    </section>
  `;
}

function metric(title, value, status) {
  return `
    <article class="panel metric">
      <span class="status ${status}">${title}</span>
      <strong>${value}</strong>
      <span class="muted">${t("appccControl")}</span>
    </article>
  `;
}

function renderFoodForm() {
  const editing = editingId ? state.foods.find((food) => food.id === editingId) : null;
  const base = editing || {
    name: "",
    storage: "Refrigerado",
    makeTime: nowLocalValue(),
    openTime: nowLocalValue(),
    thawTime: "",
    expiryTime: addHours(nowLocalValue(), 48),
    suggestion: "",
    allergens: [],
    note: "",
  };
  return `
    <section class="panel">
      <h2>${editing ? t("editLabel") : t("newLabelAppcc")}</h2>
      <form id="foodForm" class="form">
        <label>${t("useTemplate")}
          <select name="templateId">
            <option value="">${t("noTemplate")}</option>
            ${templateOptionsHtml()}
          </select>
        </label>

        <label>${t("nameFood")}
          <input name="name" value="${escapeHtml(base.name)}" required placeholder="${escapeHtml(t("nameFoodPlaceholder"))}">
        </label>

        <label>${t("storage")}
          <select name="storage">
            ${storageMethods.map((method) => `<option value="${method}" ${base.storage === method ? "selected" : ""}>${storageLabel(method)}</option>`).join("")}
          </select>
        </label>

        <label>${t("makeTime")}
          <input name="makeTime" type="datetime-local" value="${escapeHtml(base.makeTime || nowLocalValue())}" required>
        </label>

        <label>${t("openTime")}
          <input name="openTime" type="datetime-local" value="${escapeHtml(base.openTime || "")}">
        </label>

        <label>${t("thawTime")}
          <input name="thawTime" type="datetime-local" value="${escapeHtml(base.thawTime || "")}">
        </label>

        <label>${t("expiryTime")}
          <input name="expiryTime" type="datetime-local" value="${escapeHtml(base.expiryTime || "")}" required>
        </label>

        <fieldset>
          <legend>${t("quickExpiry")}</legend>
          <div class="segmented">
            <button data-hours="24" type="button">24 h</button>
            <button data-hours="48" type="button">48 h</button>
            <button data-hours="72" type="button">72 h</button>
          </div>
        </fieldset>

        <label>${t("suggestion")}
          <textarea name="suggestion" placeholder="${escapeHtml(t("suggestionPlaceholder"))}">${escapeHtml(base.suggestion || "")}</textarea>
        </label>

        <fieldset>
          <legend>${t("allergensTitle")}</legend>
          <div class="check-grid">
            ${allergens.map((name) => `
              <label class="check-card">
                <input type="checkbox" name="allergens" value="${name}" ${(base.allergens || []).includes(name) ? "checked" : ""}>
                <span>${name}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>

        <label>${t("note")}
          <textarea name="note" placeholder="${escapeHtml(t("notePlaceholder"))}">${escapeHtml(base.note || "")}</textarea>
        </label>

        <div class="actions">
          <button class="primary" type="submit">${editing ? t("saveChanges") : t("savePrint")}</button>
          <button class="secondary" id="saveOnlyBtn" type="button">${t("saveOnly")}</button>
        </div>
      </form>
    </section>

    <section class="panel">
      <h2>${t("labelPreview")}</h2>
      <div id="labelPreview" class="label-preview"></div>
    </section>
  `;
}

function applyTemplateToFoodForm(templateId) {
  const form = document.getElementById("foodForm");
  if (!form) return;
  const select = form.elements.templateId;
  if (!select) return;
  select.value = templateId || "";
  select.dispatchEvent(new Event("change", { bubbles: true }));
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindFoodForm(form) {
  const templateSelect = form.elements.templateId;
  const makeTime = form.elements.makeTime;
  const openTime = form.elements.openTime;
  const expiryTime = form.elements.expiryTime;
  const preview = document.getElementById("labelPreview");
  const templateExpiryBase = () => openTime.value || makeTime.value || nowLocalValue();

  const updatePreview = () => {
    preview.innerHTML = labelHtml(formToFood(form, { id: editingId || "preview" }), { preview: true });
  };

  templateSelect.addEventListener("change", () => {
    const tpl = state.templates.find((item) => item.id === templateSelect.value);
    if (!tpl) {
      updatePreview();
      return;
    }
    if (!form.elements.name.value) form.elements.name.value = tpl.name;
    form.elements.storage.value = tpl.storage;
    form.elements.suggestion.value = tpl.suggestion || "";
    const programmedExpiry = addTemplateExpiry(templateExpiryBase(), tpl);
    if (programmedExpiry) expiryTime.value = programmedExpiry;
    setSelectedAllergens(form, tpl.allergens || []);
    updatePreview();
  });

  const refreshTemplateExpiry = () => {
    const tpl = state.templates.find((item) => item.id === templateSelect.value);
    const programmedExpiry = tpl ? addTemplateExpiry(templateExpiryBase(), tpl) : "";
    if (programmedExpiry) expiryTime.value = programmedExpiry;
    updatePreview();
  };

  makeTime.addEventListener("change", refreshTemplateExpiry);
  openTime.addEventListener("change", refreshTemplateExpiry);

  form.querySelectorAll("[data-hours]").forEach((button) => {
    button.addEventListener("click", () => {
      expiryTime.value = addHours(makeTime.value || nowLocalValue(), button.dataset.hours);
      updatePreview();
    });
  });

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const food = saveFood(form);
    printFood(food.id);
  });

  document.getElementById("saveOnlyBtn").addEventListener("click", () => {
    saveFood(form);
  });

  updatePreview();
}

function setSelectedAllergens(form, selected) {
  form.querySelectorAll("[name='allergens']").forEach((input) => {
    input.checked = selected.includes(input.value);
  });
}

function formToFood(form, extra = {}) {
  const data = Object.fromEntries(new FormData(form).entries());
  const makeTime = data.makeTime || nowLocalValue();
  const openTime = data.openTime || makeTime;
  const thawTime = data.thawTime || "";
  const tpl = state.templates.find((item) => item.id === data.templateId);
  const existing = editingId ? state.foods.find((item) => item.id === editingId) : null;
  return {
    ...extra,
    area: normalizeTemplateArea(tpl?.area || existing?.area || extra.area),
    name: (data.name || "").trim(),
    storage: data.storage || "Refrigerado",
    makeTime,
    openTime,
    thawTime,
    expiryTime: data.expiryTime || "",
    suggestion: (data.suggestion || "").trim(),
    note: (data.note || "").trim(),
    allergens: Array.from(form.querySelectorAll("[name='allergens']:checked")).map((input) => input.value),
    updatedAt: new Date().toISOString(),
  };
}

function saveFood(form) {
  const food = formToFood(form);
  if (!food.name || !food.expiryTime) {
    toast(t("msgNeedNameExpiry"));
    throw new Error("missing required fields");
  }

  if (editingId) {
    const index = state.foods.findIndex((item) => item.id === editingId);
    food.id = editingId;
    food.createdAt = state.foods[index]?.createdAt || new Date().toISOString();
    state.foods[index] = food;
    toast(t("msgSavedChanges"));
  } else {
    food.id = makeId("food");
    food.createdAt = new Date().toISOString();
    state.foods.push(food);
    toast(t("msgSavedFood"));
  }

  editingId = null;
  saveState();
  render();
  return food;
}

function renderList() {
  const foods = activeFoods();
  return `
    <section class="panel">
      <h2>${t("foodList")}</h2>
      <p class="muted">${t("foodListHint")}</p>
    </section>
    <section class="grid">
      ${foods.length ? foods.map(foodCard).join("") : `<article class="panel"><p class="muted">${t("noFoods")}</p></article>`}
    </section>
  `;
}

function foodCard(food) {
  const status = getFoodStatus(food);
  return `
    <article class="item-card">
      <div class="item-head">
        <strong>${escapeHtml(food.name)}</strong>
        <span class="status ${status.className}">${escapeHtml(status.text)}</span>
      </div>
      <div class="meta">
        <span>${t("makeCol")}</span><b>${fullDateTime(food.makeTime)}</b>
        <span>${t("openCol")}</span><b>${fullDateTime(food.openTime)}</b>
        <span>${t("expiryCol")}</span><b>${fullDateTime(food.expiryTime)}</b>
        <span>${t("thawCol")}</span><b>${fullDateTime(food.thawTime)}</b>
        <span>${t("allergensCol")}</span><b>${escapeHtml((food.allergens || []).join(", ") || t("notDeclared"))}</b>
      </div>
      ${food.suggestion ? `<p class="muted">${escapeHtml(food.suggestion)}</p>` : ""}
      <div class="actions">
        <button class="primary" data-print="${food.id}" type="button">${t("print")}</button>
        <button class="secondary" data-edit="${food.id}" type="button">${t("edit")}</button>
        <button class="danger" data-delete="${food.id}" type="button">${t("delete")}</button>
      </div>
    </article>
  `;
}

function deleteFood(id) {
  state.foods = state.foods.filter((food) => food.id !== id);
  delete state.notified[id];
  saveState();
  toast(t("msgDeletedRecord"));
  render();
}

function templateCreateModalHtml() {
  return `
    <div id="templateCreateModal" class="modal-backdrop hidden" aria-hidden="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="templateCreateTitle">
        <h3 id="templateCreateTitle">${t("newTemplateTitle")}</h3>
        <form id="templateForm" class="form">
          <label>${t("templateArea")}
            <select name="area">
              ${templateAreas.map((area) => `<option value="${area}">${templateAreaLabel(area)}</option>`).join("")}
            </select>
          </label>
          <label>${t("templateName")}
            <input name="name" required placeholder="${escapeHtml(t("templateNamePlaceholder"))}">
          </label>
          <label>${t("storage")}
            <select name="storage">
              ${storageMethods.map((method) => `<option value="${method}">${storageLabel(method)}</option>`).join("")}
            </select>
          </label>
          <fieldset>
            <legend>${t("expiryProgrammed")}</legend>
            <div class="grid two">
              <label>${t("expiryAmount")}
                <input name="expiryAmount" type="number" min="0" step="1" value="48">
              </label>
              <label>${t("expiryUnit")}
                <select name="expiryUnit">
                  ${expiryUnits.map((unit) => `<option value="${unit}">${expiryUnitLabel(unit)}</option>`).join("")}
                </select>
              </label>
            </div>
          </fieldset>
          <label>${t("defaultSuggestion")}
            <textarea name="suggestion"></textarea>
          </label>
          <fieldset>
            <legend>${t("defaultAllergens")}</legend>
            <div class="check-grid">
              ${allergens.map((name) => `
                <label class="check-card">
                  <input type="checkbox" name="allergens" value="${name}">
                  <span>${name}</span>
                </label>
              `).join("")}
            </div>
          </fieldset>
          <div class="actions">
            <button id="templateCreateSubmitBtn" class="primary" type="submit">${t("saveTemplate")}</button>
            <button id="templateCreateCancelBtn" class="secondary" type="button">${t("modalCancel")}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function templateActionModalHtml() {
  return `
    <div id="templateActionModal" class="modal-backdrop hidden" aria-hidden="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="templateActionTitle">
        <h3 id="templateActionTitle">${t("templateActionTitle")}</h3>
        <p id="templateActionInfo" class="muted"></p>
        <div class="actions">
          <button id="templateActionOpenBtn" class="secondary" type="button">${t("useOpen")}</button>
          <button id="templateActionThawBtn" class="secondary" type="button">${t("useThaw")}</button>
          <button id="templateActionEditBtn" class="secondary" type="button">${t("edit")}</button>
          <button id="templateActionDeleteBtn" class="danger" type="button">${t("delete")}</button>
          <button id="templateActionCancelBtn" class="secondary" type="button">${t("modalCancel")}</button>
        </div>
      </div>
    </div>
  `;
}

function renderTemplates() {
  return `
    <section class="panel template-panel">
      <h2>${t("templateForChinese")}</h2>
      <button class="secondary corner-add-btn" data-open-template-create data-template-area="kitchen" type="button">${t("add")}</button>
    </section>
    ${templateCreateModalHtml()}

    ${templateAreas.map(renderTemplateRows).join("")}
  `;
}

function setTemplateFormValues(tpl) {
  const form = document.getElementById("templateForm");
  if (!form) return;
  form.elements.area.value = normalizeTemplateArea(tpl?.area);
  form.elements.name.value = tpl?.name || "";
  form.elements.storage.value = tpl?.storage || "Refrigerado";
  form.elements.expiryAmount.value = String(tpl?.expiryAmount ?? tpl?.hours ?? 48);
  form.elements.expiryUnit.value = normalizeExpiryUnit(tpl?.expiryUnit);
  form.elements.suggestion.value = tpl?.suggestion || "";
  const selected = tpl?.allergens || [];
  form.querySelectorAll("[name='allergens']").forEach((input) => {
    input.checked = selected.includes(input.value);
  });
}

function openTemplateCreateModal(templateId = null, defaultArea = "kitchen") {
  const modal = document.getElementById("templateCreateModal");
  if (!modal) return;
  const title = document.getElementById("templateCreateTitle");
  const submitBtn = document.getElementById("templateCreateSubmitBtn");
  const tpl = templateId ? state.templates.find((item) => item.id === templateId) : null;
  editingTemplateId = tpl?.id || null;
  if (tpl) {
    if (title) title.textContent = t("editTemplateTitle");
    if (submitBtn) submitBtn.textContent = t("saveChanges");
    setTemplateFormValues(tpl);
  } else {
    if (title) title.textContent = t("newTemplateTitle");
    if (submitBtn) submitBtn.textContent = t("saveTemplate");
    setTemplateFormValues({ area: defaultArea });
  }
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeTemplateCreateModal() {
  const modal = document.getElementById("templateCreateModal");
  if (!modal) return;
  editingTemplateId = null;
  setTemplateFormValues(null);
  const title = document.getElementById("templateCreateTitle");
  if (title) title.textContent = t("newTemplateTitle");
  const submitBtn = document.getElementById("templateCreateSubmitBtn");
  if (submitBtn) submitBtn.textContent = t("saveTemplate");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openTemplateActionModal(templateId) {
  const tpl = state.templates.find((item) => item.id === templateId);
  if (!tpl) return;
  activeTemplateActionId = tpl.id;
  const modal = document.getElementById("templateActionModal");
  const info = document.getElementById("templateActionInfo");
  if (info) info.textContent = `${templateAreaLabel(tpl.area)} · ${tpl.name} · ${storageLabel(tpl.storage)} · ${templateExpiryLabel(tpl)}`;
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeTemplateActionModal() {
  const modal = document.getElementById("templateActionModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  activeTemplateActionId = null;
}

function runTemplateAction(action) {
  const templateId = activeTemplateActionId;
  if (!templateId) return;
  closeTemplateActionModal();
  if (action === "open") {
    openTemplatePrintModal(templateId, "open");
    return;
  }
  if (action === "thaw") {
    openTemplatePrintModal(templateId, "thaw");
    return;
  }
  if (action === "edit") {
    openTemplateCreateModal(templateId);
    return;
  }
  if (action === "delete") {
    deleteTemplate(templateId);
  }
}

function bindTemplateForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const expiryAmount = Number(data.expiryAmount || 0);
    const expiryUnit = normalizeExpiryUnit(data.expiryUnit);
    const payload = {
      id: editingTemplateId || makeId("tpl"),
      area: normalizeTemplateArea(data.area),
      name: data.name.trim(),
      storage: data.storage,
      hours: templateHoursFromProgram(expiryAmount, expiryUnit),
      expiryAmount,
      expiryUnit,
      suggestion: data.suggestion || "",
      allergens: Array.from(form.querySelectorAll("[name='allergens']:checked")).map((input) => input.value),
    };
    if (editingTemplateId) {
      const index = state.templates.findIndex((tpl) => tpl.id === editingTemplateId);
      if (index >= 0) state.templates[index] = payload;
    } else {
      state.templates.push(payload);
    }
    saveState();
    toast(editingTemplateId ? t("msgUpdatedTemplate") : t("msgSavedTemplate"));
    closeTemplateCreateModal();
    render();
  });
}

function deleteTemplate(id) {
  state.templates = state.templates.filter((tpl) => tpl.id !== id);
  saveState();
  toast(t("msgDeletedTemplate"));
  render();
}

function renderSettings() {
  const cfg = state.supabase || {};
  return `
    <section class="panel">
      <h2>${t("settings")}</h2>
      <form id="settingsForm" class="form">
        <label>${t("shopName")}
          <input name="shopName" value="${escapeHtml(state.settings.shopName)}">
        </label>
        <label>${t("reminderMinutes")}
          <input name="reminderMinutes" type="number" min="5" step="5" value="${escapeHtml(state.settings.reminderMinutes)}">
        </label>
        <label>${t("labelSize")}
          <select name="labelSize">
            <option value="80x50" ${state.settings.labelSize === "80x50" ? "selected" : ""}>80mm x 50mm</option>
            <option value="60x40" ${state.settings.labelSize === "60x40" ? "selected" : ""}>60mm x 40mm</option>
            <option value="custom" ${state.settings.labelSize === "custom" ? "selected" : ""}>${t("custom")}</option>
          </select>
        </label>
        <div class="grid two">
          <label>${t("widthMm")}
            <input name="labelWidthMm" type="number" min="30" max="120" step="1" value="${escapeHtml(state.settings.labelWidthMm)}">
          </label>
          <label>${t("heightMm")}
            <input name="labelHeightMm" type="number" min="20" max="120" step="1" value="${escapeHtml(state.settings.labelHeightMm)}">
          </label>
        </div>
        <label>${t("autoPrintSave")}
          <select name="autoPrintAfterSave">
            <option value="false" ${state.settings.autoPrintAfterSave ? "" : "selected"}>${t("no")}</option>
            <option value="true" ${state.settings.autoPrintAfterSave ? "selected" : ""}>${t("yes")}</option>
          </select>
        </label>
        <button class="primary" type="submit">${t("saveSettings")}</button>
      </form>
    </section>

    <section class="panel">
      <h2>${t("supabaseSync")}</h2>
      <p class="muted">${t("supabaseHint")}</p>
      <form id="supabaseForm" class="form">
        <label>Project URL
          <input name="url" type="url" value="${escapeHtml(cfg.url || "")}" placeholder="https://xxxx.supabase.co">
        </label>
        <label>Anon key
          <input name="anonKey" type="password" value="${escapeHtml(cfg.anonKey || "")}" autocomplete="off">
        </label>
        <div class="grid two">
          <label>${t("table")}
            <input name="table" value="${escapeHtml(cfg.table || "food_expiry_state")}">
          </label>
          <label>${t("rowId")}
            <input name="rowId" value="${escapeHtml(cfg.rowId || "restaurante-chino")}">
          </label>
        </div>
        <label>${t("autoSyncSave")}
          <select name="enabled">
            <option value="false" ${cfg.enabled ? "" : "selected"}>${t("no")}</option>
            <option value="true" ${cfg.enabled ? "selected" : ""}>${t("yes")}</option>
          </select>
        </label>
        <div class="actions">
          <button class="primary" type="submit">${t("saveConnection")}</button>
          <button class="secondary" id="testSupabaseBtn" type="button">${t("test")}</button>
          <button class="secondary" id="uploadSupabaseBtn" type="button">${t("upload")}</button>
          <button class="secondary" id="downloadSupabaseBtn" type="button">${t("download")}</button>
        </div>
      </form>
      <p class="muted">${t("lastSync")}: ${escapeHtml(cfg.lastSync || t("never"))}</p>
    </section>

    <section class="panel">
      <h2>${t("androidUse")}</h2>
      <p class="muted">${t("androidHint1")}</p>
      <p class="muted">${t("androidHint2")}</p>
      <div class="actions">
        <button class="secondary" id="exportBtn" type="button">${t("exportCopy")}</button>
        <button class="danger" id="clearBtn" type="button">${t("clearAll")}</button>
      </div>
    </section>
  `;
}

function bindSettingsForm(form) {
  const labelSize = form.elements.labelSize;
  const widthInput = form.elements.labelWidthMm;
  const heightInput = form.elements.labelHeightMm;

  const applyPreset = () => {
    if (labelSize.value === "80x50") {
      widthInput.value = "80";
      heightInput.value = "50";
      widthInput.readOnly = true;
      heightInput.readOnly = true;
    } else if (labelSize.value === "60x40") {
      widthInput.value = "60";
      heightInput.value = "40";
      widthInput.readOnly = true;
      heightInput.readOnly = true;
    } else {
      widthInput.readOnly = false;
      heightInput.readOnly = false;
    }
  };
  labelSize.addEventListener("change", applyPreset);
  applyPreset();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const width = clamp(Number(data.labelWidthMm || 80), 30, 120);
    const height = clamp(Number(data.labelHeightMm || 50), 20, 120);
    state.settings = {
      ...state.settings,
      shopName: data.shopName || "Restaurante Chino",
      reminderMinutes: Number(data.reminderMinutes || 120),
      labelSize: data.labelSize || "80x50",
      labelWidthMm: width,
      labelHeightMm: height,
      autoPrintAfterSave: data.autoPrintAfterSave === "true",
    };
    saveState();
    toast(t("msgSavedSettings"));
    render();
  });

  document.getElementById("exportBtn").addEventListener("click", exportBackup);
  document.getElementById("clearBtn").addEventListener("click", clearAll);
  document.getElementById("supabaseForm")?.addEventListener("submit", saveSupabaseSettings);
  document.getElementById("testSupabaseBtn")?.addEventListener("click", () => testSupabaseConnection());
  document.getElementById("uploadSupabaseBtn")?.addEventListener("click", () => syncToSupabase());
  document.getElementById("downloadSupabaseBtn")?.addEventListener("click", () => loadFromSupabase());
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `caducidades_appcc_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clearAll() {
  if (!confirm(t("msgConfirmClear"))) return;
  const lang = currentLanguage();
  state = defaultState();
  state.settings.language = lang;
  saveState();
  toast(t("msgCleared"));
  render();
}

function labelHtml(food, options = {}) {
  const clean = (value) => String(value ?? "").trim();
  const rawTitle = clean(food.name) || (options.preview ? "Nombre del alimento" : "");
  const titleClass = rawTitle.length > 44 ? "label-title-xs" : (rawTitle.length > 30 ? "label-title-s" : "");
  const titleClassAttr = titleClass ? ` class="${titleClass}"` : "";
  const titleHtml = rawTitle ? `<h1${titleClassAttr}>${escapeHtml(rawTitle)}</h1>` : "";

  const textRow = (label, value, { bold = false } = {}) => {
    const text = clean(value);
    if (!text) return "";
    const rendered = bold ? `<b>${escapeHtml(text)}</b>` : escapeHtml(text);
    return `<tr><td>${label}</td><td>${rendered}</td></tr>`;
  };
  const dateRow = (label, value, { bold = false } = {}) => {
    const raw = clean(value);
    if (!raw) return "";
    return textRow(label, fullDateTime(raw), { bold });
  };

  const allergenValues = Array.isArray(food.allergens)
    ? food.allergens.map((item) => clean(item)).filter(Boolean)
    : [];
  const rows = [
    textRow("Conserv.", food.storage),
    dateRow("Apert.", food.openTime),
    dateRow("Descong.", food.thawTime),
    dateRow("Caduc.", food.expiryTime, { bold: true }),
    textRow("Alérg.", allergenValues.join(", ")),
    textRow("Uso", food.suggestion),
    textRow("Lote", food.note),
  ].filter(Boolean).join("");
  const tableHtml = rows ? `<table>${rows}</table>` : "";

  const className = options.preview ? "" : "print-label";
  return `
    <div class="${className}">
      ${titleHtml}
      ${tableHtml}
    </div>
  `;
}

function labelPrintStyle() {
  const width = clamp(Number(state.settings.labelWidthMm || 80), 30, 120);
  const height = clamp(Number(state.settings.labelHeightMm || 50), 20, 120);
  const margin = 3;
  const contentW = Math.max(20, width - margin * 2);
  const contentH = Math.max(15, height - margin * 2);
  return `
    <style media="print">
      @page { size: ${width}mm ${height}mm; margin: ${margin}mm; }
      .print-label { width: ${contentW}mm; min-height: ${contentH}mm; page-break-after: always; }
    </style>
  `;
}

function androidPrinterAvailable() {
  return Boolean(window.AndroidPrinter && typeof window.AndroidPrinter.printLabel === "function");
}

function labelPrintPayload(food) {
  const dateText = (value) => value ? fullDateTime(value) : "";
  return {
    widthMm: clamp(Number(state.settings.labelWidthMm || 80), 30, 120),
    heightMm: clamp(Number(state.settings.labelHeightMm || 50), 20, 120),
    shopName: state.settings.shopName || "",
    name: food.name || "",
    storage: food.storage || "",
    makeTime: food.makeTime || "",
    makeTimeText: dateText(food.makeTime),
    openTime: food.openTime || "",
    openTimeText: dateText(food.openTime),
    thawTime: food.thawTime || "",
    thawTimeText: dateText(food.thawTime),
    expiryTime: food.expiryTime || "",
    expiryTimeText: dateText(food.expiryTime),
    allergens: Array.isArray(food.allergens) ? food.allergens : [],
    suggestion: food.suggestion || "",
    note: food.note || "",
  };
}

function printFood(id) {
  const food = state.foods.find((item) => item.id === id);
  if (!food) return;
  if (androidPrinterAvailable()) {
    try {
      window.AndroidPrinter.printLabel(JSON.stringify(labelPrintPayload(food)));
      toast(t("msgAndroidPrintSent"));
      return;
    } catch (error) {
      console.error(error);
      toast(t("msgAndroidPrintError"));
    }
  }
  const printArea = document.getElementById("printArea");
  printArea.innerHTML = `${labelPrintStyle()}${labelHtml(food)}`;
  setTimeout(() => window.print(), 80);
}

function openTemplatePrintModal(templateId, mode) {
  const tpl = state.templates.find((item) => item.id === templateId);
  if (!tpl) return;
  activeTemplateForPrint = tpl;
  activeTemplateMode = mode === "thaw" ? "thaw" : "open";
  const modal = document.getElementById("templatePrintModal");
  const info = document.getElementById("templatePrintInfo");
  const label = document.getElementById("templateExpiryLabel");
  const input = document.getElementById("templateExpiryInput");
  const modeText = activeTemplateMode === "thaw" ? t("modeThaw") : t("modeOpen");
  const showManualExpiry = activeTemplateMode === "open" && !templateHasProgrammedExpiry(tpl);
  templateManualExpiryRequired = showManualExpiry;
  info.textContent = `${tpl.name} · ${storageLabel(tpl.storage)} · ${templateExpiryLabel(tpl)} · ${modeText}`;
  input.value = "";
  input.required = showManualExpiry;
  if (label) label.classList.toggle("hidden-field", !showManualExpiry);
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeTemplatePrintModal() {
  const modal = document.getElementById("templatePrintModal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  activeTemplateForPrint = null;
  activeTemplateMode = "open";
  templateManualExpiryRequired = false;
}

function saveFromTemplateAndPrint() {
  if (!activeTemplateForPrint) return;
  const tpl = activeTemplateForPrint;
  const expiryInput = document.getElementById("templateExpiryInput").value;
  if (activeTemplateMode === "thaw" && !templateHasProgrammedExpiry(tpl)) {
    toast(t("msgNeedProgrammedExpiry"));
    return;
  }
  if (templateManualExpiryRequired && !expiryInput) {
    toast(t("msgNeedExpiry"));
    return;
  }
  const nowValue = nowLocalValue();
  const makeTime = nowValue;
  const openTime = nowValue;
  const thawTime = activeTemplateMode === "thaw" ? nowValue : "";
  const expiryBase = activeTemplateMode === "thaw" ? thawTime : openTime;
  const food = {
    id: makeId("food"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    area: normalizeTemplateArea(tpl.area),
    name: tpl.name,
    storage: tpl.storage,
    makeTime,
    openTime,
    thawTime,
    expiryTime: expiryInput || addTemplateExpiry(expiryBase, tpl),
    suggestion: tpl.suggestion || "",
    note: activeTemplateMode === "thaw" ? "Generado desde plantilla (descongelación)" : "Generado desde plantilla (apertura)",
    allergens: tpl.allergens || [],
  };
  state.foods.push(food);
  saveState();
  closeTemplatePrintModal();
  toast(t("msgFromTemplate"));
  printFood(food.id);
  if (view !== "list") {
    view = "list";
    render();
  }
}

function requestNotifications() {
  if (!("Notification" in window)) {
    toast(t("msgNoNotification"));
    return;
  }
  Notification.requestPermission().then((permission) => {
    toast(permission === "granted" ? t("msgNotificationsOn") : t("msgNotificationsOff"));
  });
}

function startReminderLoop() {
  clearInterval(reminderTimer);
  reminderTimer = setInterval(checkReminders, 60000);
  checkReminders();
}

function checkReminders() {
  const foods = activeFoods();
  foods.forEach((food) => {
    const status = getFoodStatus(food);
    if (!["soon", "expired"].includes(status.key)) return;
    const tag = `${food.id}-${status.key}`;
    if (state.notified[tag]) return;
    state.notified[tag] = new Date().toISOString();
    saveState();
    const message = status.key === "expired"
      ? t("msgExpired", { name: food.name })
      : t("msgSoon", { name: food.name, time: humanMinutes(status.diffMin) });
    toast(message);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(t("notifyTitle"), { body: message, tag });
    }
    if (navigator.vibrate) navigator.vibrate([180, 80, 180]);
  });
}

function saveSupabaseSettings(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.supabase = {
    ...state.supabase,
    url: (data.url || "").trim().replace(/\/+$/, ""),
    anonKey: (data.anonKey || "").trim(),
    table: (data.table || "food_expiry_state").trim(),
    rowId: (data.rowId || "restaurante-chino").trim(),
    enabled: data.enabled === "true",
  };
  saveState({ sync: false });
  if (state.supabase.enabled) scheduleSupabaseSync();
  toast(t("msgSupabaseSaved"));
  render();
}

function supabaseReady() {
  const cfg = state.supabase || {};
  return Boolean(cfg.url && cfg.anonKey && cfg.table && cfg.rowId && !cfg.anonKey.startsWith("sb_secret_"));
}

function supabaseHeaders(extra = {}) {
  const key = state.supabase.anonKey;
  const headers = {
    apikey: key,
    "Content-Type": "application/json",
    ...extra,
  };
  if (!key.startsWith("sb_publishable_")) {
    headers.Authorization = `Bearer ${key}`;
  }
  return headers;
}

function supabaseEndpoint(query = "") {
  const cfg = state.supabase;
  const table = encodeURIComponent(cfg.table || "food_expiry_state");
  return `${cfg.url.replace(/\/+$/, "")}/rest/v1/${table}${query}`;
}

function stateForCloud() {
  const cloned = JSON.parse(JSON.stringify(state));
  if (cloned.supabase) {
    cloned.supabase.url = "";
    cloned.supabase.anonKey = "";
  }
  return cloned;
}

async function supabaseRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`${response.status} ${response.statusText}${text ? ` - ${text}` : ""}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function testSupabaseConnection() {
  if (!supabaseReady()) {
    toast(t("msgSupabaseMissing"));
    return;
  }
  try {
    const query = `?id=eq.${encodeURIComponent(state.supabase.rowId)}&select=id,updated_at&limit=1`;
    await supabaseRequest(supabaseEndpoint(query), {
      method: "GET",
      headers: supabaseHeaders(),
    });
    toast(t("msgSupabaseOk"));
  } catch (error) {
    toast(t("msgSupabaseError", { error: error.message }));
  }
}

async function syncToSupabase(options = {}) {
  if (supabaseSyncBusy) return;
  if (!supabaseReady()) {
    if (!options.silent) toast(t("msgSupabaseMissing"));
    return;
  }
  supabaseSyncBusy = true;
  try {
    const syncedAt = new Date().toISOString();
    const payload = {
      id: state.supabase.rowId,
      data: stateForCloud(),
      updated_at: syncedAt,
    };
    await supabaseRequest(supabaseEndpoint("?on_conflict=id"), {
      method: "POST",
      headers: supabaseHeaders({
        Prefer: "resolution=merge-duplicates,return=representation",
      }),
      body: JSON.stringify(payload),
    });
    state.supabase.lastSync = syncedAt;
    saveState({ sync: false });
    if (!options.silent) {
      toast(t("msgSupabaseUploaded"));
      render();
    }
  } catch (error) {
    if (!options.silent) toast(t("msgSupabaseError", { error: error.message }));
  } finally {
    supabaseSyncBusy = false;
  }
}

async function loadFromSupabase() {
  if (!supabaseReady()) {
    toast(t("msgSupabaseMissing"));
    return;
  }
  try {
    const query = `?id=eq.${encodeURIComponent(state.supabase.rowId)}&select=data,updated_at&limit=1`;
    const rows = await supabaseRequest(supabaseEndpoint(query), {
      method: "GET",
      headers: supabaseHeaders(),
    });
    if (!rows || rows.length === 0) {
      toast(t("msgSupabaseNoData"));
      return;
    }
    const currentSupabase = { ...state.supabase };
    state = mergeState(rows[0].data || {});
    state.supabase = {
      ...state.supabase,
      url: currentSupabase.url,
      anonKey: currentSupabase.anonKey,
      table: currentSupabase.table,
      rowId: currentSupabase.rowId,
      enabled: currentSupabase.enabled,
      lastSync: rows[0].updated_at || new Date().toISOString(),
    };
    saveState({ sync: false });
    toast(t("msgSupabaseDownloaded"));
    render();
  } catch (error) {
    toast(t("msgSupabaseError", { error: error.message }));
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

document.getElementById("templatePrintConfirmBtn")?.addEventListener("click", saveFromTemplateAndPrint);
document.getElementById("templatePrintCancelBtn")?.addEventListener("click", closeTemplatePrintModal);
document.getElementById("templatePrintModal")?.addEventListener("click", (event) => {
  if (event.target.id === "templatePrintModal") closeTemplatePrintModal();
});

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
