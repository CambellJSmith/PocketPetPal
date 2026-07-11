"use strict";

const SAVE_KEY = "pocket_sprout_save_v27";
const CANONICAL_GAME_URL = "https://cambelljsmith.github.io/PocketPetPal/";
const LEGACY_SAVE_KEYS = ["pocket_sprout_save_v26", "pocket_sprout_save_v25", "pocket_sprout_save_v24", "pocket_sprout_save_v23", "pocket_sprout_save_v22", "pocket_sprout_save_v21", "pocket_sprout_save_v20", "pocket_sprout_save_v19", "pocket_sprout_save_v18", "pocket_sprout_save_v17", "pocket_sprout_save_v16", "pocket_sprout_save_v15", "pocket_sprout_save_v14", "pocket_sprout_save_v13", "pocket_sprout_save_v12", "pocket_sprout_save_v11", "pocket_sprout_save_v10", "pocket_sprout_save_v9", "pocket_sprout_save_v8", "pocket_sprout_save_v7", "pocket_sprout_save_v5", "pocket_sprout_save_v4", "pocket_sprout_save_v3", "pocket_sprout_save_v2", "pocket_sprout_save_v1"];
const MINUTES_PER_DAY = 1440;
const DAILY_DECAY = {
  food: 72,
  fun: 34,
  energy: 36,
  cleanliness: 76,
  affection: 12
};
const PLAY_MESS = 7;
const PLAY_HUNGER_COST = 3;
const PLAY_ENERGY_COST = 7;
const CLEAN_BASIC_GAIN = 24;
const SICKNESS_CHECK_MINUTES = 90;
const DIALOGUE_FILE = "dialogue.csv?v=12";
const SLEEP_DURATION_MINUTES = 180;
const SLEEP_ENERGY_GAIN = 44;
const WAKE_UP_FUN_PENALTY = 22;
const WAKE_UP_AFFECTION_PENALTY = 18;


const SPECIES = [
  { id: "sproutling", label: "sproutling", pet: "#8f7dff", light: "#c9c1ff", dark: "#4e3aa8", accent: "#72df8e", extraColor: "#fff2bd", body: "round", ears: "cat", tail: "curled", wings: "none", extra: "sprout", face: "wide" },
  { id: "lunar_bun", label: "lunar_bun", pet: "#c6d7ff", light: "#edf4ff", dark: "#536a9f", accent: "#fff2bd", extraColor: "#f7e8ff", body: "drop", ears: "bunny", tail: "ball", wings: "none", extra: "moon", face: "sleepy" },
  { id: "ember_imp", label: "ember_imp", pet: "#ff8a5b", light: "#ffc2a8", dark: "#8b2c1d", accent: "#ffd166", extraColor: "#fff2bd", body: "tall", ears: "horns", tail: "spike", wings: "bat", extra: "bolt", face: "stern" },
  { id: "bubble_pip", label: "bubble_pip", pet: "#79d9ff", light: "#c8f4ff", dark: "#227294", accent: "#e9fbff", extraColor: "#ffffff", body: "squat", ears: "fins", tail: "fin", wings: "fin", extra: "bubbles", face: "dot" },
  { id: "moss_munch", label: "moss_munch", pet: "#6bd17f", light: "#b6efbd", dark: "#2f7d42", accent: "#f4d35e", extraColor: "#c4a484", body: "wide", ears: "round", tail: "none", wings: "none", extra: "mushroom", face: "tiny" },
  { id: "static_mite", label: "static_mite", pet: "#ffe16a", light: "#fff2ad", dark: "#927b16", accent: "#7df9ff", extraColor: "#ffffff", body: "diamond", ears: "antenna", tail: "point", wings: "small", extra: "bolt", face: "wide" },
  { id: "plum_bat", label: "plum_bat", pet: "#a266d8", light: "#d7b6ff", dark: "#5d2b8f", accent: "#ff8cc6", extraColor: "#2a153f", body: "round", ears: "cat", tail: "point", wings: "bat", extra: "star", face: "stern" },
  { id: "coral_nub", label: "coral_nub", pet: "#ff7f9c", light: "#ffc1cf", dark: "#9a2f4d", accent: "#75e6da", extraColor: "#fff0a3", body: "squat", ears: "fins", tail: "fin", wings: "none", extra: "crest", face: "dot" },
  { id: "cloud_moppet", label: "cloud_moppet", pet: "#f0f4ff", light: "#ffffff", dark: "#7f8bb3", accent: "#b7d8ff", extraColor: "#fff2bd", body: "wide", ears: "floppy", tail: "curled", wings: "feather", extra: "halo", face: "sleepy" },
  { id: "pumpkin_blob", label: "pumpkin_blob", pet: "#ffad4d", light: "#ffd59a", dark: "#9a5a17", accent: "#4da35d", extraColor: "#b87b2a", body: "squat", ears: "none", tail: "none", wings: "none", extra: "sprout", face: "wide" },
  { id: "crystal_slug", label: "crystal_slug", pet: "#9ee6e0", light: "#d6fffb", dark: "#2b8b85", accent: "#b68cff", extraColor: "#ffffff", body: "shell", ears: "antenna", tail: "none", wings: "none", extra: "gem", face: "tiny" },
  { id: "berry_blink", label: "berry_blink", pet: "#d9477f", light: "#ff9dbf", dark: "#74213f", accent: "#7ee081", extraColor: "#fff6d1", body: "round", ears: "round", tail: "ball", wings: "none", extra: "flower", face: "dot" },
  { id: "mint_fox", label: "mint_fox", pet: "#8ff0c2", light: "#c9ffdf", dark: "#2d8962", accent: "#ffb3da", extraColor: "#fff2bd", body: "tall", ears: "cat", tail: "point", wings: "none", extra: "gem", face: "stern" },
  { id: "royal_peep", label: "royal_peep", pet: "#8675ff", light: "#beb7ff", dark: "#4034a3", accent: "#ffd166", extraColor: "#fff2bd", body: "round", ears: "round", tail: "ball", wings: "none", extra: "crown", face: "wide" },
  { id: "marsh_wisp", label: "marsh_wisp", pet: "#b9ffcf", light: "#edfff1", dark: "#477d56", accent: "#8cc8ff", extraColor: "#f0f4ff", body: "drop", ears: "floppy", tail: "curled", wings: "small", extra: "halo", face: "sleepy" },
  { id: "noodle_horn", label: "noodle_horn", pet: "#ffdb89", light: "#fff0bf", dark: "#8c6220", accent: "#ff7d7d", extraColor: "#ffffff", body: "tall", ears: "horns", tail: "curled", wings: "none", extra: "crest", face: "tiny" },
  { id: "glacier_kit", label: "glacier_kit", pet: "#a4c9ff", light: "#e8f1ff", dark: "#3d659f", accent: "#ffffff", extraColor: "#d7f4b1", body: "square", ears: "cat", tail: "point", wings: "none", extra: "gem", face: "stern" },
  { id: "lava_loaf", label: "lava_loaf", pet: "#d94b3d", light: "#ff9a84", dark: "#692018", accent: "#ffd166", extraColor: "#ffe16a", body: "wide", ears: "horns", tail: "spike", wings: "none", extra: "bolt", face: "wide" },
  { id: "opal_flit", label: "opal_flit", pet: "#f7c8ff", light: "#fff0ff", dark: "#9a61a6", accent: "#7df9ff", extraColor: "#ffffff", body: "drop", ears: "antenna", tail: "none", wings: "feather", extra: "star", face: "dot" },
  { id: "mud_button", label: "mud_button", pet: "#a87952", light: "#d7b48f", dark: "#5c3b22", accent: "#83c66b", extraColor: "#f2d16b", body: "squat", ears: "round", tail: "none", wings: "none", extra: "mushroom", face: "sleepy" },
  { id: "solar_pup", label: "solar_pup", pet: "#ffd35a", light: "#fff1a8", dark: "#9b721d", accent: "#ff6b6b", extraColor: "#ffffff", body: "round", ears: "floppy", tail: "ball", wings: "none", extra: "halo", face: "wide" },
  { id: "inkling", label: "inkling", pet: "#36304f", light: "#716893", dark: "#151322", accent: "#8ff0c2", extraColor: "#fff2bd", body: "drop", ears: "fins", tail: "point", wings: "fin", extra: "moon", face: "dot" },
  { id: "pearl_goblin", label: "pearl_goblin", pet: "#e8dfcf", light: "#ffffff", dark: "#8e806e", accent: "#82d173", extraColor: "#f4d35e", body: "square", ears: "horns", tail: "none", wings: "none", extra: "crown", face: "stern" },
  { id: "rose_moth", label: "rose_moth", pet: "#ff9fbd", light: "#ffd9e6", dark: "#923a5e", accent: "#fff2bd", extraColor: "#f7c8ff", body: "round", ears: "antenna", tail: "none", wings: "feather", extra: "flower", face: "sleepy" },
  { id: "sky_axol", label: "sky_axol", pet: "#7ed7ff", light: "#c9f3ff", dark: "#2f7290", accent: "#ff9fcf", extraColor: "#ffffff", body: "wide", ears: "fins", tail: "fin", wings: "fin", extra: "crest", face: "tiny" },
  { id: "cinder_cat", label: "cinder_cat", pet: "#58506e", light: "#9187a8", dark: "#221c33", accent: "#ff8a5b", extraColor: "#ffd166", body: "tall", ears: "cat", tail: "curled", wings: "none", extra: "star", face: "stern" },
  { id: "honey_grub", label: "honey_grub", pet: "#f2bd5b", light: "#ffe5a5", dark: "#8f641b", accent: "#ffffff", extraColor: "#72df8e", body: "shell", ears: "none", tail: "ball", wings: "small", extra: "sprout", face: "dot" },
  { id: "violet_shroom", label: "violet_shroom", pet: "#9b5de5", light: "#d5b6ff", dark: "#4f237f", accent: "#00bbf9", extraColor: "#f15bb5", body: "squat", ears: "round", tail: "none", wings: "none", extra: "mushroom", face: "wide" },
  { id: "sea_pickle", label: "sea_pickle", pet: "#4ecdc4", light: "#a7fff7", dark: "#22736f", accent: "#ffe66d", extraColor: "#ffffff", body: "tall", ears: "fins", tail: "fin", wings: "none", extra: "bubbles", face: "tiny" },
  { id: "radish_rogue", label: "radish_rogue", pet: "#ffedf4", light: "#ffffff", dark: "#9c7182", accent: "#79d45e", extraColor: "#65a947", body: "drop", ears: "bunny", tail: "point", wings: "none", extra: "sprout", face: "stern" },
  { id: "neon_newt", label: "neon_newt", pet: "#3df2a7", light: "#94ffd4", dark: "#0f7c57", accent: "#ff43d0", extraColor: "#fff2bd", body: "wide", ears: "antenna", tail: "fin", wings: "small", extra: "bolt", face: "wide" },
  { id: "strawberry_owl", label: "strawberry_owl", pet: "#ff6f91", light: "#ffc2d0", dark: "#8f2b45", accent: "#fff2bd", extraColor: "#80ed99", body: "round", ears: "cat", tail: "none", wings: "feather", extra: "flower", face: "wide" },
  { id: "obsidian_nub", label: "obsidian_nub", pet: "#2d2a32", light: "#5b5266", dark: "#101014", accent: "#ffcf6f", extraColor: "#f7f1ff", body: "diamond", ears: "horns", tail: "spike", wings: "bat", extra: "gem", face: "stern" },
  { id: "banana_beast", label: "banana_beast", pet: "#ffe45e", light: "#fff3a3", dark: "#977815", accent: "#6bd17f", extraColor: "#ffffff", body: "tall", ears: "floppy", tail: "curled", wings: "none", extra: "crown", face: "tiny" },
  { id: "cotton_drake", label: "cotton_drake", pet: "#d9f0ff", light: "#ffffff", dark: "#6d91aa", accent: "#b68cff", extraColor: "#fff2bd", body: "shell", ears: "horns", tail: "spike", wings: "feather", extra: "halo", face: "sleepy" },
  { id: "acid_toad", label: "acid_toad", pet: "#baff29", light: "#e8ff9c", dark: "#5c7f10", accent: "#ff4d6d", extraColor: "#ffffff", body: "squat", ears: "round", tail: "none", wings: "none", extra: "bubbles", face: "dot" }
];

const ITEMS = {
  berry_bites: { id: "berry_bites", label: "berry_bites", kind: "food", price: 2, description: "small meal. three normal feedings across a real day should usually be enough.", effect: { food: 24, fun: 2, cleanliness: -1 } },
  crisp_snack: { id: "crisp_snack", label: "crisp_snack", kind: "food", price: 3, description: "a crunchy treat. useful, but overusing snacks can upset the creature.", effect: { food: 20, fun: 7, cleanliness: -1 } },
  warm_meal: { id: "warm_meal", label: "warm_meal", kind: "food", price: 5, description: "a proper meal. best when the creature is genuinely hungry.", effect: { food: 34, energy: 4, cleanliness: -3 } },
  vitamin_drop: { id: "vitamin_drop", label: "vitamin_drop", kind: "medicine", price: 4, description: "minor medicine for rare sickness or low health. not for daily use.", effect: { health: 14 }, cureChance: 0.5 },
  health_tonic: { id: "health_tonic", label: "health_tonic", kind: "medicine", price: 8, description: "strong medicine. reserved for actual sickness or serious neglect.", effect: { health: 34 }, cures: true },
  bubble_soap: { id: "bubble_soap", label: "bubble_soap", kind: "care", price: 3, description: "a proper wash. twice a real day is usually enough unless you play a lot.", effect: { cleanliness: 46, health: 2, fun: -1 } },
  toy_ball: { id: "toy_ball", label: "toy_ball", kind: "toy", price: 7, description: "permanent toy. play gives more fun and sometimes extra coins.", permanent: true },
  puzzle_class: { id: "puzzle_class", label: "puzzle_class", kind: "class", price: 6, description: "one class pass. improves skill and earns a few coins if the creature has energy.", effect: { discipline: 12, fun: 4, affection: 3, energy: -12, food: -5 } },
  dance_class: { id: "dance_class", label: "dance_class", kind: "class", price: 6, description: "one class pass. improves bond, fun, and skill, but uses energy.", effect: { discipline: 7, fun: 12, affection: 8, energy: -14, food: -4, cleanliness: -4 } },
  tiny_hat: { id: "tiny_hat", label: "tiny_hat", kind: "accessory", slot: "hat", price: 10, description: "a small wearable hat for your creature.", permanent: true },
  wizard_hat: { id: "wizard_hat", label: "wizard_hat", kind: "accessory", slot: "hat", price: 14, description: "a tall magical hat. purely cosmetic.", permanent: true },
  round_glasses: { id: "round_glasses", label: "round_glasses", kind: "accessory", slot: "face", price: 9, description: "round glasses to wear over the creature face.", permanent: true },
  star_glasses: { id: "star_glasses", label: "star_glasses", kind: "accessory", slot: "face", price: 12, description: "silly star glasses. purely cosmetic.", permanent: true },
  ribbon_bow: { id: "ribbon_bow", label: "ribbon_bow", kind: "accessory", slot: "neck", price: 8, description: "a ribbon bow for the creature.", permanent: true },
  flower_bow: { id: "flower_bow", label: "flower_bow", kind: "accessory", slot: "neck", price: 11, description: "a bright bow with a flower-like shape.", permanent: true }
};

