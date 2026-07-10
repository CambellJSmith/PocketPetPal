"use strict";

const SAVE_KEY = "pocket_sprout_save_v2";

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
  foodValue: document.querySelector("#food-value"),
  funValue: document.querySelector("#fun-value"),
  energyValue: document.querySelector("#energy-value"),
  cleanlinessValue: document.querySelector("#cleanliness-value"),
  healthValue: document.querySelector("#health-value"),
  foodBar: document.querySelector("#food-bar"),
  funBar: document.querySelector("#fun-bar"),
  energyBar: document.querySelector("#energy-bar"),
  cleanlinessBar: document.querySelector("#cleanliness-bar"),
  healthBar: document.querySelector("#health-bar")
};

const defaultState = () => {
  const now = Date.now();
  const species = getRandomSpeciesId();

  return {
    version: 2,
    name: "sprout",
    birthday: now,
    lastUpdated: now,
    speciesId: species,
    food: 74,
    fun: 70,
    energy: 72,
    cleanliness: 78,
    health: 92,
    coins: 12,
    careScore: 0,
    sickness: false,
    hibernating: false,
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
    const oldSave = localStorage.getItem("pocket_sprout_save_v1");

    if (rawSave) {
      return normalizeState(JSON.parse(rawSave));
    }

    if (oldSave) {
      return normalizeState(JSON.parse(oldSave));
    }

    return defaultState();
  } catch {
    return defaultState();
  }
}

function normalizeState(save) {
  const base = defaultState();
  const validSpecies = SPECIES.some((species) => species.id === save.speciesId);

  return {
    ...base,
    ...save,
    version: 2,
    name: typeof save.name === "string" && save.name.trim() ? save.name.slice(0, 14) : base.name,
    birthday: Number.isFinite(save.birthday) ? save.birthday : base.birthday,
    lastUpdated: Number.isFinite(save.lastUpdated) ? save.lastUpdated : base.lastUpdated,
    speciesId: validSpecies ? save.speciesId : base.speciesId,
    food: clamp(Number(save.food) || base.food),
    fun: clamp(Number(save.fun) || base.fun),
    energy: clamp(Number(save.energy) || base.energy),
    cleanliness: clamp(Number(save.cleanliness) || base.cleanliness),
    health: clamp(Number(save.health) || base.health),
    coins: Math.max(0, Math.floor(Number(save.coins) || base.coins)),
    careScore: Math.max(0, Math.floor(Number(save.careScore) || base.careScore)),
    sickness: Boolean(save.sickness),
    hibernating: Boolean(save.hibernating),
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
  const elapsedMinutes = Math.min((now - state.lastUpdated) / 60000, 720);

  if (elapsedMinutes <= 0) {
    return;
  }

  state.food = clamp(state.food - elapsedMinutes * 0.13);
  state.fun = clamp(state.fun - elapsedMinutes * 0.1);
  state.energy = clamp(state.energy - elapsedMinutes * 0.08);
  state.cleanliness = clamp(state.cleanliness - elapsedMinutes * 0.12);

  const criticalNeeds = [state.food, state.fun, state.energy, state.cleanliness].filter((need) => need < 20).length;

  if (criticalNeeds > 0) {
    state.health = clamp(state.health - elapsedMinutes * criticalNeeds * 0.06);
  } else if (!state.sickness && state.health < 100) {
    state.health = clamp(state.health + elapsedMinutes * 0.03);
  }

  if (!state.sickness && (state.food < 15 || state.cleanliness < 15) && Math.random() < elapsedMinutes / 900) {
    state.sickness = true;
    state.lastMessage = `${state.name} feels poorly. medicine will help.`;
  }

  if (state.health <= 0) {
    state.hibernating = true;
    state.lastMessage = `${state.name} has gone into hibernation. reset to start again.`;
  }

  state.lastUpdated = now;
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
  if (state.hibernating) {
    return "hibernating";
  }

  if (state.sickness || state.health < 35) {
    return "sick";
  }

  if (state.food < 30 || state.fun < 30 || state.energy < 25 || state.cleanliness < 30) {
    return "sad";
  }

  if (state.food > 70 && state.fun > 70 && state.energy > 60 && state.cleanliness > 70) {
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

function render() {
  const stage = getStage();
  const mood = getMood();
  const species = getSpecies(state.speciesId);

  applySpeciesStyles(species);

  elements.nameInput.value = state.name;
  elements.stageLabel.textContent = stage;
  elements.ageLabel.textContent = getAgeLabel();
  elements.coinLabel.textContent = state.coins;
  elements.moodLabel.textContent = mood;
  elements.speciesLabel.textContent = species.label;
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
    `face-${species.face}`
  ].join(" ");

  document.querySelectorAll("[data-action], #mini-game-button, #species-button").forEach((button) => {
    button.disabled = state.hibernating || miniGame.active;
  });

  elements.resetButton.disabled = miniGame.active;
}

function care(action) {
  if (state.hibernating || miniGame.active) {
    return;
  }

  const actions = {
    feed: () => {
      state.food = clamp(state.food + 24);
      state.energy = clamp(state.energy - 4);
      state.cleanliness = clamp(state.cleanliness - 3);
      state.lastMessage = `${state.name} munches happily.`;
    },
    play: () => {
      state.fun = clamp(state.fun + 25);
      state.energy = clamp(state.energy - 12);
      state.food = clamp(state.food - 7);
      state.cleanliness = clamp(state.cleanliness - 4);
      state.coins += 1;
      state.lastMessage = `${state.name} bounces around the screen.`;
    },
    clean: () => {
      state.cleanliness = clamp(state.cleanliness + 30);
      state.fun = clamp(state.fun - 2);
      state.lastMessage = `${state.name} is squeaky clean.`;
    },
    nap: () => {
      state.energy = clamp(state.energy + 30);
      state.food = clamp(state.food - 5);
      state.fun = clamp(state.fun - 3);
      state.lastMessage = `${state.name} takes a tiny nap.`;
    },
    medicine: () => {
      const cost = state.sickness ? 6 : 3;

      if (state.coins < cost) {
        state.lastMessage = "not enough coins for medicine.";
        return;
      }

      state.coins -= cost;
      state.health = clamp(state.health + (state.sickness ? 28 : 8));
      state.sickness = false;
      state.lastMessage = `${state.name} feels steadier.`;
    }
  };

  actions[action]?.();
  state.careScore += 1;
  state.lastUpdated = Date.now();
  saveState();
  render();
}

function discoverSpecies() {
  if (state.hibernating || miniGame.active) {
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
  if (state.hibernating || miniGame.active) {
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
  state.energy = clamp(state.energy - 10);
  state.food = clamp(state.food - 6);
  state.cleanliness = clamp(state.cleanliness - 3);
  state.lastUpdated = Date.now();
  state.lastMessage = `${state.name} caught ${miniGame.hits} stars and earned ${reward} coins.`;

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
