"use strict";

const SAVE_KEY = "pocket_sprout_save_v5";
const LEGACY_SAVE_KEYS = ["pocket_sprout_save_v4", "pocket_sprout_save_v3", "pocket_sprout_save_v2", "pocket_sprout_save_v1"];

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
  berry_bites: { id: "berry_bites", label: "berry_bites", kind: "food", price: 2, description: "small food. safe, cheap, and useful when hunger is low.", effect: { food: 18, fun: 2, cleanliness: -2 } },
  crisp_snack: { id: "crisp_snack", label: "crisp_snack", kind: "food", price: 3, description: "a crunchy treat that helps food and fun, but should not replace proper meals.", effect: { food: 16, fun: 8, cleanliness: -1 } },
  warm_meal: { id: "warm_meal", label: "warm_meal", kind: "food", price: 5, description: "a filling meal. best for serious hunger, but it makes a little mess.", effect: { food: 35, energy: 4, cleanliness: -5 } },
  vitamin_drop: { id: "vitamin_drop", label: "vitamin_drop", kind: "medicine", price: 4, description: "minor health boost. has a chance to clear sickness.", effect: { health: 12 }, cureChance: 0.45 },
  health_tonic: { id: "health_tonic", label: "health_tonic", kind: "medicine", price: 8, description: "strong medicine. cures sickness and restores health.", effect: { health: 32 }, cures: true },
  bubble_soap: { id: "bubble_soap", label: "bubble_soap", kind: "care", price: 3, description: "cleans better than a normal wash and slightly improves health.", effect: { cleanliness: 34, health: 3, fun: -1 } },
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
  "toy_ball", "puzzle_class", "dance_class",
  "tiny_hat", "wizard_hat", "round_glasses", "star_glasses", "ribbon_bow", "flower_bow"
];

const QUICK_FOOD_ORDER = ["warm_meal", "crisp_snack", "berry_bites"];
const QUICK_MEDICINE_ORDER = ["health_tonic", "vitamin_drop"];

const elements = {
  saveStatus: document.querySelector("#save-status"),
  resetButton: document.querySelector("#reset-button"),
  nameInput: document.querySelector("#name-input"),
  pet: document.querySelector("#pet"),
  petArea: document.querySelector("#pet-area"),
  starTarget: document.querySelector("#star-target"),
  speciesButton: document.querySelector("#species-button"),
  miniGameButton: document.querySelector("#mini-game-button"),
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
  inventoryGrid: document.querySelector("#inventory-grid"),
  shopGrid: document.querySelector("#shop-grid"),
  inventorySummary: document.querySelector("#inventory-summary"),
  screen: document.querySelector(".screen"),
  careCancel: document.querySelector("#care-cancel"),
  petBody: document.querySelector("#pet-body"),
  petMouth: document.querySelector("#pet-mouth"),
  foodTool: document.querySelector("#food-tool"),
  spongeTool: document.querySelector("#sponge-tool"),
  syringeTool: document.querySelector("#syringe-tool"),
  dirtSpots: [...document.querySelectorAll("[data-dirt-spot]")]
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
    version: 5,
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
    sickness: false,
    dead: false,
    deathReason: "",
    inventory: defaultInventory(),
    equipment: defaultEquipment(),
    lastMessage: `a tiny ${getSpecies(species).label} egg is waiting for you.`
  };
};