const SHOP_ORDER = [
  "berry_bites", "crisp_snack", "warm_meal",
  "vitamin_drop", "health_tonic", "bubble_soap",
  "puzzle_class", "dance_class"
];

const EQUIPMENT_ORDER = [
  "toy_ball",
  "tiny_hat", "wizard_hat",
  "round_glasses", "star_glasses",
  "ribbon_bow", "flower_bow"
];

const QUICK_FOOD_ORDER = ["warm_meal", "crisp_snack", "berry_bites"];
const QUICK_MEDICINE_ORDER = ["health_tonic", "vitamin_drop"];

const elements = {
  saveStatus: document.querySelector("#save-status"),
  resetButton: document.querySelector("#reset-button"),
  nameInput: document.querySelector("#name-input"),
  pet: document.querySelector("#pet"),
  petShadow: document.querySelector("#pet-shadow"),
  visitorSlot: document.querySelector("#visitor-slot"),
  visitorPet: document.querySelector("#visitor-pet"),
  visitorLabel: document.querySelector("#visitor-label"),
  travelEmpty: document.querySelector("#travel-empty"),
  speechBubble: document.querySelector("#speech-bubble"),
  speechText: document.querySelector("#speech-text"),
  petArea: document.querySelector("#pet-area"),
  starTarget: document.querySelector("#star-target"),
  miniGameButton: document.querySelector("#mini-game-button"),
  rpsGameButton: document.querySelector("#rps-game-button"),
  rpsPanel: document.querySelector("#rps-panel"),
  rpsStatus: document.querySelector("#rps-status"),
  rpsStreak: document.querySelector("#rps-streak"),
  rpsTotal: document.querySelector("#rps-total"),
  stageLabel: document.querySelector("#stage-label"),
  petMessage: document.querySelector("#pet-message"),
  ageLabel: document.querySelector("#age-label"),
  coinLabel: document.querySelector("#coin-label"),
  moodLabel: document.querySelector("#mood-label"),
  speciesLabel: document.querySelector("#species-label"),
  affectionLabel: document.querySelector("#affection-label"),
  disciplineLabel: document.querySelector("#discipline-label"),
  foodValue: document.querySelector("#food-value"),
  funValue: document.querySelector("#fun-value"),
  energyValue: document.querySelector("#energy-value"),
  cleanlinessValue: document.querySelector("#cleanliness-value"),
  healthValue: document.querySelector("#health-value"),
  foodBar: document.querySelector("#food-bar"),
  funBar: document.querySelector("#fun-bar"),
  energyBar: document.querySelector("#energy-bar"),
  cleanlinessBar: document.querySelector("#cleanliness-bar"),
  healthBar: document.querySelector("#health-bar"),
  realTimePanel: document.querySelector("#real-time-panel"),
  realTimeSummary: document.querySelector("#real-time-summary"),
  nextFeedLabel: document.querySelector("#next-feed-label"),
  nextCleanLabel: document.querySelector("#next-clean-label"),
  nextMedicineLabel: document.querySelector("#next-medicine-label"),
  lastTickLabel: document.querySelector("#last-tick-label"),
  playerNameModal: document.querySelector("#player-name-modal"),
  playerNameInput: document.querySelector("#player-name-input"),
  playerNameButton: document.querySelector("#player-name-button"),
  playerNameError: document.querySelector("#player-name-error"),
  hatchNamingModal: document.querySelector("#hatch-naming-modal"),
  hatchNameInput: document.querySelector("#hatch-name-input"),
  hatchNameButton: document.querySelector("#hatch-name-button"),
  hatchNameError: document.querySelector("#hatch-name-error"),
  inventoryGrid: document.querySelector("#inventory-grid"),
  equipmentGrid: document.querySelector("#equipment-grid"),
  accessoryResetButton: document.querySelector("#accessory-reset-button"),
  shopGrid: document.querySelector("#shop-grid"),
  inventorySummary: document.querySelector("#inventory-summary"),
  equipmentSummary: document.querySelector("#equipment-summary"),
  nfcWriteButton: document.querySelector("#nfc-write-button"),
  nfcReadButton: document.querySelector("#nfc-read-button"),
  nfcChromeButton: document.querySelector("#nfc-chrome-button"),
  nfcSendPetButton: document.querySelector("#nfc-send-pet-button"),
  nfcBringPetButton: document.querySelector("#nfc-bring-pet-button"),
  nfcSendVisitorButton: document.querySelector("#nfc-send-visitor-button"),
  nfcStatus: document.querySelector("#nfc-status"),
  nfcSummary: document.querySelector("#nfc-summary"),
  tabButtons: [...document.querySelectorAll("[data-tab-target]")],
  tabPanels: [...document.querySelectorAll("[data-tab-panel]")],
  screen: document.querySelector(".screen"),
  careCancel: document.querySelector("#care-cancel"),
  petBody: document.querySelector("#pet-body"),
  petMouth: document.querySelector("#pet-mouth"),
  foodTool: document.querySelector("#food-tool"),
  spongeTool: document.querySelector("#sponge-tool"),
  syringeTool: document.querySelector("#syringe-tool"),
  dirtSpots: [...document.querySelectorAll("[data-dirt-spot]")],
  wearables: [...document.querySelectorAll("[data-accessory-slot]")]
};

const defaultInventory = () => ({
  berry_bites: 3,
  crisp_snack: 1,
  warm_meal: 0,
  vitamin_drop: 1,
  health_tonic: 0,
  bubble_soap: 1,
  toy_ball: 0,
  puzzle_class: 0,
  dance_class: 0,
  tiny_hat: 0,
  wizard_hat: 0,
  round_glasses: 0,
  star_glasses: 0,
  ribbon_bow: 0,
  flower_bow: 0
});

const defaultEquipment = () => ({
  hat: "",
  face: "",
  neck: ""
});

const defaultState = () => {
  const now = Date.now();
  const species = getRandomSpeciesId();

  return {
    version: 27,
    petId: createPetId(),
    playerName: "",
    petAway: false,
    visitingPet: null,
    name: "sprout",
    birthday: now,
    lastUpdated: now,
    speciesId: species,
    food: 74,
    fun: 70,
    energy: 72,
    cleanliness: 78,
    health: 92,
    affection: 45,
    discipline: 12,
    coins: 16,
    careScore: 0,
    hatchNamed: false,
    lastSicknessCheck: now,
    recentOverfeeds: 0,
    sleeping: false,
    sleepStartedAt: 0,
    sleepUntil: 0,
    sickness: false,
    dead: false,
    deathReason: "",
    inventory: defaultInventory(),
    equipment: defaultEquipment(),
    accessoryPositions: {},
    lastMessage: "a mysterious egg is waiting. care unlocks after hatching, but the shop is open."
  };
};

let state = importPetTransferFromUrl(loadState());
let miniGame = {
  active: false,
  timer: null,
  endsAt: 0,
  hits: 0
};

let rpsGame = {
  active: false,
  streak: 0,
  totalCoins: 0,
  round: 0
};

let careInteraction = {
  active: false,
  kind: "",
  itemId: "",
  pointerId: null,
  tool: null,
  cleaned: 0,
  injecting: false
};

let accessoryDrag = {
  active: false,
  pointerId: null,
  element: null,
  itemId: "",
  slot: ""
};

let dialogueRows = [];
let dialogueLoaded = false;
let lastDialogueAt = 0;
let nfcScanAbortController = null;

const FALLBACK_DIALOGUE = [
  { id: "fallback_play_001", event: "play", mood: "any", text: "again again" },
  { id: "fallback_play_002", event: "play", mood: "any", text: "that was fun" },
  { id: "fallback_idle_001", event: "idle", mood: "happy", text: "i like it here" },
  { id: "fallback_idle_002", event: "idle", mood: "calm", text: "just watching" },
  { id: "fallback_idle_003", event: "idle", mood: "sad", text: "a little lonely" },
  { id: "fallback_feed_001", event: "feed", mood: "any", text: "yum" },
  { id: "fallback_clean_001", event: "clean", mood: "any", text: "sparkly now" },
  { id: "fallback_medicine_001", event: "medicine", mood: "any", text: "that helped" }
];

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function createPetId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID().slice(0, 8);
  }

  return Math.random().toString(36).slice(2, 10);
}

function sanitizeNfcValue(value) {
  return encodeURIComponent(String(value ?? "").replace(/\|/g, "_").replace(/=/g, "-"));
}

function restoreNfcValue(value) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return value || "";
  }
}

function getNfcGameUrl() {
  return CANONICAL_GAME_URL;
}

function base64UrlEncode(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(data) {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (data.length % 4)) % 4);
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function getPortablePetState(sourceState = state) {
  return {
    ...sourceState,
    version: 27,
    petAway: false,
    visitingPet: null,
    lastUpdated: Date.now()
  };
}

function getCompactCounts(source = {}, itemIds = []) {
  return itemIds.map((itemId) => Math.max(0, Math.min(99, Math.floor(Number(source[itemId]) || 0))));
}

function restoreCompactCounts(values = [], itemIds = [], defaults = {}) {
  const output = { ...defaults };

  itemIds.forEach((itemId, index) => {
    output[itemId] = Math.max(0, Math.min(99, Math.floor(Number(values[index]) || 0)));
  });

  return output;
}

function compactAccessoryPositions(positions = {}) {
  const output = [];

  Object.entries(positions || {}).forEach(([itemId, position]) => {
    const itemIndex = EQUIPMENT_ORDER.indexOf(itemId);

    if (itemIndex < 0 || !ITEMS[itemId] || ITEMS[itemId].kind !== "accessory") {
      return;
    }

    output.push([
      itemIndex,
      Math.round(clamp(Number(position?.x) || 0, 0, 100)),
      Math.round(clamp(Number(position?.y) || 0, 0, 100))
    ]);
  });

  return output;
}

function restoreCompactAccessoryPositions(values = []) {
  const output = {};

  values.forEach(([itemIndex, x, y]) => {
    const itemId = EQUIPMENT_ORDER[itemIndex];

    if (!itemId || !ITEMS[itemId] || ITEMS[itemId].kind !== "accessory") {
      return;
    }

    output[itemId] = {
      x: clamp(Number(x) || 0, 0, 100),
      y: clamp(Number(y) || 0, 0, 100)
    };
  });

  return output;
}

function compactEquipment(equipment = {}) {
  return [
    EQUIPMENT_ORDER.indexOf(equipment.hat || ""),
    EQUIPMENT_ORDER.indexOf(equipment.face || ""),
    EQUIPMENT_ORDER.indexOf(equipment.neck || "")
  ];
}

function restoreCompactEquipment(values = []) {
  const restored = defaultEquipment();
  const slots = ["hat", "face", "neck"];

  slots.forEach((slot, index) => {
    const itemId = EQUIPMENT_ORDER[Number(values[index])];

    if (itemId && ITEMS[itemId]?.slot === slot) {
      restored[slot] = itemId;
    }
  });

  return restored;
}

function createCompactTravelPet(sourceState = state) {
  const pet = getPortablePetState(sourceState);

  return {
    v: 2,
    i: pet.petId,
    p: pet.playerName || "",
    n: pet.name || "sprout",
    b: Math.floor(Number(pet.birthday) || Date.now()),
    u: Date.now(),
    s: pet.speciesId,
    a: [
      Math.round(Number(pet.food) || 0),
      Math.round(Number(pet.fun) || 0),
      Math.round(Number(pet.energy) || 0),
      Math.round(Number(pet.cleanliness) || 0),
      Math.round(Number(pet.health) || 0),
      Math.round(Number(pet.affection) || 0),
      Math.round(Number(pet.discipline) || 0)
    ],
    c: Math.max(0, Math.floor(Number(pet.coins) || 0)),
    r: Math.max(0, Math.floor(Number(pet.careScore) || 0)),
    h: pet.hatchNamed ? 1 : 0,
    z: pet.sickness ? 1 : 0,
    d: pet.dead ? 1 : 0,
    q: getCompactCounts(pet.inventory, SHOP_ORDER),
    e: getCompactCounts(pet.inventory, EQUIPMENT_ORDER),
    g: compactEquipment(pet.equipment),
    x: compactAccessoryPositions(pet.accessoryPositions)
  };
}

function restoreCompactTravelPet(compact = {}) {
  const base = defaultState();
  const stats = Array.isArray(compact.a) ? compact.a : [];

  return normalizeState({
    ...base,
    version: 27,
    petId: String(compact.i || createPetId()).slice(0, 24),
    playerName: sanitizePlayerName(String(compact.p || "")),
    name: sanitizePetName(String(compact.n || "sprout")) || "sprout",
    birthday: Number(compact.b) || Date.now(),
    lastUpdated: Number(compact.u) || Date.now(),
    speciesId: SPECIES.some((species) => species.id === compact.s) ? compact.s : base.speciesId,
    food: Number(stats[0]) || base.food,
    fun: Number(stats[1]) || base.fun,
    energy: Number(stats[2]) || base.energy,
    cleanliness: Number(stats[3]) || base.cleanliness,
    health: Number(stats[4]) || base.health,
    affection: Number(stats[5]) || base.affection,
    discipline: Number(stats[6]) || base.discipline,
    coins: Number(compact.c) || 0,
    careScore: Number(compact.r) || 0,
    hatchNamed: Boolean(compact.h),
    sickness: Boolean(compact.z),
    dead: Boolean(compact.d),
    inventory: {
      ...restoreCompactCounts(compact.q, SHOP_ORDER, defaultInventory()),
      ...restoreCompactCounts(compact.e, EQUIPMENT_ORDER, defaultInventory())
    },
    equipment: restoreCompactEquipment(compact.g),
    accessoryPositions: restoreCompactAccessoryPositions(compact.x),
    petAway: false,
    visitingPet: null,
    sleepStartedAt: 0,
    sleepUntil: 0,
    sleeping: false,
    lastMessage: "pet came from the tag."
  });
}

