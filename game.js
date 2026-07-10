"use strict";

const SAVE_KEY = "pocket_sprout_save_v1";

const elements = {
  saveStatus: document.querySelector("#save-status"),
  resetButton: document.querySelector("#reset-button"),
  nameInput: document.querySelector("#name-input"),
  pet: document.querySelector("#pet"),
  petArea: document.querySelector("#pet-area"),
  starTarget: document.querySelector("#star-target"),
  miniGameButton: document.querySelector("#mini-game-button"),
  stageLabel: document.querySelector("#stage-label"),
  petMessage: document.querySelector("#pet-message"),
  ageLabel: document.querySelector("#age-label"),
  coinLabel: document.querySelector("#coin-label"),
  moodLabel: document.querySelector("#mood-label"),
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

  return {
    version: 1,
    name: "sprout",
    birthday: now,
    lastUpdated: now,
    food: 74,
    fun: 70,
    energy: 72,
    cleanliness: 78,
    health: 92,
    coins: 12,
    careScore: 0,
    sickness: false,
    hibernating: false,
    lastMessage: "a tiny egg is waiting for you."
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

function loadState() {
  try {
    const rawSave = localStorage.getItem(SAVE_KEY);

    if (!rawSave) {
      return defaultState();
    }

    return normalizeState(JSON.parse(rawSave));
  } catch {
    return defaultState();
  }
}

function normalizeState(save) {
  const base = defaultState();

  return {
    ...base,
    ...save,
    name: typeof save.name === "string" && save.name.trim() ? save.name.slice(0, 14) : base.name,
    birthday: Number.isFinite(save.birthday) ? save.birthday : base.birthday,
    lastUpdated: Number.isFinite(save.lastUpdated) ? save.lastUpdated : base.lastUpdated,
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

function render() {
  const stage = getStage();
  const mood = getMood();

  elements.nameInput.value = state.name;
  elements.stageLabel.textContent = stage;
  elements.ageLabel.textContent = getAgeLabel();
  elements.coinLabel.textContent = state.coins;
  elements.moodLabel.textContent = mood;
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

  elements.pet.className = `pet stage-${stage} mood-${mood}`;
  document.querySelectorAll("[data-action], #mini-game-button").forEach((button) => {
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
      if (state.coins < 3) {
        state.lastMessage = "not enough coins for medicine.";
        return;
      }

      state.coins -= state.sickness ? 6 : 3;
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