let state = loadState();
let miniGame = {
  active: false,
  timer: null,
  endsAt: 0,
  hits: 0
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

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function getRandomSpeciesId(excludedId = "") {
  const choices = SPECIES.filter((species) => species.id !== excludedId);
  const picked = choices[Math.floor(Math.random() * choices.length)];

  return picked.id;
}

function getSpecies(speciesId) {
  return SPECIES.find((species) => species.id === speciesId) || SPECIES[0];
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
    version: 5,
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
    sickness: Boolean(save.sickness),
    dead: Boolean(save.dead || save.hibernating || Number(save.health) <= 0),
    deathReason: typeof save.deathReason === "string" ? save.deathReason : "",
    inventory,
    equipment,
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

function applyDecay() {
  const now = Date.now();
  const elapsedMinutes = Math.min((now - state.lastUpdated) / 60000, 4320);

  if (elapsedMinutes <= 0 || state.dead) {
    state.lastUpdated = now;
    return;
  }

  state.food = clamp(state.food - elapsedMinutes * 0.13);
  state.fun = clamp(state.fun - elapsedMinutes * 0.1);
  state.energy = clamp(state.energy - elapsedMinutes * 0.08);
  state.cleanliness = clamp(state.cleanliness - elapsedMinutes * 0.12);
  state.affection = clamp(state.affection - elapsedMinutes * 0.025);

  const criticalNeeds = [state.food, state.fun, state.energy, state.cleanliness].filter((need) => need < 20).length;
  const emptyNeeds = [state.food, state.fun, state.energy, state.cleanliness].filter((need) => need <= 0).length;

  if (criticalNeeds > 0) {
    state.health = clamp(state.health - elapsedMinutes * criticalNeeds * 0.015);
  } else if (!state.sickness && state.health < 100) {
    state.health = clamp(state.health + elapsedMinutes * 0.025);
  }

  if (!state.sickness && (state.food < 15 || state.cleanliness < 15) && Math.random() < elapsedMinutes / 750) {
    state.sickness = true;
    state.lastMessage = `${state.name} became sick from neglect. use medicine soon.`;
  }

  if (state.sickness) {
    state.health = clamp(state.health - elapsedMinutes * 0.018);
  }

  if (emptyNeeds >= 2 && elapsedMinutes > 720) {
    state.health = clamp(state.health - elapsedMinutes * 0.012);
  }

  state.lastUpdated = now;
  checkDeath("neglect");
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

  if (age < 20) {
    return "baby";
  }

  if (age < 90) {
    return "teen";
  }

  return "adult";
}

function getMood() {
  if (state.dead) {
    return "dead";
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

  const hours = Math.floor(age / 60);
  const minutes = age % 60;

  return `${hours}h_${minutes}m`;
}

function setBar(bar, value) {
  const rounded = Math.round(value);

  bar.style.width = `${rounded}%`;
  bar.classList.toggle("low", rounded < 30);
  bar.classList.toggle("mid", rounded >= 30 && rounded < 65);
}

function applySpeciesStyles(species) {
  elements.pet.style.setProperty("--pet", species.pet);
  elements.pet.style.setProperty("--pet-light", species.light);
  elements.pet.style.setProperty("--pet-dark", species.dark);
  elements.pet.style.setProperty("--pet-accent", species.accent);
  elements.pet.style.setProperty("--pet-extra", species.extraColor);
}

function getEquipmentClasses() {
  return Object.values(state.equipment)
    .filter(Boolean)
    .map((itemId) => `gear-${itemId}`);
}

function render() {
  const stage = getStage();
  const mood = getMood();
  const species = getSpecies(state.speciesId);

  applySpeciesStyles(species);

  elements.nameInput.value = state.name;
  elements.stageLabel.textContent = state.dead ? "dead" : stage;
  elements.ageLabel.textContent = getAgeLabel();
  elements.coinLabel.textContent = state.coins;
  elements.moodLabel.textContent = mood;
  elements.speciesLabel.textContent = species.label;
  elements.affectionLabel.textContent = Math.round(state.affection);
  elements.disciplineLabel.textContent = Math.round(state.discipline);
  elements.petMessage.textContent = state.lastMessage;

  elements.foodValue.textContent = Math.round(state.food);
  elements.funValue.textContent = Math.round(state.fun);
  elements.energyValue.textContent = Math.round(state.energy);
  elements.cleanlinessValue.textContent = Math.round(state.cleanliness);
  elements.healthValue.textContent = Math.round(state.health);

  setBar(elements.foodBar, state.food);
  setBar(elements.funBar, state.fun);
  setBar(elements.energyBar, state.energy);
  setBar(elements.cleanlinessBar, state.cleanliness);
  setBar(elements.healthBar, state.health);

  elements.pet.className = [
    "pet",
    `stage-${stage}`,
    `mood-${mood}`,
    `body-${species.body}`,
    `ears-${species.ears}`,
    `tail-${species.tail}`,
    `wings-${species.wings}`,
    `extra-${species.extra}`,
    `face-${species.face}`,
    ...getEquipmentClasses()
  ].join(" ");

  elements.screen.classList.toggle("dead-screen", state.dead);

  document.querySelectorAll("[data-action], #mini-game-button, #species-button").forEach((button) => {
    button.disabled = state.dead || miniGame.active || careInteraction.active;
  });

  elements.resetButton.disabled = miniGame.active || careInteraction.active;
  renderInventory();
  renderShop();
}

function renderInventory() {
  const ownedItemIds = SHOP_ORDER.filter((itemId) => state.inventory[itemId] > 0);
  const totalItems = ownedItemIds.reduce((total, itemId) => total + state.inventory[itemId], 0);

  elements.inventorySummary.textContent = `${totalItems} items`;

  if (ownedItemIds.length === 0) {
    elements.inventoryGrid.innerHTML = `<div class="empty-state">inventory is empty. buy supplies from the shop.</div>`;
    return;
  }

  elements.inventoryGrid.innerHTML = ownedItemIds.map((itemId) => {
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
        <button class="${buttonClass}" type="button" data-inventory-item="${item.id}" ${state.dead || miniGame.active || careInteraction.active ? "disabled" : ""}>${action}</button>
      </article>`;
  }).join("");
}

function renderShop() {
  elements.shopGrid.innerHTML = SHOP_ORDER.map((itemId) => {
    const item = ITEMS[itemId];
    const owned = state.inventory[itemId] || 0;
    const alreadyOwned = item.permanent && owned > 0;
    const disabled = state.dead || miniGame.active || careInteraction.active || state.coins < item.price || alreadyOwned;
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
  if (state.dead || miniGame.active || careInteraction.active) {
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
  if (state.food > 92) {
    consumeItem(item.id);
    state.health = clamp(state.health - 4);
    state.fun = clamp(state.fun - 2);
    state.lastMessage = `${state.name} is too full. overfeeding hurts health.`;
    finishAction("overfeeding");
    return;
  }

  consumeItem(item.id);
  addEffect(item.effect);
  state.affection = clamp(state.affection + 2);
  state.lastMessage = `${state.name} ate ${item.label}.`;
  finishAction();
}

function useMedicine(item) {
  if (!state.sickness && state.health > 88) {
    state.lastMessage = `${state.name} does not need medicine right now.`;
    render();
    return;
  }

  consumeItem(item.id);
  addEffect(item.effect);

  if (item.cures || Math.random() < (item.cureChance || 0)) {
    state.sickness = false;
    state.lastMessage = `${state.name} took ${item.label} and recovered.`;
  } else {
    state.lastMessage = `${state.name} took ${item.label}, but still seems sick.`;
  }

  finishAction();
}

function useClass(item) {
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
  finishAction();
}

function toggleEquipment(item) {
  if (state.equipment[item.slot] === item.id) {
    state.equipment[item.slot] = "";
    state.lastMessage = `${state.name} took off ${item.label}.`;
  } else {
    state.equipment[item.slot] = item.id;
    state.affection = clamp(state.affection + 1);
    state.lastMessage = `${state.name} equipped ${item.label}.`;
  }

  saveState();
  render();
}

function buyItem(itemId) {
  if (state.dead || miniGame.active || careInteraction.active) {
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
  state.lastMessage = `bought ${item.label}.`;
  saveState();
  render();
}

function resetCareTool(tool) {
  tool.classList.remove("dragging");
  tool.style.left = "1rem";
  tool.style.top = "";
  tool.style.bottom = "0.9rem";
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
  if (state.dead || miniGame.active || careInteraction.active) {
    return false;
  }

  careInteraction = {
    active: true,
    kind,
    itemId,
    pointerId: null,
    tool: null,
    cleaned: 0,
    injecting: false
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
    injecting: false
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
  const item = ITEMS[itemId];

  if (!item || item.kind !== "food" || state.inventory[itemId] <= 0) {
    state.lastMessage = "no usable food selected.";
    render();
    return;
  }

  const feedInstruction = getStage() === "egg" ? `drag the food directly onto ${state.name}'s shell and release it there.` : `drag the food directly onto ${state.name}'s mouth and release it there.`;

  if (!openCareScene("feed", `feeding ${item.label}`, feedInstruction, itemId)) {
    return;
  }

  elements.foodTool.classList.remove("hidden");
}

function startCleanInteraction(itemId = "") {
  const usingSoap = itemId && ITEMS[itemId] && state.inventory[itemId] > 0;
  const title = usingSoap ? `washing with ${ITEMS[itemId].label}` : "basic sponge wash";
  const instruction = usingSoap ? `rub the sponge directly across ${state.name} until every dirt spot is gone. ${ITEMS[itemId].label} will be used when the wash is complete.` : `rub the sponge directly across ${state.name} until every dirt spot is gone. this basic wash is weaker than bubble_soap.`;

  if (!openCareScene("clean", title, instruction, usingSoap ? itemId : "")) {
    return;
  }

  elements.spongeTool.classList.remove("hidden");
  elements.dirtSpots.forEach((spot) => spot.classList.remove("hidden"));
}

function startMedicineInteraction(itemId) {
  const item = ITEMS[itemId];

  if (!item || item.kind !== "medicine" || state.inventory[itemId] <= 0) {
    state.lastMessage = "no usable medicine selected.";
    render();
    return;
  }

  if (!state.sickness && state.health > 88) {
    state.lastMessage = `${state.name} does not need medicine right now.`;
    render();
    return;
  }

  if (!openCareScene("medicine", `medicine: ${item.label}`, `drag the syringe directly onto ${state.name}'s body and release it there to apply the medicine.`, itemId)) {
    return;
  }

  elements.syringeTool.classList.remove("hidden");
}

function getFeedTarget() {
  return getStage() === "egg" ? elements.petBody : elements.petMouth;
}

function getFeedTargetName() {
  return getStage() === "egg" ? "shell" : "mouth";
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

  elements.dirtSpots.forEach((spot) => {
    if (spot.classList.contains("cleaned") || !getOverlap(elements.spongeTool, spot)) {
      return;
    }

    spot.classList.add("cleaned");
    window.setTimeout(() => spot.classList.add("hidden"), 150);
    careInteraction.cleaned += 1;
    const progress = Math.round((careInteraction.cleaned / elements.dirtSpots.length) * 100);
    setCareMessage(progress >= 100 ? "all clean. finishing wash..." : `keep rubbing the sponge on the creature. ${elements.dirtSpots.length - careInteraction.cleaned} dirt spots left.`);

    if (careInteraction.cleaned >= elements.dirtSpots.length) {
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
    finishAction();
    return;
  }

  state.cleanliness = clamp(state.cleanliness + 18);
  state.energy = clamp(state.energy - 3);
  state.fun = clamp(state.fun - 1);
  state.affection = clamp(state.affection + 1);
  state.lastMessage = `${state.name} had a hands-on sponge wash.`;
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
  if (state.dead || miniGame.active || careInteraction.active) {
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
      state.energy = clamp(state.energy - 11);
      state.food = clamp(state.food - 6);
      state.cleanliness = clamp(state.cleanliness - 5);
      state.affection = clamp(state.affection + 5);
      state.coins += coinReward;
      state.lastMessage = hasToy ? `${state.name} played with the toy_ball and earned ${coinReward} coins.` : `${state.name} played and earned ${coinReward} coin.`;
      finishAction();
    },
    clean: () => {
      const careItemId = state.inventory.bubble_soap > 0 ? "bubble_soap" : "";
      startCleanInteraction(careItemId);
    },
    nap: () => {
      state.energy = clamp(state.energy + 28);
      state.food = clamp(state.food - 6);
      state.fun = clamp(state.fun - 2);

      if (state.cleanliness < 20) {
        state.health = clamp(state.health - 2);
        state.lastMessage = `${state.name} slept, but being dirty made them feel worse.`;
      } else {
        state.health = clamp(state.health + 3);
        state.lastMessage = `${state.name} took a proper nap.`;
      }

      finishAction();
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

function discoverSpecies() {
  if (state.dead || miniGame.active || careInteraction.active) {
    return;
  }

  const cost = 5;

  if (state.coins < cost) {
    state.lastMessage = "discovering a new creature costs 5 coins.";
    saveState();
    render();
    return;
  }

  const oldSpecies = getSpecies(state.speciesId);
  const newSpeciesId = getRandomSpeciesId(state.speciesId);
  const newSpecies = getSpecies(newSpeciesId);

  state.coins -= cost;
  state.speciesId = newSpeciesId;
  state.fun = clamp(state.fun + 8);
  state.energy = clamp(state.energy - 4);
  state.lastMessage = `${oldSpecies.label} changed into ${newSpecies.label}.`;
  state.lastUpdated = Date.now();

  saveState();
  render();
}

function startMiniGame() {
  if (state.dead || miniGame.active || careInteraction.active) {
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
  state.energy = clamp(state.energy - 10);
  state.food = clamp(state.food - 6);
  state.cleanliness = clamp(state.cleanliness - 3);
  state.lastUpdated = Date.now();
  state.lastMessage = `${state.name} caught ${miniGame.hits} stars and earned ${reward} coins.`;

  checkDeath("exhaustion");
  saveState();
  render();
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

elements.shopGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-shop-item]");

  if (!button) {
    return;
  }

  buyItem(button.dataset.shopItem);
});

elements.careCancel.addEventListener("click", cancelCareScene);
[elements.foodTool, elements.spongeTool, elements.syringeTool].forEach((tool) => {
  tool.addEventListener("pointerdown", handleCarePointerDown);
  tool.addEventListener("pointermove", handleCarePointerMove);
  tool.addEventListener("pointerup", handleCarePointerUp);
  tool.addEventListener("pointercancel", handleCarePointerUp);
});

elements.nameInput.addEventListener("change", () => {
  const cleanName = elements.nameInput.value.trim().toLowerCase().replace(/\s+/g, "_");

  state.name = cleanName || "sprout";
  state.lastMessage = `your pet is now called ${state.name}.`;
  saveState();
  render();
});

elements.resetButton.addEventListener("click", resetPet);
elements.speciesButton.addEventListener("click", discoverSpecies);
elements.miniGameButton.addEventListener("click", startMiniGame);
elements.starTarget.addEventListener("click", hitStar);

window.addEventListener("beforeunload", () => {
  state.lastUpdated = Date.now();
  saveState();
});

applyDecay();
saveState();
render();

window.setInterval(() => {
  applyDecay();
  saveState();
  render();
}, 30000);