function encodeTravelPetForTag(sourceState = state) {
  return `ppp2:${base64UrlEncode(JSON.stringify(createCompactTravelPet(sourceState)))}`;
}

function decodeTravelPetFromTag(text) {
  if (!text) {
    return null;
  }

  if (text.startsWith("ppp2:")) {
    try {
      return restoreCompactTravelPet(JSON.parse(base64UrlDecode(text.slice("ppp2:".length))));
    } catch {
      return null;
    }
  }

  if (!text.startsWith("ppp_pet_v1:")) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(text.slice("ppp_pet_v1:".length)));

    if (payload.kind !== "pocket_pet_pal_travel_pet" || !payload.state) {
      return null;
    }

    return normalizeState({ ...payload.state, petAway: false, visitingPet: null });
  } catch {
    return null;
  }
}

function encodePetTransferForChrome() {
  return base64UrlEncode(JSON.stringify({
    kind: "pocket_pet_pal_chrome_transfer",
    version: 1,
    exportedAt: Date.now(),
    state: getPortablePetState()
  }));
}

function getChromeTransferUrl() {
  const url = new URL(CANONICAL_GAME_URL);
  url.searchParams.set("pet_transfer", encodePetTransferForChrome());

  return url.toString();
}

function getAndroidChromeIntentUrl() {
  const target = new URL(getChromeTransferUrl());
  const fallback = encodeURIComponent(target.toString());
  const scheme = target.protocol.replace(":", "");

  return `intent://${target.host}${target.pathname}${target.search}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
}

function importPetTransferFromUrl(fallbackState) {
  const url = new URL(window.location.href);
  const transferCode = url.searchParams.get("pet_transfer");

  if (!transferCode) {
    return fallbackState;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(transferCode));

    if (payload.kind !== "pocket_pet_pal_chrome_transfer" || !payload.state) {
      throw new Error("invalid_transfer");
    }

    const importedState = normalizeState(payload.state);
    importedState.lastMessage = "pet data carried into this browser.";
    localStorage.setItem(SAVE_KEY, JSON.stringify(importedState));

    url.searchParams.delete("pet_transfer");
    window.history.replaceState({}, document.title, url.toString());

    return importedState;
  } catch {
    url.searchParams.delete("pet_transfer");
    window.history.replaceState({}, document.title, url.toString());
    fallbackState.lastMessage = "could not import pet data from the link.";
    return fallbackState;
  }
}

function openCurrentPetInAndroidChrome() {
  if (blockPlayerNameCare()) {
    return;
  }

  const transferUrl = getChromeTransferUrl();

  try {
    navigator.clipboard?.writeText(transferUrl);
  } catch {
    // Clipboard is optional. The intent URL below is the important path.
  }

  state.lastMessage = "opening in Chrome with this pet.";
  saveState();

  window.location.href = getAndroidChromeIntentUrl();
}

function getPetSummaryObject() {
  const stage = getStage();
  const species = getSpecies(state.speciesId);

  return {
    id: state.petId,
    player: state.playerName || "",
    name: getDisplayName(stage),
    stage,
    species: species.id,
    mood: getMood(),
    coins: state.coins,
    last_seen: Date.now()
  };
}

function encodePetSummaryForNfc() {
  const summary = getPetSummaryObject();

  return [
    "ps:v1",
    `id=${sanitizeNfcValue(summary.id)}`,
    `pl=${sanitizeNfcValue(summary.player)}`,
    `n=${sanitizeNfcValue(summary.name)}`,
    `st=${sanitizeNfcValue(summary.stage)}`,
    `sp=${sanitizeNfcValue(summary.species)}`,
    `m=${sanitizeNfcValue(summary.mood)}`,
    `c=${sanitizeNfcValue(summary.coins)}`,
    `t=${sanitizeNfcValue(summary.last_seen)}`
  ].join("|");
}

function decodePetSummaryFromNfc(text) {
  if (!text || !text.startsWith("ps:v1|")) {
    return null;
  }

  const parsed = {};

  text.split("|").slice(1).forEach((part) => {
    const [key, ...rest] = part.split("=");

    if (!key || rest.length === 0) {
      return;
    }

    parsed[key] = restoreNfcValue(rest.join("="));
  });

  return parsed;
}

function formatNfcSummaryText(summaryText = encodePetSummaryForNfc()) {
  const parsed = decodePetSummaryFromNfc(summaryText);

  if (!parsed) {
    return "could not read pet summary.";
  }

  return [
    `page: ${getNfcGameUrl()}`,
    `player: ${parsed.pl || "unnamed"}`,
    `pet: ${parsed.n || "unnamed"}`,
    `stage: ${parsed.st || "unknown"}`,
    `species: ${parsed.sp || "unknown"}`,
    `mood: ${parsed.m || "unknown"}`,
    `coins: ${parsed.c || "0"}`
  ].join("\n");
}

function isWebNfcAvailable() {
  return window.isSecureContext && "NDEFReader" in window;
}

function getNfcUnavailableReason() {
  if (!window.isSecureContext) {
    return "nfc_needs_https";
  }

  if (!("NDEFReader" in window)) {
    return "web_nfc_not_supported_on_this_browser";
  }

  return "";
}

function setNfcStatus(message) {
  if (elements.nfcStatus) {
    elements.nfcStatus.textContent = message;
  }
}

function renderNfcPanel() {
  if (!elements.nfcSummary) {
    return;
  }

  const unavailableReason = getNfcUnavailableReason();
  const needsChrome = Boolean(unavailableReason);
  const busy = miniGame.active || rpsGame.active || careInteraction.active;

  elements.nfcSummary.textContent = formatNfcSummaryText();

  if (needsChrome) {
    elements.nfcStatus.textContent = "open this in Chrome to save your pet tag";
  } else {
    elements.nfcStatus.textContent = "ready to save your pet tag";
  }

  elements.nfcWriteButton.hidden = needsChrome;
  elements.nfcReadButton.hidden = needsChrome;
  elements.nfcWriteButton.disabled = needsChrome || busy || state.petAway;
  elements.nfcReadButton.disabled = needsChrome || busy;

  if (elements.nfcSendPetButton) {
    elements.nfcSendPetButton.hidden = needsChrome || state.petAway;
    elements.nfcSendPetButton.disabled = busy || state.petAway;
  }

  if (elements.nfcBringPetButton) {
    elements.nfcBringPetButton.hidden = needsChrome;
    elements.nfcBringPetButton.disabled = busy;
  }

  if (elements.nfcSendVisitorButton) {
    elements.nfcSendVisitorButton.hidden = needsChrome || !state.visitingPet;
    elements.nfcSendVisitorButton.disabled = busy || !state.visitingPet;
  }

  if (elements.nfcChromeButton) {
    elements.nfcChromeButton.hidden = !needsChrome;
    elements.nfcChromeButton.disabled = busy;
  }
}

function decodeNfcRecordText(record) {
  if (typeof record.data === "string") {
    return record.data;
  }

  if (!record.data) {
    return "";
  }

  const encoding = record.encoding || "utf-8";
  return new TextDecoder(encoding).decode(record.data);
}

async function writePetSummaryToNfc() {
  if (blockPlayerNameCare()) {
    return;
  }

  if (!isWebNfcAvailable()) {
    setNfcStatus(getNfcUnavailableReason());
    return;
  }

  const ndef = new NDEFReader();
  const gameUrl = getNfcGameUrl();
  const petSummary = encodePetSummaryForNfc();

  try {
    setNfcStatus("hold your phone to the tag");
    await ndef.write({
      records: [
        {
          recordType: "url",
          data: gameUrl
        },
        {
          recordType: "text",
          data: petSummary
        }
      ]
    }, {
      overwrite: true
    });

    state.lastMessage = "pet tag saved."; 
    setNfcStatus("pet tag saved");
    saveState();
    render();
  } catch (error) {
    setNfcStatus("could not save pet tag");
  }
}

async function writeTravelPetToTag(petState, successMessage) {
  if (!isWebNfcAvailable()) {
    setNfcStatus(getNfcUnavailableReason());
    return false;
  }

  const ndef = new NDEFReader();
  const gameUrl = getNfcGameUrl();
  const compactPet = encodeTravelPetForTag(petState);

  try {
    setNfcStatus("hold your phone to the tag");
    await ndef.write({
      records: [
        { recordType: "url", data: gameUrl },
        { recordType: "text", data: compactPet }
      ]
    }, {
      overwrite: true
    });

    setNfcStatus(successMessage);
    return true;
  } catch (error) {
    const errorName = error?.name || "";
    const errorMessage = String(error?.message || "").toLowerCase();

    if (errorName === "AbortError" || errorName === "NotAllowedError") {
      setNfcStatus("tag save was cancelled");
    } else if (errorName === "NotSupportedError" || errorName === "NetworkError" || errorMessage.includes("capacity") || errorMessage.includes("space")) {
      setNfcStatus("tag is too small for travelling pet");
    } else {
      setNfcStatus("could not save pet tag");
    }

    return false;
  }
}

async function sendCurrentPetToTag() {
  if (blockPlayerNameCare()) {
    return;
  }

  if (state.petAway) {
    state.lastMessage = "your pet is already on its tag.";
    render();
    return;
  }

  const petToSend = getPortablePetState(state);
  const written = await writeTravelPetToTag(petToSend, "pet saved to tag");

  if (!written) {
    state.lastMessage = "the pet stayed here because the tag was not saved.";
    saveState();
    render();
    return;
  }

  state.petAway = true;
  state.sleeping = false;
  state.lastUpdated = Date.now();
  state.lastMessage = `${petToSend.name} is now on the tag. bring it back from the pet_tag tab.`;
  saveState();
  render();
}

function readTravelPetFromMessage(message) {
  let compactSummary = "";

  for (const record of message.records) {
    if (record.recordType !== "text") {
      continue;
    }

    const text = decodeNfcRecordText(record);
    const fullPet = decodeTravelPetFromTag(text);

    if (fullPet) {
      return { fullPet, compactSummary };
    }

    if (text.startsWith("ps:v1|")) {
      compactSummary = text;
    }
  }

  return { fullPet: null, compactSummary };
}

async function bringPetFromTag() {
  if (blockPlayerNameCare()) {
    return;
  }

  if (!isWebNfcAvailable()) {
    setNfcStatus(getNfcUnavailableReason());
    return;
  }

  try {
    if (nfcScanAbortController) {
      nfcScanAbortController.abort();
    }

    nfcScanAbortController = new AbortController();
    const ndef = new NDEFReader();
    setNfcStatus("hold your phone to the tag");
    await ndef.scan({ signal: nfcScanAbortController.signal });

    ndef.onreadingerror = () => {
      setNfcStatus("could not read pet tag");
    };

    ndef.onreading = (event) => {
      const { fullPet, compactSummary } = readTravelPetFromMessage(event.message);

      if (!fullPet) {
        if (compactSummary) {
          elements.nfcSummary.textContent = formatNfcSummaryText(compactSummary);
          setNfcStatus("this tag has a summary, but no travelling pet");
        } else {
          setNfcStatus("no travelling pet found on this tag");
        }

        nfcScanAbortController?.abort();
        nfcScanAbortController = null;
        return;
      }

      if (state.petAway || fullPet.petId === state.petId) {
        const currentPlayerName = state.playerName || fullPet.playerName || "";
        state = normalizeState({ ...fullPet, playerName: fullPet.playerName || currentPlayerName, petAway: false, visitingPet: null });
        state.lastMessage = `${state.name} came back from the tag.`;
      } else {
        state.visitingPet = normalizeState({ ...fullPet, petAway: false, visitingPet: null });
        state.lastMessage = `${state.visitingPet.name} is visiting.`;
      }

      setNfcStatus("pet brought in");
      nfcScanAbortController?.abort();
      nfcScanAbortController = null;
      saveState();
      render();
    };
  } catch (error) {
    if (error.name !== "AbortError") {
      setNfcStatus("could not read pet tag");
    }
  }
}

async function sendVisitorHomeToTag() {
  if (blockPlayerNameCare()) {
    return;
  }

  if (!state.visitingPet) {
    state.lastMessage = "there is no visiting pet here.";
    render();
    return;
  }

  const visitor = getPortablePetState(state.visitingPet);
  const written = await writeTravelPetToTag(visitor, "visitor saved to tag");

  if (!written) {
    state.lastMessage = "the visitor stayed here because the tag was not saved.";
    saveState();
    render();
    return;
  }

  const visitorName = visitor.name || "visitor";
  state.visitingPet = null;
  state.lastMessage = `${visitorName} went back onto the tag.`;
  saveState();
  render();
}


async function readPetSummaryFromNfc() {
  if (blockPlayerNameCare()) {
    return;
  }

  if (!isWebNfcAvailable()) {
    setNfcStatus(getNfcUnavailableReason());
    return;
  }

  try {
    if (nfcScanAbortController) {
      nfcScanAbortController.abort();
    }

    nfcScanAbortController = new AbortController();

    const ndef = new NDEFReader();
    setNfcStatus("hold your phone to the tag");
    await ndef.scan({ signal: nfcScanAbortController.signal });

    ndef.onreadingerror = () => {
      setNfcStatus("could not check pet tag");
    };

    ndef.onreading = (event) => {
      let foundSummary = "";

      for (const record of event.message.records) {
        if (record.recordType !== "text") {
          continue;
        }

        const text = decodeNfcRecordText(record);

        if (text.startsWith("ps:v1|")) {
          foundSummary = text;
          break;
        }
      }

      if (foundSummary) {
        elements.nfcSummary.textContent = formatNfcSummaryText(foundSummary);
        state.lastMessage = "pet tag checked."; 
        setNfcStatus("pet tag checked");
      } else {
        setNfcStatus("no pet found on this tag");
      }

      nfcScanAbortController?.abort();
      nfcScanAbortController = null;
      saveState();
      render();
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    setNfcStatus("could not check pet tag");
  }
}

function parseCsvRows(csvText) {
  const rows = [];
  let current = "";
  let row = [];
  let quoted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(current);
      current = "";

      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    current += char;
  }

  row.push(current);

  if (row.some((cell) => cell.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function normalizeDialogueRow(row, index) {
  return {
    id: String(row.id || `dialogue_${index}`).trim(),
    event: String(row.event || "idle").trim().toLowerCase(),
    mood: String(row.mood || "any").trim().toLowerCase(),
    text: String(row.text || "").trim()
  };
}

function parseDialogueCsv(csvText) {
  const rows = parseCsvRows(csvText);
  const headers = rows.shift().map((header) => header.trim().toLowerCase());

  return rows.map((row, index) => {
    const record = {};

    headers.forEach((header, headerIndex) => {
      record[header] = row[headerIndex] || "";
    });

    return normalizeDialogueRow(record, index);
  }).filter((row) => row.text && row.event);
}

function loadDialogueDatabase() {
  fetch(DIALOGUE_FILE, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`dialogue file failed: ${response.status}`);
      }

      return response.text();
    })
    .then((csvText) => {
      const rows = parseDialogueCsv(csvText);

      if (rows.length > 0) {
        dialogueRows = rows;
        dialogueLoaded = true;
      }
    })
    .catch(() => {
      dialogueRows = FALLBACK_DIALOGUE;
      dialogueLoaded = false;
    });
}

function getDialogueMood() {
  const mood = getMood();

  if (["happy", "calm", "sad", "sick"].includes(mood)) {
    return mood;
  }

  return "any";
}

function getDialogueChance() {
  const mood = getMood();

  if (mood === "happy") {
    return 0.5;
  }

  if (mood === "calm") {
    return 0.26;
  }

  if (mood === "sad") {
    return 0.11;
  }

  if (mood === "sick") {
    return 0.06;
  }

  return 0;
}

function getDialoguePool(eventName) {
  const sourceRows = dialogueRows.length > 0 ? dialogueRows : FALLBACK_DIALOGUE;
  const mood = getDialogueMood();
  const event = String(eventName || "idle").toLowerCase();

  let pool = sourceRows.filter((row) => {
    const eventMatches = row.event === event || row.event === "any";
    const moodMatches = row.mood === mood || row.mood === "any";

    return eventMatches && moodMatches;
  });

  if (pool.length === 0) {
    pool = sourceRows.filter((row) => row.event === event || row.event === "any");
  }

  if (pool.length === 0) {
    pool = sourceRows.filter((row) => row.event === "idle" || row.event === "any");
  }

  return pool;
}

function speakFromDialogue(eventName = "idle", guaranteed = false, renderAfter = false, saveAfter = false) {
  if (state.dead || isEggStage() || isSleeping()) {
    return false;
  }

  const now = Date.now();

  if (!guaranteed && now - lastDialogueAt < 45000) {
    return false;
  }

  if (!guaranteed && Math.random() > getDialogueChance()) {
    return false;
  }

  const pool = getDialoguePool(eventName);

  if (pool.length === 0) {
    return false;
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  state.lastMessage = `${state.name}: “${picked.text}”`;
  lastDialogueAt = now;

  if (saveAfter) {
    saveState();
  }

  if (renderAfter) {
    render();
  }

  return true;
}

function appendDialogueToMessage(eventName = "idle", guaranteed = false) {
  if (state.dead || isEggStage() || isSleeping()) {
    return false;
  }

  const now = Date.now();

  if (!guaranteed && now - lastDialogueAt < 45000) {
    return false;
  }

  if (!guaranteed && Math.random() > getDialogueChance()) {
    return false;
  }

  const pool = getDialoguePool(eventName);

  if (pool.length === 0) {
    return false;
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  state.lastMessage = `${state.lastMessage} ${state.name}: “${picked.text}”`;
  lastDialogueAt = now;
  return true;
}

function getRandomSpeciesId(excludedId = "") {
  const choices = SPECIES.filter((species) => species.id !== excludedId);
  const picked = choices[Math.floor(Math.random() * choices.length)];

  return picked.id;
}

function getSpecies(speciesId) {
  return SPECIES.find((species) => species.id === speciesId) || SPECIES[0];
}

function normalizeAccessoryPositions(rawPositions = {}) {
  const output = {};

  Object.entries(rawPositions || {}).forEach(([itemId, position]) => {
    const item = ITEMS[itemId];

    if (!item || item.kind !== "accessory") {
      return;
    }

    const x = Number(position?.x);
    const y = Number(position?.y);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    output[itemId] = {
      x: clamp(x, 0, 100),
      y: clamp(y, 0, 100)
    };
  });

  return output;
}

function getAccessoryBaseTransform(itemId) {
  if (itemId === "wizard_hat") {
    return "translate(-50%, -50%) rotate(-6deg)";
  }

  return "translate(-50%, -50%)";
}

function getWearableElementForSlot(slot) {
  return elements.wearables.find((element) => element.dataset.accessorySlot === slot) || null;
}

function applyAccessoryPosition(element, itemId, position) {
  if (!element || !position) {
    return;
  }

  element.style.left = `${position.x}%`;
  element.style.top = `${position.y}%`;
  element.style.right = "";
  element.style.bottom = "";
  element.style.transform = getAccessoryBaseTransform(itemId);
  element.classList.add("accessory-custom-position");
}

function clearAccessoryPositionStyle(element) {
  element.style.left = "";
  element.style.top = "";
  element.style.right = "";
  element.style.bottom = "";
  element.style.transform = "";
  element.classList.remove("accessory-custom-position", "dragging-accessory");
}

function renderAccessoryPositions() {
  elements.wearables.forEach((element) => {
    const slot = element.dataset.accessorySlot;
    const itemId = state.equipment[slot] || "";
    const position = itemId ? state.accessoryPositions[itemId] : null;

    element.dataset.equipped = itemId ? "true" : "false";
    element.dataset.itemId = itemId;
    clearAccessoryPositionStyle(element);

    if (itemId && position) {
      applyAccessoryPosition(element, itemId, position);
    }
  });
}

function canDragAccessories() {
  return !state.dead && !isEggStage() && !needsHatchName() && !miniGame.active && !rpsGame.active && !careInteraction.active;
}

function getCurrentAccessoryPosition(element) {
  const petBox = elements.pet.getBoundingClientRect();
  const accessoryBox = element.getBoundingClientRect();
  const centerX = accessoryBox.left + accessoryBox.width / 2;
  const centerY = accessoryBox.top + accessoryBox.height / 2;

  return {
    x: clamp(((centerX - petBox.left) / petBox.width) * 100, 0, 100),
    y: clamp(((centerY - petBox.top) / petBox.height) * 100, 0, 100)
  };
}

function moveAccessoryToPointer(event) {
  if (!accessoryDrag.active || !accessoryDrag.element || accessoryDrag.pointerId !== event.pointerId) {
    return;
  }

  const petBox = elements.pet.getBoundingClientRect();
  const position = {
    x: clamp(((event.clientX - petBox.left) / petBox.width) * 100, 0, 100),
    y: clamp(((event.clientY - petBox.top) / petBox.height) * 100, 0, 100)
  };

  state.accessoryPositions[accessoryDrag.itemId] = position;
  applyAccessoryPosition(accessoryDrag.element, accessoryDrag.itemId, position);
}

function startAccessoryDrag(event) {
  const element = event.currentTarget;
  const itemId = element.dataset.itemId || "";
  const slot = element.dataset.accessorySlot || "";

  if (!itemId || element.dataset.equipped !== "true" || !canDragAccessories()) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  if (!state.accessoryPositions[itemId]) {
    state.accessoryPositions[itemId] = getCurrentAccessoryPosition(element);
  }

  accessoryDrag = {
    active: true,
    pointerId: event.pointerId,
    element,
    itemId,
    slot
  };

  element.classList.add("dragging-accessory");
  element.setPointerCapture(event.pointerId);
  moveAccessoryToPointer(event);
  state.lastMessage = `moving ${ITEMS[itemId].label}.`;
  updateMessageDisplays();
}

function continueAccessoryDrag(event) {
  if (!accessoryDrag.active) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  moveAccessoryToPointer(event);
}

function endAccessoryDrag(event) {
  if (!accessoryDrag.active || accessoryDrag.pointerId !== event.pointerId) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  accessoryDrag.element.classList.remove("dragging-accessory");
  state.lastMessage = `${ITEMS[accessoryDrag.itemId].label} position saved.`;
  accessoryDrag = {
    active: false,
    pointerId: null,
    element: null,
    itemId: "",
    slot: ""
  };

  saveState();
  render();
}

function resetAccessoryPositions() {
  state.accessoryPositions = {};
  state.lastMessage = "accessory positions reset.";
  saveState();
  render();
}

function loadState() {
  try {
    const rawSave = localStorage.getItem(SAVE_KEY);

    if (rawSave) {
      return normalizeState(JSON.parse(rawSave));
    }

    for (const key of LEGACY_SAVE_KEYS) {
      const legacySave = localStorage.getItem(key);

      if (legacySave) {
        return normalizeState(JSON.parse(legacySave));
      }
    }

    return defaultState();
  } catch {
    return defaultState();
  }
}

function normalizeState(save) {
  const base = defaultState();
  const validSpecies = SPECIES.some((species) => species.id === save.speciesId);
  const inventory = { ...defaultInventory(), ...(save.inventory || {}) };
  const equipment = { ...defaultEquipment(), ...(save.equipment || {}) };
  const accessoryPositions = normalizeAccessoryPositions(save.accessoryPositions || {});
  const visitingPet = save.visitingPet && typeof save.visitingPet === "object"
    ? normalizeState({ ...save.visitingPet, visitingPet: null, petAway: false })
    : null;

  Object.keys(inventory).forEach((itemId) => {
    inventory[itemId] = Math.max(0, Math.floor(Number(inventory[itemId]) || 0));
  });

  Object.keys(equipment).forEach((slot) => {
    if (!ITEMS[equipment[slot]] || ITEMS[equipment[slot]].slot !== slot || inventory[equipment[slot]] <= 0) {
      equipment[slot] = "";
    }
  });

  return {
    ...base,
    ...save,
    version: 27,
    petId: typeof save.petId === "string" && save.petId.trim() ? save.petId.slice(0, 24) : base.petId,
    playerName: typeof save.playerName === "string" && save.playerName.trim() ? sanitizePlayerName(save.playerName) : base.playerName,
    petAway: Boolean(save.petAway),
    visitingPet,
    name: typeof save.name === "string" && save.name.trim() ? save.name.slice(0, 14) : base.name,
    birthday: Number.isFinite(save.birthday) ? save.birthday : base.birthday,
    lastUpdated: Number.isFinite(save.lastUpdated) ? save.lastUpdated : base.lastUpdated,
    speciesId: validSpecies ? save.speciesId : base.speciesId,
    food: clamp(Number(save.food) || base.food),
    fun: clamp(Number(save.fun) || base.fun),
    energy: clamp(Number(save.energy) || base.energy),
    cleanliness: clamp(Number(save.cleanliness) || base.cleanliness),
    health: clamp(Number(save.health) || base.health),
    affection: clamp(Number(save.affection) || base.affection),
    discipline: clamp(Number(save.discipline) || base.discipline),
    coins: Math.max(0, Math.floor(Number(save.coins) || base.coins)),
    careScore: Math.max(0, Math.floor(Number(save.careScore) || base.careScore)),
    hatchNamed: typeof save.hatchNamed === "boolean" ? save.hatchNamed : Boolean(save.name && save.name !== "sprout" && Number.isFinite(save.birthday) && Date.now() - save.birthday >= 2 * 60000),
    lastSicknessCheck: Number.isFinite(save.lastSicknessCheck) ? save.lastSicknessCheck : base.lastSicknessCheck,
    recentOverfeeds: Math.max(0, Math.floor(Number(save.recentOverfeeds) || base.recentOverfeeds)),
    sleeping: Boolean(save.sleeping),
    sleepStartedAt: Number.isFinite(save.sleepStartedAt) ? save.sleepStartedAt : base.sleepStartedAt,
    sleepUntil: Number.isFinite(save.sleepUntil) ? save.sleepUntil : base.sleepUntil,
    sickness: Boolean(save.sickness),
    dead: Boolean(save.dead || save.hibernating || Number(save.health) <= 0),
    deathReason: typeof save.deathReason === "string" ? save.deathReason : "",
    inventory,
    equipment,
    accessoryPositions,
    lastMessage: typeof save.lastMessage === "string" ? save.lastMessage : base.lastMessage
  };
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  elements.saveStatus.textContent = "saved";
  window.clearTimeout(saveState.statusTimer);
  saveState.statusTimer = window.setTimeout(() => {
    elements.saveStatus.textContent = "autosave";
  }, 900);
}

function isSleeping() {
  return !state.dead && Boolean(state.sleeping) && Number.isFinite(state.sleepUntil) && Date.now() < state.sleepUntil;
}

function getSleepRemainingMinutes() {
  if (!state.sleeping || !Number.isFinite(state.sleepUntil)) {
    return 0;
  }

  return Math.max(0, (state.sleepUntil - Date.now()) / 60000);
}

function getApproxSleepDurationLabel() {
  const hours = Math.round(SLEEP_DURATION_MINUTES / 60);

  if (hours <= 1) {
    return "about an hour";
  }

  return `about ${hours} hours`;
}

function completeSleepNaturally() {
  if (!state.sleeping) {
    return;
  }

  state.sleeping = false;
  state.sleepStartedAt = 0;
  state.sleepUntil = 0;
  state.energy = clamp(state.energy + 8);
  state.health = clamp(state.health + 2);
  state.lastMessage = `${state.name} woke up naturally and feels rested.`;
}

function applySleepDecay(elapsedMinutes, now) {
  const sleepMinutes = Math.min(elapsedMinutes, SLEEP_DURATION_MINUTES);
  const sleepFraction = sleepMinutes / SLEEP_DURATION_MINUTES;
  const dayFraction = elapsedMinutes / MINUTES_PER_DAY;

  state.energy = clamp(state.energy + SLEEP_ENERGY_GAIN * sleepFraction);
  state.food = clamp(state.food - DAILY_DECAY.food * dayFraction * 0.45);
  state.cleanliness = clamp(state.cleanliness - DAILY_DECAY.cleanliness * dayFraction * 0.35);
  state.fun = clamp(state.fun - DAILY_DECAY.fun * dayFraction * 0.12);
  state.affection = clamp(state.affection - DAILY_DECAY.affection * dayFraction * 0.1);

  if (now >= state.sleepUntil) {
    completeSleepNaturally();
  }
}

function startTimedSleep() {
  if (state.dead || state.sleeping || miniGame.active || careInteraction.active || blockEggCare()) {
    return;
  }

  const now = Date.now();

  state.sleeping = true;
  state.sleepStartedAt = now;
  state.sleepUntil = now + SLEEP_DURATION_MINUTES * 60000;
  state.lastUpdated = now;
  state.careScore += 1;
  state.lastMessage = `${state.name} curled up to sleep for ${getApproxSleepDurationLabel()}. wake them early only if you really need to.`;
  speakFromDialogue("sleep");
  saveState();
  render();
}

function wakeEarly() {
  if (!state.sleeping) {
    return;
  }

  state.sleeping = false;
  state.sleepStartedAt = 0;
  state.sleepUntil = 0;
  state.fun = clamp(state.fun - WAKE_UP_FUN_PENALTY);
  state.affection = clamp(state.affection - WAKE_UP_AFFECTION_PENALTY);
  state.energy = clamp(state.energy + 4);
  state.lastUpdated = Date.now();
  state.lastMessage = `${state.name} was woken up early and is very upset.`;
  speakFromDialogue("wake", true);
  checkDeath("stress");
  saveState();
  render();
}

function applyDecay() {
  const now = Date.now();
  const elapsedMinutes = Math.min((now - state.lastUpdated) / 60000, 4320);

  if (elapsedMinutes <= 0 || state.dead || state.petAway) {
    state.lastUpdated = now;
    return;
  }

  if (getStage() === "egg") {
    state.lastUpdated = now;
    state.lastSicknessCheck = now;
    state.sleeping = false;
    state.sleepStartedAt = 0;
    state.sleepUntil = 0;
    return;
  }

  if (state.sleeping) {
    applySleepDecay(elapsedMinutes, now);
    state.lastUpdated = now;
    checkDeath("neglect");
    return;
  }

  const dayFraction = elapsedMinutes / MINUTES_PER_DAY;

  state.food = clamp(state.food - DAILY_DECAY.food * dayFraction);
  state.fun = clamp(state.fun - DAILY_DECAY.fun * dayFraction);
  state.energy = clamp(state.energy - DAILY_DECAY.energy * dayFraction);
  state.cleanliness = clamp(state.cleanliness - DAILY_DECAY.cleanliness * dayFraction);
  state.affection = clamp(state.affection - DAILY_DECAY.affection * dayFraction);
  state.recentOverfeeds = Math.max(0, state.recentOverfeeds - elapsedMinutes / 360);

  const criticalNeeds = [state.food, state.fun, state.energy, state.cleanliness].filter((need) => need < 12).length;
  const emptyNeeds = [state.food, state.fun, state.energy, state.cleanliness].filter((need) => need <= 0).length;

  if (criticalNeeds > 0) {
    state.health = clamp(state.health - elapsedMinutes * criticalNeeds * 0.006);
  } else if (!state.sickness && state.health < 100) {
    state.health = clamp(state.health + elapsedMinutes * 0.012);
  }

  if (state.sickness) {
    state.health = clamp(state.health - elapsedMinutes * 0.009);
  }

  if (emptyNeeds >= 2 && elapsedMinutes > 720) {
    state.health = clamp(state.health - elapsedMinutes * 0.006);
  }

  maybeBecomeSick(now, elapsedMinutes);
  state.lastUpdated = now;
  checkDeath("neglect");
}

function maybeBecomeSick(now, elapsedMinutes) {
  if (state.sickness || now - state.lastSicknessCheck < SICKNESS_CHECK_MINUTES * 60000) {
    return;
  }

  state.lastSicknessCheck = now;

  let sicknessChance = 0;

  if (state.food < 6 || state.cleanliness < 6) {
    sicknessChance += 0.08;
  }

  if (state.food <= 0 || state.cleanliness <= 0) {
    sicknessChance += 0.14;
  }

  if (state.health < 35) {
    sicknessChance += 0.08;
  }

  if (state.recentOverfeeds >= 2) {
    sicknessChance += 0.1;
  }

  if (elapsedMinutes > 1440 && (state.food < 15 || state.cleanliness < 15)) {
    sicknessChance += 0.1;
  }

  if (sicknessChance > 0 && Math.random() < sicknessChance) {
    state.sickness = true;
    state.lastMessage = `${state.name} became sick. this is rare, but neglect or overfeeding makes it more likely.`;
  }
}

function checkDeath(reason = "unknown") {
  if (state.dead || state.health > 0) {
    return;
  }

  state.health = 0;
  state.dead = true;
  state.sickness = false;
  state.deathReason = reason;
  state.lastMessage = `${state.name} died from ${reason}. reset to raise a new creature.`;
}

function getAgeMinutes() {
  return Math.max(0, Math.floor((Date.now() - state.birthday) / 60000));
}

function getStage() {
  const age = getAgeMinutes();

  if (age < 2) {
    return "egg";
  }

  if (age < 60) {
    return "baby";
  }

  if (age < 360) {
    return "child";
  }

  if (age < 1440) {
    return "teen";
  }

  if (age < 4320) {
    return "adult";
  }

  return "elder";
}

function getStageForPet(petState) {
  const age = Math.max(0, Math.floor((Date.now() - Number(petState.birthday || Date.now())) / 60000));

  if (age < 2) return "egg";
  if (age < 60) return "baby";
  if (age < 360) return "child";
  if (age < 1440) return "teen";
  if (age < 4320) return "adult";
  return "elder";
}

function getMoodForPet(petState) {
  if (petState.dead) return "dead";
  if (petState.sickness || petState.health < 35) return "sick";
  if (petState.food < 30 || petState.fun < 30 || petState.energy < 25 || petState.cleanliness < 30 || petState.affection < 25) return "sad";
  if (petState.food > 70 && petState.fun > 70 && petState.energy > 60 && petState.cleanliness > 70 && petState.affection > 60) return "happy";
  return "calm";
}

function applySpeciesStylesToElement(element, species) {
  element.style.setProperty("--pet", species.pet);
  element.style.setProperty("--pet-light", species.light);
  element.style.setProperty("--pet-dark", species.dark);
  element.style.setProperty("--pet-accent", species.accent);
  element.style.setProperty("--pet-extra", species.extraColor);
}

function getPetClassListForState(petState, extraClasses = []) {
  const stage = getStageForPet(petState);
  const mood = getMoodForPet(petState);
  const species = getSpecies(petState.speciesId);

  return [
    "pet",
    ...extraClasses,
    `stage-${stage}`,
    `mood-${mood}`,
    `body-${species.body}`,
    `ears-${species.ears}`,
    `tail-${species.tail}`,
    `wings-${species.wings}`,
    `extra-${species.extra}`,
    `face-${species.face}`
  ].join(" ");
}

function isEggStage(stageOverride = "") {
  const stage = stageOverride || getStage();
  return !state.petAway && !state.dead && stage === "egg";
}

function needsHatchName(stageOverride = "") {
  const stage = stageOverride || getStage();
  return !state.dead && stage !== "egg" && !state.hatchNamed;
}

function getDisplayName(stageOverride = "") {
  const stage = stageOverride || getStage();

  if (stage === "egg") {
    return "egg";
  }

  if (!state.hatchNamed) {
    return "unnamed";
  }

  return state.name;
}

function needsPlayerName() {
  return !state.playerName || !state.playerName.trim();
}

function sanitizePlayerName(rawName) {
  return rawName.trim().replace(/[^a-zA-Z0-9_\-\s']/g, "").replace(/\s+/g, " ").slice(0, 24);
}

function showPlayerNameIfNeeded() {
  if (!elements.playerNameModal) {
    return;
  }

  const needsName = needsPlayerName();

  elements.playerNameModal.classList.toggle("hidden", !needsName);
  elements.playerNameModal.setAttribute("aria-hidden", needsName ? "false" : "true");

  if (needsName) {
    window.setTimeout(() => elements.playerNameInput?.focus(), 0);
  }
}

function completePlayerNaming() {
  const cleanName = sanitizePlayerName(elements.playerNameInput.value);

  if (!cleanName) {
    elements.playerNameError.textContent = "enter_your_name_first";
    return;
  }

  state.playerName = cleanName;
  state.lastMessage = `welcome, ${state.playerName}.`;
  elements.playerNameInput.value = "";
  elements.playerNameError.textContent = "";
  saveState();
  render();
}

function blockPlayerNameCare() {
  if (!needsPlayerName()) {
    return false;
  }

  closeCareScene();
  state.lastMessage = "enter your name first.";
  render();
  return true;
}

function blockAwayPetCare() {
  if (!state.petAway) {
    return false;
  }

  closeCareScene();
  state.lastMessage = "your pet is on its tag. bring it back from the pet_tag tab.";
  render();
  return true;
}

function sanitizePetName(rawName) {
  return rawName.trim().toLowerCase().replace(/[^a-z0-9_\-\s]/g, "").replace(/\s+/g, "_").slice(0, 14);
}

function showHatchNamingIfNeeded(stageOverride = "") {
  if (!elements.hatchNamingModal) {
    return;
  }

  const needsName = !needsPlayerName() && needsHatchName(stageOverride);

  elements.hatchNamingModal.classList.toggle("hidden", !needsName);
  elements.hatchNamingModal.setAttribute("aria-hidden", needsName ? "false" : "true");

  if (needsName) {
    elements.nameInput.disabled = true;
    state.lastMessage = "the egg hatched. give your new pet a name.";
    window.setTimeout(() => elements.hatchNameInput?.focus(), 0);
  }
}

function completeHatchNaming() {
  const cleanName = sanitizePetName(elements.hatchNameInput.value);

  if (!cleanName) {
    elements.hatchNameError.textContent = "enter_a_name_first";
    return;
  }

  state.name = cleanName;
  state.hatchNamed = true;
  state.lastMessage = `${state.name} hatched. care can begin.`;
  elements.hatchNameInput.value = "";
  elements.hatchNameError.textContent = "";
  saveState();
  render();
}

function blockHatchNamingCare() {
  if (!needsHatchName()) {
    return false;
  }

  closeCareScene();
  state.lastMessage = "name the newly hatched pet before caring for it.";
  render();
  return true;
}

function getEggWaitMessage() {
  return "the egg is still waiting to hatch. care unlocks after hatching, but the shop stays open while you wait.";
}

function blockEggCare() {
  if (!isEggStage()) {
    return false;
  }

  closeCareScene();
  state.lastMessage = getEggWaitMessage();
  saveState();
  render();
  return true;
}

function hideEggSpeciesMessage() {
  if (!isEggStage()) {
    return;
  }

  const revealsSpecies = SPECIES.some((species) => state.lastMessage.includes(species.label));

  if (revealsSpecies || state.lastMessage.includes("egg")) {
    state.lastMessage = "a mysterious egg is waiting. care unlocks after hatching, but the shop is open.";
  }
}

function getMood() {
  if (state.dead) {
    return "dead";
  }

  if (isSleeping()) {
    return "sleeping";
  }

  if (state.sickness || state.health < 35) {
    return "sick";
  }

  if (state.food < 30 || state.fun < 30 || state.energy < 25 || state.cleanliness < 30 || state.affection < 25) {
    return "sad";
  }

  if (state.food > 70 && state.fun > 70 && state.energy > 60 && state.cleanliness > 70 && state.affection > 60) {
    return "happy";
  }

  return "calm";
}

function getAgeLabel() {
  const age = getAgeMinutes();

  if (age < 60) {
    return `${age}m`;
  }

  if (age < 1440) {
    const hours = Math.floor(age / 60);
    const minutes = age % 60;

    return `${hours}h_${minutes}m`;
  }

  const days = Math.floor(age / 1440);
  const hours = Math.floor((age % 1440) / 60);

  return hours > 0 ? `${days}d_${hours}h` : `${days}d`;
}

function getDirtSpotCount() {
  if (state.dead || getStage() === "egg") {
    return 0;
  }

  if (state.cleanliness >= 78) {
    return 0;
  }

  if (state.cleanliness >= 62) {
    return 1;
  }

  if (state.cleanliness >= 46) {
    return 2;
  }

  if (state.cleanliness >= 30) {
    return 3;
  }

  if (state.cleanliness >= 14) {
    return 4;
  }

  return 5;
}

function clearDirtSpotInlineStyles(spot) {
  spot.style.display = "";
  spot.style.visibility = "";
  spot.style.opacity = "";
  spot.style.zIndex = "";
}

function setDirtSpotsForCleanliness() {
  if (careInteraction.active) {
    return;
  }

  const dirtCount = getDirtSpotCount();

  elements.dirtSpots.forEach((spot, index) => {
    spot.classList.remove("cleaned");
    clearDirtSpotInlineStyles(spot);
    spot.classList.toggle("hidden", index >= dirtCount);
  });
}

function setDirtSpotsForCleaning(dirtCount) {
  elements.dirtSpots.forEach((spot, index) => {
    spot.classList.remove("cleaned");
    clearDirtSpotInlineStyles(spot);

    if (index < dirtCount) {
      forceShowDirtSpot(spot);
    } else {
      spot.classList.add("hidden");
    }
  });
}

function setBar(bar, value) {
  const rounded = Math.round(value);

  bar.style.width = `${rounded}%`;
  bar.classList.toggle("low", rounded < 30);
  bar.classList.toggle("mid", rounded >= 30 && rounded < 65);
}

function applySpeciesStyles(species) {
  applySpeciesStylesToElement(elements.pet, species);
}

function getEquipmentClasses() {
  return Object.values(state.equipment)
    .filter(Boolean)
    .map((itemId) => `gear-${itemId}`);
}

function getStatLabel(value) {
  return value.toFixed(1);
}

function formatMinutes(minutes) {
  if (!Number.isFinite(minutes)) {
    return "not needed";
  }

  if (minutes <= 0) {
    return "now";
  }

  if (minutes < 60) {
    return `${Math.ceil(minutes)}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = Math.ceil(minutes % 60);

  if (hours < 24) {
    return mins > 0 ? `${hours}h_${mins}m` : `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return remainingHours > 0 ? `${days}d_${remainingHours}h` : `${days}d`;
}

function minutesUntilStat(targetValue, currentValue, dailyLoss) {
  if (currentValue <= targetValue) {
    return 0;
  }

  return ((currentValue - targetValue) / dailyLoss) * MINUTES_PER_DAY;
}

function getCareWindowText(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "now";
  }

  if (minutes <= 45) {
    return "soon";
  }

  if (minutes <= 360) {
    return "later today";
  }

  if (minutes <= 900) {
    return "much later";
  }

  return "tomorrow";
}

function getNextFeedText() {
  if (state.dead) {
    return "no care needed";
  }

  if (isSleeping()) {
    return "when awake";
  }

  return getCareWindowText(minutesUntilStat(45, state.food, DAILY_DECAY.food));
}

function getNextCleanText() {
  if (state.dead) {
    return "no care needed";
  }

  if (isSleeping()) {
    return "when awake";
  }

  const nextDirtThreshold = state.cleanliness > 78 ? 78 : state.cleanliness > 62 ? 62 : state.cleanliness > 46 ? 46 : state.cleanliness > 30 ? 30 : state.cleanliness > 14 ? 14 : 0;

  if (nextDirtThreshold <= 0) {
    return "now";
  }

  return getCareWindowText(minutesUntilStat(nextDirtThreshold, state.cleanliness, DAILY_DECAY.cleanliness));
}

function getMedicineText() {
  if (state.dead) {
    return "no care needed";
  }

  if (isSleeping()) {
    return state.sickness ? "when awake" : "only if sick";
  }

  if (state.sickness) {
    return "needed now";
  }

  if (state.health <= 65) {
    return "watch health";
  }

  return "only if sick";
}

function getLastTickText() {
  return "";
}

function getPetSpeechBubbleText(message = state.lastMessage) {
  if (!message || typeof message !== "string") {
    return "";
  }

  const matches = [...message.matchAll(/[“"]([^”"]+)[”"]/g)];

  if (matches.length === 0) {
    return "";
  }

  return matches[matches.length - 1][1].trim();
}

function updateMessageDisplays() {
  elements.petMessage.textContent = state.lastMessage;

  if (!elements.speechBubble || !elements.speechText) {
    return;
  }

  const speechText = state.petAway ? "" : getPetSpeechBubbleText(state.lastMessage);
  const showSpeech = Boolean(speechText);

  elements.speechText.textContent = speechText;
  elements.speechBubble.hidden = !showSpeech;
  elements.speechBubble.classList.toggle("hidden", !showSpeech);
}

function renderVisitorPet() {
  const visitor = state.visitingPet;
  const hasVisitor = Boolean(visitor);

  elements.petArea.classList.toggle("has-visitor", hasVisitor);
  elements.petArea.classList.toggle("pet-is-away", Boolean(state.petAway));
  elements.pet.hidden = Boolean(state.petAway);
  elements.travelEmpty.hidden = !state.petAway;
  elements.visitorSlot.hidden = !hasVisitor;

  if (elements.petShadow) {
    elements.petShadow.hidden = Boolean(state.petAway && !hasVisitor);
  }

  if (!hasVisitor) {
    return;
  }

  const species = getSpecies(visitor.speciesId);
  applySpeciesStylesToElement(elements.visitorPet, species);
  elements.visitorPet.className = getPetClassListForState(visitor, ["visitor-pet"]);
  elements.visitorLabel.textContent = `${visitor.name || "visitor"} visiting from ${visitor.playerName || "another player"}`;
}

function renderRealTimePanel() {
  if (!elements.realTimeSummary || !elements.realTimePanel) {
    return;
  }

  const hidden = needsPlayerName() || isEggStage() || needsHatchName();

  elements.realTimePanel.hidden = hidden;

  if (hidden) {
    return;
  }

  elements.nextFeedLabel.textContent = getNextFeedText();
  elements.nextCleanLabel.textContent = getNextCleanText();
  elements.nextMedicineLabel.textContent = getMedicineText();

  if (elements.lastTickLabel) {
    elements.lastTickLabel.textContent = "";
  }

  if (state.dead) {
    elements.realTimeSummary.textContent = "care has ended";
    return;
  }

  if (isSleeping()) {
    elements.realTimeSummary.textContent = "sleeping deeply";
    return;
  }

  elements.realTimeSummary.textContent = "daily care is active";
}

function render() {
  const stage = getStage();
  const mood = getMood();
  const species = getSpecies(state.speciesId);

  hideEggSpeciesMessage();
  applySpeciesStyles(species);

  elements.nameInput.value = state.petAway ? "on_tag" : getDisplayName(stage);
  elements.nameInput.disabled = state.petAway || isEggStage(stage) || needsHatchName(stage);
  elements.stageLabel.textContent = state.petAway ? "on_tag" : state.dead ? "dead" : stage;
  elements.ageLabel.textContent = getAgeLabel();
  elements.coinLabel.textContent = state.coins;
  elements.moodLabel.textContent = mood;
  elements.speciesLabel.textContent = isEggStage() ? "unknown" : species.label;
  elements.affectionLabel.textContent = Math.round(state.affection);
  elements.disciplineLabel.textContent = Math.round(state.discipline);
  updateMessageDisplays();

  elements.foodValue.textContent = getStatLabel(state.food);
  elements.funValue.textContent = getStatLabel(state.fun);
  elements.energyValue.textContent = getStatLabel(state.energy);
  elements.cleanlinessValue.textContent = getStatLabel(state.cleanliness);
  elements.healthValue.textContent = getStatLabel(state.health);

  setBar(elements.foodBar, state.food);
  setBar(elements.funBar, state.fun);
  setBar(elements.energyBar, state.energy);
  setBar(elements.cleanlinessBar, state.cleanliness);
  setBar(elements.healthBar, state.health);

  elements.pet.className = [
    getPetClassListForState(state),
    ...getEquipmentClasses()
  ].join(" ");

  renderAccessoryPositions();
  renderVisitorPet();

  elements.screen.classList.toggle("dead-screen", state.dead);
  elements.screen.classList.toggle("egg-wait-screen", isEggStage(stage));
  elements.screen.classList.toggle("sleep-screen", isSleeping());
  elements.screen.classList.toggle("player-naming-screen", needsPlayerName());
  elements.screen.classList.toggle("hatch-naming-screen", needsHatchName(stage));
  showPlayerNameIfNeeded();
  showHatchNamingIfNeeded(stage);
  setDirtSpotsForCleanliness();
  renderRealTimePanel();

  document.querySelectorAll("[data-action], #mini-game-button, #rps-game-button").forEach((button) => {
    const lockedByEgg = isEggStage(stage);
    const sleeping = isSleeping();
    const action = button.dataset.action || "";
    const namingLocked = needsHatchName(stage);
    const canWake = sleeping && action === "nap";

    if (action === "nap") {
      button.textContent = sleeping ? "wake_up" : "nap";
    }

    button.disabled = state.dead || lockedByEgg || namingLocked || miniGame.active || rpsGame.active || careInteraction.active || (sleeping && !canWake);
    button.setAttribute("aria-disabled", button.disabled ? "true" : "false");

    if (lockedByEgg) {
      button.title = "care unlocks after hatching";
    } else if (namingLocked) {
      button.title = "name the pet before care starts";
    } else if (sleeping && canWake) {
      button.title = "wake the creature early";
    } else if (sleeping) {
      button.title = "the creature is asleep";
    } else {
      button.title = "";
    }
  });

  elements.resetButton.disabled = miniGame.active || rpsGame.active || careInteraction.active;

  if (elements.accessoryResetButton) {
    elements.accessoryResetButton.disabled = state.petAway || state.dead || miniGame.active || rpsGame.active || careInteraction.active || Object.keys(state.accessoryPositions).length === 0;
  }

  if (elements.rpsPanel) {
    elements.rpsPanel.classList.toggle("hidden", !rpsGame.active);
    elements.rpsStreak.textContent = rpsGame.streak;
    elements.rpsTotal.textContent = rpsGame.totalCoins;
  }

  renderInventory();
  renderEquipment();
  renderShop();
  renderNfcPanel();
}

function getInventoryButtonMarkup(item, action, buttonClass = "") {
  return `<button class="${buttonClass}" type="button" data-inventory-item="${item.id}" ${state.petAway || state.dead || isEggStage() || needsHatchName() || isSleeping() || miniGame.active || rpsGame.active || careInteraction.active ? "disabled" : ""}>${isEggStage() ? "wait" : needsHatchName() ? "name_first" : isSleeping() ? "sleeping" : rpsGame.active ? "playing" : action}</button>`;
}

function renderOwnedItemCard(itemId) {
  const item = ITEMS[itemId];
  const count = state.inventory[itemId];
  const equipped = item.slot && state.equipment[item.slot] === itemId;
  const action = item.kind === "accessory" ? (equipped ? "unequip" : "equip") : "use";
  const buttonClass = equipped ? "secondary" : "";

  return `
    <article class="item-card">
      <div class="item-topline">
        <div>
          <h3 class="item-name">${item.label}</h3>
          <span class="item-kind">${item.kind}</span>
        </div>
        <strong>x${count}</strong>
      </div>
      <p>${item.description}</p>
      ${getInventoryButtonMarkup(item, action, buttonClass)}
    </article>`;
}

function renderEquipmentItemCard(itemId) {
  const item = ITEMS[itemId];
  const owned = state.inventory[itemId] > 0;
  const equipped = item.slot && state.equipment[item.slot] === itemId;
  const disabledByState = state.petAway || state.dead || isEggStage() || needsHatchName() || isSleeping() || miniGame.active || rpsGame.active || careInteraction.active;
  const disabledBuy = disabledByState || state.coins < item.price;
  let button = "";

  if (!owned) {
    button = `<button type="button" data-equipment-buy="${item.id}" ${disabledBuy ? "disabled" : ""}>buy_${item.price}</button>`;
  } else if (item.kind === "accessory") {
    button = getInventoryButtonMarkup(item, equipped ? "unequip" : "equip", equipped ? "secondary" : "");
  } else {
    button = `<button type="button" disabled>owned</button>`;
  }

  return `
    <article class="item-card ${owned ? "owned-equipment" : "unowned-equipment"}">
      <div class="item-topline">
        <div>
          <h3 class="item-name">${item.label}</h3>
          <span class="item-kind">${item.kind}</span>
        </div>
        <strong>${owned ? "owned" : `${item.price}c`}</strong>
      </div>
      <p>${item.description}</p>
      ${button}
    </article>`;
}

function renderInventory() {
  const ownedItemIds = SHOP_ORDER.filter((itemId) => state.inventory[itemId] > 0 && ITEMS[itemId].kind !== "accessory");
  const totalItems = ownedItemIds.reduce((total, itemId) => total + state.inventory[itemId], 0);

  elements.inventorySummary.textContent = `${totalItems} supplies`;

  if (ownedItemIds.length === 0) {
    elements.inventoryGrid.innerHTML = `<div class="empty-state">no supplies. buy consumables from the shop.</div>`;
    return;
  }

  elements.inventoryGrid.innerHTML = ownedItemIds.map(renderOwnedItemCard).join("");
}

function renderEquipment() {
  const ownedItemIds = EQUIPMENT_ORDER.filter((itemId) => state.inventory[itemId] > 0);
  const equippedCount = EQUIPMENT_ORDER.filter((itemId) => ITEMS[itemId].slot && state.equipment[ITEMS[itemId].slot] === itemId).length;

  elements.equipmentSummary.textContent = `${equippedCount}/${ownedItemIds.length} enabled`;

  elements.equipmentGrid.innerHTML = EQUIPMENT_ORDER.map(renderEquipmentItemCard).join("");
}

function renderShop() {
  elements.shopGrid.innerHTML = SHOP_ORDER.map((itemId) => {
    const item = ITEMS[itemId];
    const owned = state.inventory[itemId] || 0;
    const alreadyOwned = item.permanent && owned > 0;
    const disabled = state.petAway || state.dead || miniGame.active || rpsGame.active || careInteraction.active || state.coins < item.price || alreadyOwned;
    const label = alreadyOwned ? "owned" : `buy_${item.price}`;

    return `
      <article class="item-card">
        <div class="item-topline">
          <div>
            <h3 class="item-name">${item.label}</h3>
            <span class="item-kind">${item.kind}</span>
          </div>
          <strong>${item.price}c</strong>
        </div>
        <p>${item.description}</p>
        <button type="button" data-shop-item="${item.id}" ${disabled ? "disabled" : ""}>${label}</button>
      </article>`;
  }).join("");
}

function addEffect(effect) {
  state.food = clamp(state.food + (effect.food || 0));
  state.fun = clamp(state.fun + (effect.fun || 0));
  state.energy = clamp(state.energy + (effect.energy || 0));
  state.cleanliness = clamp(state.cleanliness + (effect.cleanliness || 0));
  state.health = clamp(state.health + (effect.health || 0));
  state.affection = clamp(state.affection + (effect.affection || 0));
  state.discipline = clamp(state.discipline + (effect.discipline || 0));
}

function consumeItem(itemId) {
  if (!state.inventory[itemId]) {
    return false;
  }

  state.inventory[itemId] -= 1;
  return true;
}

function useItem(itemId) {
  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active) {
    return;
  }

  if (blockPlayerNameCare()) {
    return;
  }

  if (blockAwayPetCare()) {
    return;
  }

  if (blockEggCare()) {
    return;
  }

  if (blockHatchNamingCare()) {
    return;
  }

  if (isSleeping()) {
    state.lastMessage = `${state.name} is asleep. press wake_up if you really want to wake them, but it will badly upset them.`;
    render();
    return;
  }

  const item = ITEMS[itemId];

  if (!item || state.inventory[itemId] <= 0) {
    return;
  }

  if (item.kind === "accessory") {
    toggleEquipment(item);
    return;
  }

  if (item.kind === "food") {
    startFeedInteraction(item.id);
    return;
  }

  if (item.kind === "medicine") {
    startMedicineInteraction(item.id);
    return;
  }

  if (item.kind === "care") {
    startCleanInteraction(item.id);
    return;
  }

  if (item.kind === "class") {
    useClass(item);
  }
}

function useFood(item) {
  if (state.food > 88) {
    consumeItem(item.id);
    state.health = clamp(state.health - 5);
    state.fun = clamp(state.fun - 2);
    state.recentOverfeeds += 1;

    if (state.recentOverfeeds >= 3 && Math.random() < 0.35) {
      state.sickness = true;
      state.lastMessage = `${state.name} was overfed and became sick.`;
    } else {
      state.lastMessage = `${state.name} is too full. overfeeding can cause sickness.`;
    }

    finishAction("overfeeding");
    return;
  }

  consumeItem(item.id);
  addEffect(item.effect);
  state.affection = clamp(state.affection + 2);
  state.lastMessage = `${state.name} ate ${item.label}. about three sensible feedings a day should be enough.`;
  speakFromDialogue("feed");
  finishAction();
}

function useMedicine(item) {
  if (!state.sickness && state.health > 65) {
    state.lastMessage = `${state.name} does not need medicine. keep it for actual sickness or serious low health.`;
    render();
    return;
  }

  consumeItem(item.id);
  addEffect(item.effect);

  if (item.cures || Math.random() < (item.cureChance || 0)) {
    state.sickness = false;
    state.recentOverfeeds = 0;
    state.lastMessage = `${state.name} took ${item.label} and recovered.`;
  } else {
    state.lastMessage = `${state.name} took ${item.label}, but still seems sick.`;
  }

  speakFromDialogue("medicine");
  finishAction();
}

function useClass(item) {
  if (blockEggCare()) {
    return;
  }

  if (blockHatchNamingCare()) {
    return;
  }

  if (isSleeping()) {
    state.lastMessage = `${state.name} is asleep. class has to wait until they wake.`;
    render();
    return;
  }

  if (state.energy < 18 || state.food < 15) {
    state.lastMessage = `${state.name} is too hungry or tired for class.`;
    render();
    return;
  }

  consumeItem(item.id);
  addEffect(item.effect);
  const reward = Math.max(1, Math.floor(state.discipline / 30));
  state.coins += reward;
  state.lastMessage = `${state.name} completed ${item.label} and earned ${reward} coins.`;
  speakFromDialogue("class");
  finishAction();
}

function toggleEquipment(item) {
  if (state.equipment[item.slot] === item.id) {
    state.equipment[item.slot] = "";
    state.lastMessage = `${state.name} took off ${item.label}.`;
  } else {
    state.equipment[item.slot] = item.id;
    state.affection = clamp(state.affection + 1);
    state.lastMessage = `${state.name} equipped ${item.label}. drag it on the pet to move it.`;
  }

  saveState();
  render();
}

function buyItem(itemId) {
  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active) {
    return;
  }

  if (blockPlayerNameCare()) {
    return;
  }

  if (blockAwayPetCare()) {
    return;
  }

  const item = ITEMS[itemId];

  if (!item) {
    return;
  }

  if (item.permanent && state.inventory[itemId] > 0) {
    state.lastMessage = `${item.label} is already owned.`;
    render();
    return;
  }

  if (state.coins < item.price) {
    state.lastMessage = `not enough coins for ${item.label}.`;
    render();
    return;
  }

  state.coins -= item.price;
  state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;

  if (item.kind === "accessory") {
    state.lastMessage = `bought ${item.label}. equip it in the equipment tab.`;
  } else if (item.permanent) {
    state.lastMessage = `bought ${item.label}. it is now enabled.`;
  } else {
    state.lastMessage = `bought ${item.label}.`;
  }
  saveState();
  render();
}

function setCareMessage(message) {
  state.lastMessage = message;
  elements.petMessage.textContent = message;
}

function forceShowCareTool(tool) {
  tool.classList.remove("hidden");
  tool.removeAttribute("hidden");
  tool.style.display = "block";
  tool.style.visibility = "visible";
  tool.style.opacity = "1";
  tool.style.pointerEvents = "auto";
  tool.style.zIndex = "80";
}

function forceShowDirtSpot(spot) {
  spot.classList.remove("hidden");
  spot.removeAttribute("hidden");
  spot.style.display = "block";
  spot.style.visibility = "visible";
  spot.style.opacity = "1";
  spot.style.zIndex = "70";
}

function resetCareTool(tool) {
  tool.classList.remove("dragging");
  tool.style.left = "1rem";
  tool.style.top = "";
  tool.style.bottom = "0.9rem";
  tool.style.display = "";
  tool.style.visibility = "";
  tool.style.opacity = "";
  tool.style.pointerEvents = "";
  tool.style.zIndex = "";
}

function resetCareScene() {
  [elements.foodTool, elements.spongeTool, elements.syringeTool].forEach((element) => {
    element.classList.add("hidden");
    element.classList.remove("active-target");
  });

  [elements.foodTool, elements.spongeTool, elements.syringeTool].forEach((tool) => resetCareTool(tool));
  elements.dirtSpots.forEach((spot) => {
    spot.classList.add("hidden");
    spot.classList.remove("cleaned");
  });

  elements.careCancel.classList.add("hidden");
  elements.petArea.classList.remove("care-active", "care-feed", "care-clean", "care-medicine", "mouth-ready", "body-ready");
}

function openCareScene(kind, title, instruction, itemId = "") {
  if (blockPlayerNameCare()) {
    return false;
  }

  if (blockAwayPetCare()) {
    return false;
  }

  if (blockHatchNamingCare()) {
    return false;
  }

  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active || isSleeping()) {
    if (isSleeping()) {
      state.lastMessage = `${state.name} is asleep. wake them first, but expect a big mood drop.`;
      render();
    }

    return false;
  }

  if (blockEggCare()) {
    return false;
  }

  careInteraction = {
    active: true,
    kind,
    itemId,
    pointerId: null,
    tool: null,
    cleaned: 0,
    injecting: false,
    targetDirtCount: 0
  };

  resetCareScene();
  elements.petArea.classList.add("care-active", `care-${kind}`);
  elements.careCancel.classList.remove("hidden");
  setCareMessage(`${title}: ${instruction}`);
  render();
  setCareMessage(`${title}: ${instruction}`);
  return true;
}

function closeCareScene() {
  careInteraction = {
    active: false,
    kind: "",
    itemId: "",
    pointerId: null,
    tool: null,
    cleaned: 0,
    injecting: false,
    targetDirtCount: 0
  };

  resetCareScene();
}

function cancelCareScene() {
  if (!careInteraction.active) {
    return;
  }

  state.lastMessage = "care cancelled. no item was used.";
  closeCareScene();
  render();
}

function startFeedInteraction(itemId) {
  if (blockEggCare()) {
    return;
  }

  const item = ITEMS[itemId];

  if (!item || item.kind !== "food" || state.inventory[itemId] <= 0) {
    state.lastMessage = "no usable food selected.";
    render();
    return;
  }

  const feedInstruction = `drag the food directly onto ${state.name}'s mouth and release it there.`;

  if (!openCareScene("feed", `feeding ${item.label}`, feedInstruction, itemId)) {
    return;
  }

  forceShowCareTool(elements.foodTool);
}

function startCleanInteraction(itemId = "") {
  if (blockEggCare()) {
    return;
  }

  const dirtCount = getDirtSpotCount();

  if (dirtCount <= 0) {
    state.lastMessage = `${state.name} is already clean. dirt will come back as the clean value drops.`;
    render();
    return;
  }

  const usingSoap = itemId && ITEMS[itemId] && state.inventory[itemId] > 0;
  const title = usingSoap ? `washing with ${ITEMS[itemId].label}` : "basic sponge wash";
  const dirtText = dirtCount === 1 ? "the dirt spot" : `all ${dirtCount} dirt spots`;
  const instruction = usingSoap ? `rub the sponge directly across ${dirtText} on ${state.name}. ${ITEMS[itemId].label} will be used when the wash is complete.` : `rub the sponge directly across ${dirtText} on ${state.name}. this basic wash is weaker than bubble_soap.`;

  if (!openCareScene("clean", title, instruction, usingSoap ? itemId : "")) {
    return;
  }

  careInteraction.targetDirtCount = dirtCount;
  forceShowCareTool(elements.spongeTool);
  setDirtSpotsForCleaning(dirtCount);
}

function startMedicineInteraction(itemId) {
  if (blockEggCare()) {
    return;
  }

  const item = ITEMS[itemId];

  if (!item || item.kind !== "medicine" || state.inventory[itemId] <= 0) {
    state.lastMessage = "no usable medicine selected.";
    render();
    return;
  }

  if (!state.sickness && state.health > 65) {
    state.lastMessage = `${state.name} does not need medicine. save it for real sickness or serious low health.`;
    render();
    return;
  }

  if (!openCareScene("medicine", `medicine: ${item.label}`, `drag the syringe directly onto ${state.name}'s body and release it there to apply the medicine.`, itemId)) {
    return;
  }

  forceShowCareTool(elements.syringeTool);
}

function getFeedTarget() {
  return elements.petMouth;
}

function getFeedTargetName() {
  return "mouth";
}

function getOverlap(first, second) {
  const firstBox = first.getBoundingClientRect();
  const secondBox = second.getBoundingClientRect();

  return !(firstBox.right < secondBox.left || firstBox.left > secondBox.right || firstBox.bottom < secondBox.top || firstBox.top > secondBox.bottom);
}

function moveCareTool(tool, event) {
  const field = elements.petArea.getBoundingClientRect();
  const toolBox = tool.getBoundingClientRect();
  const x = clamp(event.clientX - field.left - toolBox.width / 2, 4, field.width - toolBox.width - 4);
  const y = clamp(event.clientY - field.top - toolBox.height / 2, 4, field.height - toolBox.height - 4);

  tool.style.left = `${x}px`;
  tool.style.top = `${y}px`;
  tool.style.bottom = "auto";
}

function updateCareTargetHighlights() {
  const feedTarget = getFeedTarget();
  const overFeedTarget = careInteraction.kind === "feed" && getOverlap(elements.foodTool, feedTarget);
  const overMouth = overFeedTarget && feedTarget === elements.petMouth;
  const overBody = careInteraction.kind === "medicine" && getOverlap(elements.syringeTool, elements.petBody);
  const overShell = overFeedTarget && feedTarget === elements.petBody;

  elements.petArea.classList.toggle("mouth-ready", overMouth);
  elements.petArea.classList.toggle("body-ready", overBody || overShell);
}

function cleanTouchedDirt() {
  if (careInteraction.kind !== "clean") {
    return;
  }

  const requiredDirt = careInteraction.targetDirtCount || getDirtSpotCount();

  elements.dirtSpots.forEach((spot) => {
    if (spot.classList.contains("hidden") || spot.classList.contains("cleaned") || !getOverlap(elements.spongeTool, spot)) {
      return;
    }

    spot.classList.add("cleaned");
    window.setTimeout(() => spot.classList.add("hidden"), 150);
    careInteraction.cleaned += 1;

    const dirtLeft = Math.max(0, requiredDirt - careInteraction.cleaned);
    setCareMessage(dirtLeft <= 0 ? "all clean. finishing wash..." : `keep rubbing the sponge on the creature. ${dirtLeft} dirt spots left.`);

    if (careInteraction.cleaned >= requiredDirt) {
      window.setTimeout(completeCleanInteraction, 260);
    }
  });
}

function completeFeedInteraction() {
  if (!careInteraction.active || careInteraction.kind !== "feed") {
    return;
  }

  const item = ITEMS[careInteraction.itemId];

  closeCareScene();
  useFood(item);
}

function completeCleanInteraction() {
  if (!careInteraction.active || careInteraction.kind !== "clean") {
    return;
  }

  const itemId = careInteraction.itemId;
  const item = ITEMS[itemId];

  closeCareScene();

  if (item && state.inventory[itemId] > 0) {
    consumeItem(itemId);
    addEffect(item.effect);
    state.affection = clamp(state.affection + 3);
    state.lastMessage = `${state.name} was scrubbed clean with ${item.label}.`;
    speakFromDialogue("clean");
    finishAction();
    return;
  }

  state.cleanliness = clamp(state.cleanliness + CLEAN_BASIC_GAIN);
  state.energy = clamp(state.energy - 3);
  state.fun = clamp(state.fun - 1);
  state.affection = clamp(state.affection + 1);
  state.lastMessage = `${state.name} had a hands-on sponge wash.`;
  speakFromDialogue("clean");
  finishAction();
}

function completeMedicineInteraction() {
  if (!careInteraction.active || careInteraction.kind !== "medicine") {
    return;
  }

  const item = ITEMS[careInteraction.itemId];

  closeCareScene();
  useMedicine(item);
}

function startInjectionAnimation() {
  if (careInteraction.injecting) {
    return;
  }

  careInteraction.injecting = true;
  setCareMessage("medicine applied. hold still...");
  elements.syringeTool.classList.add("dragging");
  window.setTimeout(completeMedicineInteraction, 650);
}

function handleCarePointerDown(event) {
  if (!careInteraction.active || careInteraction.injecting) {
    return;
  }

  const tool = event.currentTarget;

  if (tool.classList.contains("hidden")) {
    return;
  }

  event.preventDefault();
  careInteraction.pointerId = event.pointerId;
  careInteraction.tool = tool;
  tool.classList.add("dragging");
  tool.setPointerCapture(event.pointerId);
  moveCareTool(tool, event);
  updateCareTargetHighlights();
  cleanTouchedDirt();
}

function handleCarePointerMove(event) {
  if (!careInteraction.active || careInteraction.pointerId !== event.pointerId || !careInteraction.tool || careInteraction.injecting) {
    return;
  }

  event.preventDefault();
  moveCareTool(careInteraction.tool, event);
  updateCareTargetHighlights();
  cleanTouchedDirt();
}

function handleCarePointerUp(event) {
  if (!careInteraction.active || careInteraction.pointerId !== event.pointerId || !careInteraction.tool || careInteraction.injecting) {
    return;
  }

  event.preventDefault();
  const tool = careInteraction.tool;
  tool.classList.remove("dragging");

  if (careInteraction.kind === "feed") {
    if (getOverlap(elements.foodTool, getFeedTarget())) {
      setCareMessage(`${state.name} is eating...`);
      window.setTimeout(completeFeedInteraction, 300);
    } else {
      setCareMessage(`missed. put the food on ${state.name}'s ${getFeedTargetName()} and release it there.`);
    }
  }

  if (careInteraction.kind === "medicine") {
    if (getOverlap(elements.syringeTool, elements.petBody)) {
      startInjectionAnimation();
    } else {
      setCareMessage(`missed. put the syringe on ${state.name}'s body and release it there.`);
    }
  }

  careInteraction.pointerId = null;
  careInteraction.tool = null;
  updateCareTargetHighlights();
}

function finishAction(deathReason = "poor care") {
  state.careScore += 1;
  state.lastUpdated = Date.now();
  checkDeath(deathReason);
  saveState();
  render();
}

function care(action) {
  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active) {
    return;
  }

  if (blockPlayerNameCare()) {
    return;
  }

  if (blockAwayPetCare()) {
    return;
  }

  if (blockHatchNamingCare()) {
    return;
  }

  if (isSleeping() && action !== "nap") {
    state.lastMessage = `${state.name} is asleep. wake them early only if you really need to.`;
    render();
    return;
  }

  if (blockEggCare()) {
    return;
  }

  const actions = {
    feed: () => {
      const foodId = QUICK_FOOD_ORDER.find((itemId) => state.inventory[itemId] > 0);

      if (!foodId) {
        state.lastMessage = "no food left. buy food from the shop.";
        render();
        return;
      }

      startFeedInteraction(foodId);
    },
    play: () => {
      if (state.energy < 12 || state.food < 10) {
        state.health = clamp(state.health - 3);
        state.affection = clamp(state.affection - 1);
        state.lastMessage = `${state.name} tried to play, but was too tired or hungry.`;
        finishAction("exhaustion");
        return;
      }

      const hasToy = state.inventory.toy_ball > 0;
      const coinReward = hasToy ? 2 : 1;

      state.fun = clamp(state.fun + (hasToy ? 28 : 18));
      state.energy = clamp(state.energy - PLAY_ENERGY_COST);
      state.food = clamp(state.food - PLAY_HUNGER_COST);
      state.cleanliness = clamp(state.cleanliness - PLAY_MESS);
      state.affection = clamp(state.affection + 5);
      state.coins += coinReward;
      state.lastMessage = hasToy ? `${state.name} played with the toy_ball and earned ${coinReward} coins.` : `${state.name} played and earned ${coinReward} coin.`;
      speakFromDialogue("play", true);
      finishAction();
    },
    clean: () => {
      const careItemId = state.inventory.bubble_soap > 0 ? "bubble_soap" : "";
      startCleanInteraction(careItemId);
    },
    nap: () => {
      if (isSleeping()) {
        wakeEarly();
        return;
      }

      startTimedSleep();
    },
    medicine: () => {
      const medicineId = QUICK_MEDICINE_ORDER.find((itemId) => state.inventory[itemId] > 0);

      if (!medicineId) {
        state.lastMessage = "no medicine left. buy medicine from the shop.";
        render();
        return;
      }

      startMedicineInteraction(medicineId);
    },
    class: () => {
      const classId = ["puzzle_class", "dance_class"].find((itemId) => state.inventory[itemId] > 0);

      if (!classId) {
        state.lastMessage = "no class passes left. buy a class from the shop.";
        render();
        return;
      }

      useClass(ITEMS[classId]);
    }
  };

  actions[action]?.();
}

function getRpsPetChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getRpsOutcome(playerChoice, petChoice) {
  if (playerChoice === petChoice) {
    return "draw";
  }

  if (
    (playerChoice === "rock" && petChoice === "scissors") ||
    (playerChoice === "paper" && petChoice === "rock") ||
    (playerChoice === "scissors" && petChoice === "paper")
  ) {
    return "win";
  }

  return "loss";
}

function startRpsGame() {
  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active) {
    return;
  }

  if (blockPlayerNameCare()) {
    return;
  }

  if (blockAwayPetCare()) {
    return;
  }

  if (blockHatchNamingCare()) {
    return;
  }

  if (isSleeping()) {
    state.lastMessage = `${state.name} is asleep. press wake_up first if you want to disturb them.`;
    render();
    return;
  }

  if (blockEggCare()) {
    return;
  }

  if (state.energy < 8 || state.food < 8) {
    state.lastMessage = `${state.name} is too tired or hungry for rock_paper_scissors.`;
    saveState();
    render();
    return;
  }

  rpsGame = {
    active: true,
    streak: 0,
    totalCoins: 0,
    round: 1
  };

  state.lastMessage = `rock_paper_scissors started. win streaks pay more coins. choose until you lose.`;
  elements.rpsStatus.textContent = "choose_rock_paper_or_scissors";
  saveState();
  render();
}

