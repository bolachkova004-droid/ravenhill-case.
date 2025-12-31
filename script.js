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
    chapter: "Episode I · The Summons",
    title: "Prologue: Whisper from Ravenhill",
    text: `You are part of a small detective team. Tonight, you arrive at an old Scottish manor house: Ravenhill Estate. The house is dark; only one window is still lit. Inside the hall, you find a dusty table and an old diary with the name Elizabeth Ravenhill on the cover.`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      manor house — загородный особняк<br>
      dusty — пыльный<br>
      to arrive — прибывать
      <br><br>
      <strong>Question:</strong><br>
      Why is only one window still lit?
    `,
    choices: {
      A: { label: "→ Stay in the hall and read the diary", next: "scene2A" },
      B: { label: "⇢ Go to the East Wing and follow the footsteps", next: "scene2B" },
      C: { label: "⇢ Find the old radio and listen to the house", next: "scene2C" }
    }
  },

  scene2A: {
    chapter: "Episode I · The Summons",
    title: "The Hallway Echoes",
    evidence: "Elizabeth's diary",
    media: { type: "video", src: "assets/diary-abandoned.mp4" },
    text: `You stay in the cold hall and open the diary. The first page is dated "October 12, 2004". The handwriting is quick and nervous.`,
    extra: `<em>Diary entry:</em><br>"The house feels different tonight. I keep hearing soft footsteps in the East Wing, but when I open the door, the corridor is empty..."`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      footsteps — шаги<br>
      to imagine — воображать<br>
      to feel safe — чувствовать себя в безопасности
    `,
    choices: {
      A: { label: "A. Read the next page", next: "scene3A" },
      B: { label: "B. East Wing", next: "scene2B" },
      C: { label: "C. Radio", next: "scene2C" }
    }
  },

  scene2B: {
    title: "East Wing Shadows",
    text: `Long narrow corridor. Floor creaks. Footsteps behind you—but no one there when you turn.`,
    extra: `<em>Шаги позади, коридор пуст.</em>`,
    choices: {
      A: { label: "A. 'Who's there?'", next: "scene3B_call" },
      B: { label: "B. Keep walking", next: "scene3B_keep" },
      C: { label: "C. ← Hall", next: "scene1" }
    }
  },

  scene2C: {
    title: "Whispers on the Radio",
    isRadioScene: true,
    evidence: "Radio warning",
    media: { type: "video", src: "assets/radio-scene.mp4" },
    text: `Old radio glows orange. "...don't... open... the... door..." Then silence.`,
    extra: `<em>Дом отвечает шепотом.</em>`,
    choices: {
      A: { label: "A. Obey voice", next: "scene3C_obey" },
      B: { label: "B. Open door", next: "scene3C_open" },
      C: { label: "C. Call Sir Henry", next: "scene_henry_intro" }
    }
  },

  scene3A: {
    title: "Page Torn Out",
    evidence: "Shadow warning",
    media: { type: "video", src: "assets/diary-page2.mp4" },
    text: `"She saw the shadow. Don't let her go to the East Wing." Different handwriting.`,
    choices: {
      A: { label: "→ East Wing anyway", next: "scene4A_danger" },
      B: { label: "→ Show team", next: "scene4A_team" },
      C: { label: "← Hall", next: "scene1" }
    }
  },

  scene3B_call: {
    title: "Door Creaks Open",
    media: { type: "video", src: "assets/corridor-shadow.mp4" },
    text: `"Who's there?" Door opens ahead. Cold wind from darkness.`,
    choices: {
      A: { label: "→ Open door", next: "scene4B_door" },
      B: { label: "← Hall", next: "scene1" },
      C: { label: "→ Team", next: "scene4B_team" }
    }
  },

  scene3B_keep: {
    title: "Footsteps Fade",
    text: "You pretend nothing happened. Footsteps slowly fade...",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene3C_obey: { 
    title: "House Waits", 
    backTo: "scene1",
    text: "You obey. House silent, waiting your next move.",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } 
  },

  scene3C_open: { 
    title: "Forbidden Door", 
    backTo: "scene1",
    text: "Cold air. Room empty, but someone was here moments ago.",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } } 
  },

  scene_henry_intro: {
    title: "Sir Henry on the Phone",
    evidence: "Official family story",
    media: { type: "image", src: "sir-henry.jpeg", alt: "Sir Henry" },
    video: { type: "video", src: "sir-henry-video.mp4" },
    sound: "sir-henry-voice",
    quote: "There is no mystery here. My daughter simply needed time away from the family.",
    text: `Sir Henry sounds calm, controlled. "Elizabeth left on her own and is safe."`,
    extra: `<em>Идеально выверенные фразы. Веришь ли ты?</em>`,
    choices: {
      A: { label: "→ Deleted recordings?", next: "scene_henry_recordings" },
      B: { label: "→ Why no missing report?", next: "scene_henry_missing" },
      C: { label: "← End call", next: "scene1" }
    }
  },

  scene_henry_recordings: {
    evidence: "Recordings destroyed",
    title: "Nothing to See",
    text: `"All recordings destroyed. Nothing important," says Sir Henry (pauses first).`,
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene_henry_missing: {
    evidence: "No missing report",
    title: "Not Missing",
    text: `"No reason to report her missing. She's an adult," says Sir Henry coldly.`,
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene4A_danger: {
    evidence: "Ignored warning", 
    title: "East Wing Danger",
    text: "Air grows colder. Something moves in shadows ahead.",
    extra: "<em>Дом знает, что вы здесь.</em>",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene4A_team: {
    evidence: "Team consensus",
    title: "Team Discussion", 
    text: "'This changes everything,' says Alex. 'Someone protected Elizabeth.'",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene4B_door: {
    title: "Fresh Footprints",
    media: { type: "video", src: "assets/dark-room.mp4" },
    text: "Dusty furniture, broken mirror... FRESH FOOTPRINTS in dust.",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  },

  scene4B_team: {
    title: "Team Backup",
    text: "Flashlights. Footprints lead deeper into house.",
    choices: { A: { label: "← Hall", next: "scene1" }, B: { label: "← Hall", next: "scene1" }, C: { label: "← Hall", next: "scene1" } }
  }
};

// ====== DOM ======
const titleEl = document.getElementById("scene-title");
const textEl = document.getElementById("scene-text");
const extraEl = document.getElementById("scene-extra");
const miniEl = document.getElementById("mini-english-content");
const btnA = document.getElementById("choiceA");
const btnB = document.getElementById("choiceB");
const btnC = document.getElementById("choiceC");
const backBtn = document.getElementById("backButton");
const clueMediaEl = document.getElementById("clue-media");
const inventoryListEl = document.getElementById("inventory-list");
const scoreDisplayEl = document.getElementById("score-display");
const endingDisplayEl = document.getElementById("ending-display");

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
      '<li>No evidence yet / Улик пока нет</li>';
  }
  if (scoreDisplayEl) scoreDisplayEl.textContent = `Evidence: ${score}`;
}

// ====== ОТРИСОВКА ======
function renderScene(id) {
  playSound('stepSound');
  const scene = scenes[id];
  if (!scene) return;

  if (scene.isRadioScene) playSound('radioSound');
  
  if (scene.backTo) {
    backBtn.style.display = "block";
    backBtn.onclick = () => { playSound('clickSound'); renderScene(scene.backTo); };
  } else {
    backBtn.style.display = "none";
  }

  titleEl.textContent = scene.title;
  textEl.textContent = scene.text;
  extraEl.innerHTML = scene.extra || "";
  miniEl.innerHTML = scene.miniEnglish || "";

  if (scene.evidence) addEvidence(scene.evidence);

  clueMediaEl.innerHTML = "";
  if (scene.media?.type === "image") {
    const img = document.createElement("img");
    img.src = scene.media.src;
    img.alt = scene.media.alt || "Clue";
    clueMediaEl.appendChild(img);
  } else if (scene.media?.type === "video") {
    const video = document.createElement("video");
    video.src = scene.media.src;
    video.autoplay = video.muted = video.loop = true;
    clueMediaEl.appendChild(video);
  }

  if (scene.video) {
    const video = document.createElement("video");
    video.src = scene.video.src;
    video.autoplay = video.muted = video.loop = true;
    video.style.maxWidth = "100%";
    video.style.borderRadius = "12px";
    clueMediaEl.appendChild(video);
  }

  if (scene.sound) playSound(scene.sound);

  if (scene.quote) {
    const quote = document.createElement("div");
    quote.style.cssText = `background: rgba(0,0,0,0.8); color: #f5f1e8; padding: 16px; border-radius: 12px; margin: 8px 0; font-style: italic;`;
    quote.textContent = `"${scene.quote}"`;
    clueMediaEl.appendChild(quote);
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

