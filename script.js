// ====== ЗВУК ======
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

let musicStarted = false;
document.addEventListener('click', () => {
  if (!musicStarted) {
    playSound('bgMusic');
    musicStarted = true;
  }
}, { once: true });

// ====== ИГРА ======
let inventory = [];
let score = 0;

const scenes = {
  scene1: {
    title: "Prologue: Whisper from Ravenhill",
    text: "You arrive at Ravenhill Estate. The house is dark; only one window is lit. You find Elizabeth Ravenhill's diary.",
    choices: {
      A: { label: "→ Read diary", next: "scene2A" },
      B: { label: "⇢ East Wing", next: "scene2B" },
      C: { label: "⇢ Radio", next: "scene2C" }
    }
  },
  scene2A: {
    title: "Elizabeth's Diary",
    evidence: "Elizabeth's diary",
    text: "Diary: 'I hear footsteps in East Wing but no one is there. I don't feel safe.'",
    choices: {
      A: { label: "→ Next page", next: "scene3A" },
      B: { label: "→ East Wing", next: "scene2B" },
      C: { label: "→ Radio", next: "scene2C" }
    }
  },
  scene2B: {
    title: "East Wing Footsteps",
    text: "You hear footsteps behind you—but corridor is empty.",
    choices: {
      A: { label: "→ 'Who's there?'", next: "scene3B_call" },
      B: { label: "→ Keep walking", next: "scene3B_keep" },
      C: { label: "← Hall", next: "scene1" }
    }
  },
  scene2C: {
    title: "Radio Warning",
    isRadioScene: true,
    evidence: "Radio warning",
    text: "Radio: '...don't... open... the... door...'",
    choices: {
      A: { label: "→ Obey", next: "scene3C_obey" },
      B: { label: "→ Open door", next: "scene3C_open" },
      C: { label: "→ Call Sir Henry", next: "scene_henry_intro" }
    }
  },
  scene3A: {
    title: "Torn Page",
    evidence: "Shadow warning",
    text: "Note: 'She saw the shadow. Don't let her go East Wing.'",
    choices: {
      A: { label: "→ East Wing anyway", next: "scene4A_danger" },
      B: { label: "→ Team", next: "scene4A_team" },
      C: { label: "← Hall", next: "scene1" }
    }
  },
  scene3B_call: {
    title: "Door Opens",
    text: "Door creaks open ahead. Cold wind from darkness.",
    choices: {
      A: { label: "→ Door", next: "scene4B_door" },
      B: { label: "← Hall", next: "scene1" },
      C: { label: "→ Team", next: "scene4B_team" }
    }
  },
  scene3B_keep: {
    title: "Footsteps Fade",
    text: "Footsteps fade. Maybe just old floor…",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },
  scene3C_obey: { title: "House Waits", text: "House silent, waiting.", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } },
  scene3C_open: { title: "Empty Room", text: "Room empty, but someone was here.", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } },
  scene_henry_intro: {
    title: "Sir Henry",
    evidence: "Official family story",
    media: { type: "image", src: "sir-henry.jpeg" },
    text: "Sir Henry: 'Elizabeth left on her own. No mystery.'",
    choices: {
      A: { label: "→ Recordings?", next: "scene_henry_recordings" },
      B: { label: "→ Why no report?", next: "scene_henry_missing" },
      C: { label: "← Hall", next: "scene1" }
    }
  },
  scene_henry_recordings: {
    title: "Recordings Destroyed",
    evidence: "Recordings destroyed",
    text: "Sir Henry: 'All recordings destroyed. Nothing important.'",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },
  scene_henry_missing: {
    title: "Not Missing",
    evidence: "No missing report",
    text: "Sir Henry: 'No reason to report her missing.'",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },
  scene4A_danger: { title: "East Wing Danger", evidence: "Ignored warning", text: "Air colder. Shadows move.", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } },
  scene4A_team: { title: "Team Discussion", evidence: "Team consensus", text: "'Someone protected Elizabeth'", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } },
  scene4B_door: { title: "Fresh Footprints", text: "Fresh footprints in dust.", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } },
  scene4B_team: { title: "Team Backup", text: "Footprints lead deeper.", choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } }
};

// ====== DOM ЭЛЕМЕНТЫ ======
const titleEl = document.getElementById("scene-title");
const textEl = document.getElementById("scene-text");
const btnA = document.getElementById("choiceA");
const btnB = document.getElementById("choiceB");
const btnC = document.getElementById("choiceC");
const clueMediaEl = document.getElementById("clue-media");
const inventoryListEl = document.getElementById("inventory-list");
const scoreDisplayEl = document.getElementById("score-display");

// ====== ИНВЕНТАРЬ ======
function addEvidence(id) {
  if (!inventory.includes(id)) {
    inventory.push(id);
    score += 1;
    renderInventory();
  }
}

function renderInventory() {
  if (inventoryListEl) {
    inventoryListEl.innerHTML = inventory.length ? 
      inventory.map(id => `<li>${id}</li>`).join('') : 
      '<li>No evidence yet</li>';
  }
  if (scoreDisplayEl) {
    scoreDisplayEl.textContent = `Score: ${score}`;
  }
}

// ====== ОТРИСОВКА ======
function renderScene(id) {
  playSound('stepSound');
  const scene = scenes[id];
  if (!scene) return;

  if (scene.isRadioScene) playSound('radioSound');

  titleEl.textContent = scene.title;
  textEl.textContent = scene.text;

  if (scene.evidence) addEvidence(scene.evidence);
  if (scene.media) {
    clueMediaEl.innerHTML = `<img src="${scene.media.src}" alt="Clue">`;
  }

  const choices = scene.choices;
  btnA.textContent = choices.A.label;
  btnB.textContent = choices.B.label;
  btnC.textContent = choices.C.label;

  btnA.onclick = () => { playSound('clickSound'); renderScene(choices.A.next); };
  btnB.onclick = () => { playSound('clickSound'); renderScene(choices.B.next); };
  btnC.onclick = () => { playSound('clickSound'); renderScene(choices.C.next); };
}

// ====== СТАРТ ======
renderInventory();
renderScene("scene1");