function endRpsGame(finalMessage) {
  rpsGame.active = false;
  state.energy = clamp(state.energy - PLAY_ENERGY_COST);
  state.food = clamp(state.food - PLAY_HUNGER_COST);
  state.cleanliness = clamp(state.cleanliness - Math.ceil(PLAY_MESS / 2));
  state.fun = clamp(state.fun + Math.min(24, rpsGame.totalCoins + 4));
  state.affection = clamp(state.affection + Math.min(8, rpsGame.streak));
  state.lastUpdated = Date.now();
  state.lastMessage = finalMessage;
  appendDialogueToMessage("play", true);
  checkDeath("exhaustion");
  saveState();
  render();
}

function playRpsRound(playerChoice) {
  if (!rpsGame.active) {
    return;
  }

  const petChoice = getRpsPetChoice();
  const outcome = getRpsOutcome(playerChoice, petChoice);
  rpsGame.round += 1;

  if (outcome === "draw") {
    state.lastMessage = `draw. you chose ${playerChoice}; ${state.name} chose ${petChoice}. choose again. streak_${rpsGame.streak}.`;
    elements.rpsStatus.textContent = `draw_${playerChoice}_vs_${petChoice}`;
    saveState();
    render();
    return;
  }

  if (outcome === "win") {
    rpsGame.streak += 1;
    const reward = Math.min(20, rpsGame.streak);
    rpsGame.totalCoins += reward;
    state.coins += reward;
    state.lastMessage = `you win round ${rpsGame.streak}. ${playerChoice} beats ${petChoice}. earned_${reward} coins. keep choosing until you lose.`;
    elements.rpsStatus.textContent = `win_streak_${rpsGame.streak}_reward_${reward}`;
    appendDialogueToMessage("play", true);
    saveState();
    render();
    return;
  }

  const totalCoins = rpsGame.totalCoins;
  const finalStreak = rpsGame.streak;
  const finalMessage = `you lost. ${state.name}'s ${petChoice} beat your ${playerChoice}. final_streak_${finalStreak}. total_rps_coins_${totalCoins}.`;
  endRpsGame(finalMessage);
}

function startMiniGame() {
  if (state.dead || miniGame.active || rpsGame.active || careInteraction.active) {
    return;
  }

  if (blockPlayerNameCare()) {
    return;
  }

  if (blockAwayPetCare()) {
    return;
  }

  if (blockHatchNamingCare()) {
    return;
  }

  if (isSleeping()) {
    state.lastMessage = `${state.name} is asleep. press wake_up first if you want to disturb them.`;
    render();
    return;
  }

  if (blockEggCare()) {
    return;
  }

  if (state.energy < 12 || state.food < 12) {
    state.lastMessage = `${state.name} is too tired or hungry to chase stars.`;
    saveState();
    render();
    return;
  }

  miniGame.active = true;
  miniGame.hits = 0;
  miniGame.endsAt = Date.now() + 9000;
  state.lastMessage = "catch as many stars as you can.";
  moveStar();
  elements.starTarget.classList.remove("hidden");
  render();

  miniGame.timer = window.setInterval(() => {
    if (Date.now() >= miniGame.endsAt) {
      finishMiniGame();
      return;
    }

    moveStar();
  }, 900);
}

function moveStar() {
  const area = elements.petArea.getBoundingClientRect();
  const starSize = 50;
  const x = Math.max(8, Math.random() * (area.width - starSize - 16));
  const y = Math.max(8, Math.random() * (area.height - starSize - 16));

  elements.starTarget.style.left = `${x}px`;
  elements.starTarget.style.top = `${y}px`;
}

function hitStar() {
  if (!miniGame.active) {
    return;
  }

  miniGame.hits += 1;
  elements.starTarget.textContent = miniGame.hits % 2 === 0 ? "✦" : "★";
  moveStar();
}

function finishMiniGame() {
  window.clearInterval(miniGame.timer);
  miniGame.timer = null;
  miniGame.active = false;
  elements.starTarget.classList.add("hidden");

  const reward = Math.max(1, miniGame.hits);
  state.coins += reward;
  state.fun = clamp(state.fun + reward * 5);
  state.affection = clamp(state.affection + Math.min(8, reward));
  state.energy = clamp(state.energy - PLAY_ENERGY_COST);
  state.food = clamp(state.food - PLAY_HUNGER_COST);
  state.cleanliness = clamp(state.cleanliness - PLAY_MESS);
  state.lastUpdated = Date.now();
  state.lastMessage = `${state.name} caught ${miniGame.hits} stars and earned ${reward} coins.`;
  speakFromDialogue("play", true);

  checkDeath("exhaustion");
  saveState();
  render();
}

function setManagementTab(tabName) {
  elements.tabButtons.forEach((button) => {
    const active = button.dataset.tabTarget === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  elements.tabPanels.forEach((panel) => {
    const active = panel.dataset.tabPanel === tabName;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

function resetPet() {
  const confirmed = window.confirm("reset your pet and start again?");

  if (!confirmed) {
    return;
  }

  state = defaultState();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  render();
}

document.addEventListener("click", (event) => {
  const blockedControl = event.target.closest("[data-action], #mini-game-button, #rps-game-button, [data-inventory-item], [data-equipment-buy], [data-shop-item], #nfc-write-button, #nfc-read-button, #nfc-chrome-button, #nfc-send-pet-button, #nfc-bring-pet-button, #nfc-send-visitor-button");

  if (!blockedControl || !needsPlayerName()) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  state.lastMessage = "enter your name first.";
  saveState();
  render();
}, true);

document.addEventListener("click", (event) => {
  const careButton = event.target.closest("[data-action], #mini-game-button, #rps-game-button, [data-inventory-item]");

  if (!careButton || !isSleeping()) {
    return;
  }

  const action = careButton.dataset.action || "";

  if (action === "nap") {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  state.lastMessage = `${state.name} is asleep. wake them early only if you really need to.`;
  saveState();
  render();
}, true);

document.addEventListener("click", (event) => {
  const careButton = event.target.closest("[data-action], #mini-game-button, #rps-game-button, [data-inventory-item]");

  if (!careButton || !isEggStage()) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  state.lastMessage = getEggWaitMessage();
  saveState();
  render();
}, true);

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => care(button.dataset.action));
});

elements.inventoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inventory-item]");

  if (!button) {
    return;
  }

  useItem(button.dataset.inventoryItem);
});

elements.equipmentGrid.addEventListener("click", (event) => {
  const buyButton = event.target.closest("[data-equipment-buy]");

  if (buyButton) {
    buyItem(buyButton.dataset.equipmentBuy);
    return;
  }

  const button = event.target.closest("[data-inventory-item]");

  if (!button) {
    return;
  }

  useItem(button.dataset.inventoryItem);
});

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setManagementTab(button.dataset.tabTarget));
});

elements.nfcWriteButton.addEventListener("click", writePetSummaryToNfc);
elements.nfcReadButton.addEventListener("click", readPetSummaryFromNfc);
elements.nfcChromeButton.addEventListener("click", openCurrentPetInAndroidChrome);
elements.nfcSendPetButton.addEventListener("click", sendCurrentPetToTag);
elements.nfcBringPetButton.addEventListener("click", bringPetFromTag);
elements.nfcSendVisitorButton.addEventListener("click", sendVisitorHomeToTag);

elements.shopGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-shop-item]");

  if (!button) {
    return;
  }

  buyItem(button.dataset.shopItem);
});

elements.accessoryResetButton.addEventListener("click", resetAccessoryPositions);

elements.wearables.forEach((wearable) => {
  wearable.addEventListener("pointerdown", startAccessoryDrag);
  wearable.addEventListener("pointermove", continueAccessoryDrag);
  wearable.addEventListener("pointerup", endAccessoryDrag);
  wearable.addEventListener("pointercancel", endAccessoryDrag);
});

elements.careCancel.addEventListener("click", cancelCareScene);
[elements.foodTool, elements.spongeTool, elements.syringeTool].forEach((tool) => {
  tool.addEventListener("pointerdown", handleCarePointerDown);
  tool.addEventListener("pointermove", handleCarePointerMove);
  tool.addEventListener("pointerup", handleCarePointerUp);
  tool.addEventListener("pointercancel", handleCarePointerUp);
});

elements.nameInput.addEventListener("change", () => {
  if (isEggStage()) {
    elements.nameInput.value = "egg";
    state.lastMessage = "wait until the egg hatches before naming it.";
    render();
    return;
  }

  if (needsHatchName()) {
    state.lastMessage = "use the hatch naming box first.";
    render();
    return;
  }

  const cleanName = sanitizePetName(elements.nameInput.value);

  state.name = cleanName || state.name || "sprout";
  state.lastMessage = `your pet is now called ${state.name}.`;
  saveState();
  render();
});

elements.playerNameButton.addEventListener("click", completePlayerNaming);
elements.playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    completePlayerNaming();
  }
});

elements.hatchNameButton.addEventListener("click", completeHatchNaming);
elements.hatchNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    completeHatchNaming();
  }
});

elements.resetButton.addEventListener("click", resetPet);
elements.miniGameButton.addEventListener("click", startMiniGame);
elements.rpsGameButton.addEventListener("click", startRpsGame);
elements.rpsPanel.addEventListener("click", (event) => {
  const button = event.target.closest("[data-rps-choice]");

  if (!button) {
    return;
  }

  playRpsRound(button.dataset.rpsChoice);
});
elements.starTarget.addEventListener("click", hitStar);

window.addEventListener("beforeunload", () => {
  state.lastUpdated = Date.now();
  saveState();
});

loadDialogueDatabase();
applyDecay();
saveState();
render();

window.setInterval(() => {
  applyDecay();
  saveState();
  render();
}, 30000);

window.setInterval(() => {
  renderRealTimePanel();
}, 1000);

window.setInterval(() => {
  speakFromDialogue("idle", false, true, true);
}, 60000);
