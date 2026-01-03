/* ======================================================
   🔊 SOUND ENGINE
====================================================== */
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

let musicStarted = false;

/* ======================================================
   ⭐ START SCREEN
====================================================== */
window.addEventListener("load", () => {
  const startScreen = document.getElementById("start-screen");
  const gameContent = document.querySelector(".game-content");
  const startBtn = document.getElementById("start-game-btn");

  if (!startScreen || !startBtn || !gameContent) {
    console.warn("Start screen elements not found");
    renderScene("scene1");
    return;
  }

  startBtn.onclick = () => {
    console.log("START BUTTON CLICKED");
    startScreen.style.opacity = "0";
    startScreen.style.pointerEvents = "none";

    setTimeout(() => {
      startScreen.style.display = "none";
      gameContent.style.display = "block";
      gameContent.style.opacity = "0";

      setTimeout(() => {
        gameContent.style.opacity = "1";
        if (!musicStarted) {
          playSound("bgMusic");
          musicStarted = true;
        }
        renderScene("scene1");
      }, 50);
    }, 600);
  };
});

/* ======================================================
   🎮 GAME STATE
====================================================== */
let inventory = [];
let score = 0;
let history = []; // для возврата назад (back button)

/* ======================================================
   📘 ENGLISH TASK ENGINE (расширенный для B1-B2)
====================================================== */
const TaskEngine = {
  activeTask: null,

  render(task) {
    this.activeTask = task;
    let html = `<div class="task-box">
      <div class="task-header">English Practice · ${task.level} (+${task.points} pts)</div>
      <div class="task-text">${task.text}</div>`;

    if (task.type === "cloze") {
      html += task.gaps.map((gap, i) => 
        `<p>${gap.sentence.replace('___', `<input id="gap${i}" size="12">`)}</p>`
      ).join('');
    } else if (task.type === "multiple-choice") {
      html += task.questions.map((q, i) => `
        <p>${q.question}</p>
        ${q.options.map(opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`).join('')}
      `).join('');
    } else if (task.type === "word-formation") {
      html += task.words.map((w, i) => 
        `<p>${w.sentence.replace('___', `<input id="wf${i}" size="15">`)}</p>`
      ).join('');
    } else if (task.type === "matching") {
      html += `<p>Match the words to definitions:</p>
        <ul>${task.left.map((l, i) => `<li>${l} - <input id="match${i}" size="20"></li>`).join('')}</ul>`;
    }

    html += `
      <button class="task-check" onclick="TaskEngine.check()">Check Answers</button>
      <div id="task-feedback" class="task-feedback"></div>
    </div>`;
    return html;
  },

  check() {
    let correct = 0, total = 0;
    const fb = document.getElementById("task-feedback");

    if (this.activeTask.type === "cloze") {
      this.activeTask.gaps.forEach((gap, i) => {
        total++;
        const input = document.getElementById(`gap${i}`);
        if (input && input.value.trim().toLowerCase() === gap.answer) {
          correct++;
          input.style.borderColor = "#6fbf73";
        } else if (input) input.style.borderColor = "#c96b6b";
      });
    } else if (this.activeTask.type === "multiple-choice") {
      this.activeTask.questions.forEach((q, i) => {
        total++;
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.correct) correct++;
      });
    } else if (this.activeTask.type === "word-formation") {
      this.activeTask.words.forEach((w, i) => {
        total++;
        const input = document.getElementById(`wf${i}`);
        if (input && input.value.trim().toLowerCase() === w.answer) {
          correct++;
          input.style.borderColor = "#6fbf73";
        } else if (input) input.style.borderColor = "#c96b6b";
      });
    } else if (this.activeTask.type === "matching") {
      this.activeTask.right.forEach((r, i) => {
        total++;
        const input = document.getElementById(`match${i}`);
        if (input && input.value.trim().toLowerCase() === r) correct++;
      });
    }

    let pts = Math.round((correct / total) * this.activeTask.points);
    score += pts;
    updateScore();

    fb.innerHTML = correct === total 
      ? `🕵️ Perfect! +${pts} points. Great job learning English!` 
      : `📝 ${correct}/${total} correct → +${pts} points. Keep practicing!`;
    fb.style.opacity = "1";
  }
};

/* ======================================================
   📖 SCENES (глубокие ветки: 15+ сцен, с персонажами, endings)
====================================================== */
const scenes = {
  scene1: {
    title: "Prologue · Whisper from Ravenhill",
    text: `You are part of a small detective team. Tonight, you arrive at the old <strong>Ravenhill Estate</strong>. 
           Only <em>one window</em> is still lit. Inside the hall lies a dusty table and an old diary bearing the name <strong>Elizabeth Ravenhill</strong>.`,
    extra: `<em>The house feels alive, watching your every move.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      manor house — загородный особняк<br>
      dusty — пыльный<br>
      arrive — прибывать<br><br>
      <strong>❓ Question:</strong> Why is only one window lit?
    `,
    choices: {
      A: { label: "→ Read Elizabeth's diary", next: "scene2_diary" },
      B: { label: "⇢ Follow footsteps to the East Wing", next: "scene2_east_wing" },
      C: { label: "↗ Turn on the old radio near the stairs", next: "scene2_radio" }
    }
  },

  scene2_diary: {
    title: "🖤 Elizabeth's Diary",
    evidence: "Elizabeth's diary",
    sound: "diary-voice",
    text: `You open the diary. The handwriting changes abruptly, as if written in fear. 
           <strong>Listen carefully</strong> and complete the task below.`,
    extra: `<em>The pages are yellowed, with ink smudges from hasty writing.</em>`,
    task: {
      type: "cloze",
      level: "B2",
      points: 3,
      text: "Fill in the blanks from the diary entry:",
      gaps: [
        { sentence: "The house feels ___ tonight.", answer: "different" },
        { sentence: "Soft ___ echo in the halls.", answer: "footsteps" },
        { sentence: "Someone ___ watching me.", answer: "is" }
      ]
    },
    choices: {
      A: { label: "→ Continue reading the next page", next: "scene3_diary_page2" },
      B: { label: "⇢ Go to the East Wing mentioned in the diary", next: "scene2_east_wing" },
      C: { label: "← Return to the hall", next: "scene1" }
    }
  },

  scene3_diary_page2: {
    title: "Diary – Torn Page",
    evidence: "Torn page warning",
    text: `The next page is violently torn out. On the back, in different handwriting: 
           <em>"She saw the shadow. Don't let her go to the East Wing."</em>`,
    extra: `<em>Someone tried to hide this. The handwriting is shaky.</em>`,
    task: {
      type: "word-formation",
      level: "B2",
      points: 4,
      text: "Form the correct words:",
      words: [
        { sentence: "The warning was written ___ (FEAR).", answer: "fearfully" },
        { sentence: "This changes the whole ___ (INVESTIGATE).", answer: "investigation" },
        { sentence: "The shadow seems ___ (MYSTERY).", answer: "mysterious" },
        { sentence: "Silence filled the ___ (ROOM).", answer: "room" }
      ]
    },
    choices: {
      A: { label: "→ Ignore warning and go to East Wing", next: "scene4_east_danger" },
      B: { label: "→ Show note to team", next: "scene4_team_discuss" },
      C: { label: "← Back to diary start", next: "scene2_diary" }
    }
  },

  scene4_east_danger: {
    title: "Danger in the East Wing",
    evidence: "Ignored warning",
    text: `You enter despite the warning. The air grows cold. Something moves in the shadows... 
           You feel a chill – perhaps a bad choice?`,
    extra: `<em>The house punishes curiosity. Shadows close in.</em>`,
    task: {
      type: "multiple-choice",
      level: "B1",
      points: 3,
      questions: [
        { question: "What does 'chill' mean here?", options: ["Cold feeling", "Excitement", "Food"], correct: "Cold feeling" },
        { question: "A 'shadow' is:", options: ["Dark shape", "Friend", "Light"], correct: "Dark shape" }
      ]
    },
    choices: {
      A: { label: "→ Keep going deeper", next: "bad_ending_trap" },
      B: { label: "← Retreat quickly", next: "scene3_diary_page2" },
      C: { label: "→ Call for help", next: "scene4_team_discuss" }
    }
  },

  scene4_team_discuss: {
    title: "Team Discussion",
    evidence: "Team consensus",
    text: `You show the note. Your partner says: "This means someone protected Elizabeth. 
           Let's go together."`,
    extra: `<em>Strength in numbers, but the mystery deepens.</em>`,
    task: {
      type: "matching",
      level: "B2",
      points: 4,
      text: "Match words to definitions:",
      left: ["Consensus", "Protect", "Deepen", "Mystery"],
      right: ["Agreement", "Guard", "Become more intense", "Puzzle"]
    },
    choices: {
      A: { label: "→ Enter East Wing with team", next: "scene5_east_safe" },
      B: { label: "→ Check security logs first", next: "scene5_logs" },
      C: { label: "← Return to hall", next: "scene1" }
    }
  },

  scene2_east_wing: {
    title: "Shadows in the East Wing",
    text: `The corridor narrows. The floor creaks. You hear footsteps behind you... 
           but when you turn, nothing.`,
    extra: `<em>The light trembles. The house is playing tricks.</em>`,
    miniEnglish: `
      <strong>Vocabulary:</strong><br>
      narrow corridor — узкий коридор<br>
      to creak — скрипеть<br><br>
      <strong>❓ Question:</strong> Where are the footsteps?
    `,
    choices: {
      A: { label: "A. Call out: “Who’s there?”", next: "scene3_call_out" },
      B: { label: "B. Keep walking", next: "scene3_keep_walking" },
      C: { label: "C. Run back to hall", next: "scene1" }
    }
  },

  scene3_call_out: {
    title: "Echoing Call",
    text: `Your voice echoes. No answer, but a door creaks open ahead.`,
    extra: `<em>Did you alert something?</em>`,
    task: {
      type: "cloze",
      level: "B1",
      points: 2,
      gaps: [
        { sentence: "Your voice ___ in the hall.", answer: "echoes" }
      ]
    },
    choices: {
      A: { label: "→ Enter the open door", next: "scene4_open_door" },
      B: { label: "← Ignore and go back", next: "scene2_east_wing" },
      C: { label: "→ Call team for backup", next: "scene4_team_discuss" }
    }
  },

  scene3_keep_walking: {
    title: "Deeper into Shadows",
    text: `You press on. The footsteps fade, but you find a locked chest.`,
    evidence: "Locked chest",
    choices: {
      A: { label: "→ Try to open chest", next: "scene4_chest" },
      B: { label: "← Return", next: "scene2_east_wing" },
      C: { label: "→ Search for key", next: "scene4_key_search" }
    }
  },

  scene2_radio: {
    title: "Whispers on the Radio",
    isRadioScene: true,
    evidence: "Radio warning",
    media: { type: "video", src: "assets/radio-scene.mp4" },
    text: `The radio crackles: "...don't... open... the... door..." Then silence.`,
    extra: `<em>The voice sounds old, like from the past.</em>`,
    miniEnglish: `
      <strong>Vocabulary:</strong><br>
      glowing — слабо светящийся<br>
      broken sentence — обрывистая фраза<br><br>
      <strong>❓ Question:</strong> What does the voice warn against?
    `,
    choices: {
      A: { label: "A. Obey and avoid doors", next: "scene3_obey" },
      B: { label: "B. Ignore and open nearest door", next: "scene4_open_door" },
      C: { label: "C. Call Sir Henry", next: "scene_henry_intro" }
    }
  },

  scene_henry_intro: {
    title: "🖤 Sir Henry on the Phone",
    evidence: "Official family story",
    media: { type: "image", src: "sir-henry.jpeg", alt: "Sir Henry Ravenhill" },
    sound: "sir-henry-voice",
    quote: "There is no mystery here. My daughter simply needed time away. Please, do not dramatise.",
    text: `Sir Henry's voice is calm: Elizabeth left voluntarily.`,
    extra: `<em>He speaks perfectly, but do you believe him?</em>`,
    task: {
      type: "multiple-choice",
      level: "B2",
      points: 3,
      questions: [
        { question: "What does 'voluntarily' mean?", options: ["By force", "By choice", "By accident"], correct: "By choice" }
      ]
    },
    choices: {
      A: { label: "→ Ask about deleted recordings", next: "scene_henry_recordings" },
      B: { label: "→ Ask why no missing report", next: "scene_henry_missing" },
      C: { label: "← End call", next: "scene1" }
    }
  },

  scene_henry_recordings: {
    title: "Sir Henry on Recordings",
    text: `He pauses: "Technical issue. Nothing suspicious."`,
    extra: `<em>His tone shifts slightly – nervous?</em>`,
    choices: {
      A: { label: "→ Press for more details", next: "good_ending_truth" },
      B: { label: "→ Thank and hang up", next: "scene_henry_intro" },
      C: { label: "→ Accuse him of lying", next: "bad_ending_confront" }
    }
  },

  scene_henry_missing: {
    title: "Sir Henry on Missing Report",
    text: ` "She wasn't missing – she contacted us."`,
    extra: `<em>Is he telling the truth?</em>`,
    choices: {
      A: { label: "→ Ask for proof", next: "mystery_ending" },
      B: { label: "→ Believe him", next: "scene1" },
      C: { label: "→ Hang up angrily", next: "bad_ending_confront" }
    }
  },

  // Endings
  bad_ending_trap: {
    title: "Bad Ending: Trapped in Shadows",
    text: `The shadows engulf you. Game over – the house wins.`,
    choices: {} // No choices, end
  },

  bad_ending_confront: {
    title: "Bad Ending: Confrontation",
    text: `Sir Henry hangs up. You lose a key ally. Mystery unsolved.`,
    choices: {}
  },

  good_ending_truth: {
    title: "Good Ending: The Truth Revealed",
    text: `Sir Henry confesses: Elizabeth fled from family secrets. Case closed!`,
    choices: {}
  },

  mystery_ending: {
    title: "Mystery Ending: Deeper Secrets",
    text: `More questions arise. Elizabeth's fate remains unknown... To be continued.`,
    choices: {}
  },

  // Дополнительные сцены для глубины
  scene5_east_safe: {
    title: "Safe Exploration",
    text: `With team, you find a hidden letter.`,
    evidence: "Hidden letter",
    choices: {
      A: { label: "→ Read letter", next: "good_ending_truth" },
      B: { label: "→ Search further", next: "mystery_ending" },
      C: { label: "← Exit", next: "scene4_team_discuss" }
    }
  },

  scene5_logs: {
    title: "Security Logs",
    text: `Logs show deletions on the night Elizabeth vanished.`,
    evidence: "Deleted logs",
    choices: {
      A: { label: "→ Confront Sir Henry", next: "scene_henry_recordings" },
      B: { label: "→ Analyze deeper", next: "mystery_ending" },
      C: { label: "← Back", next: "scene4_team_discuss" }
    }
  },

  scene4_open_door: {
    title: "The Open Door",
    media: { type: "video", src: "assets/dark-room.mp4" },
    text: `Inside: dusty furniture, cracked mirror, fresh footprints.`,
    extra: `<em>Someone was here recently.</em>`,
    choices: {
      A: { label: "→ Follow footprints", next: "scene5_footprints" },
      B: { label: "← Close door", next: "scene1" },
      C: { label: "→ Take photos", next: "scene5_photos" }
    }
  },

  scene5_footprints: {
    title: "Following Footprints",
    text: `They lead to a secret passage.`,
    choices: {
      A: { label: "→ Enter passage", next: "good_ending_truth" },
      B: { label: "← Call team", next: "scene4_team_discuss" },
      C: { label: "→ Ignore", next: "bad_ending_trap" }
    }
  },

  scene5_photos: {
    title: "Evidence Photos",
    evidence: "Room photos",
    text: `Photos captured. Good evidence!`,
    choices: {
      A: { label: "→ Share with Sir Henry", next: "scene_henry_missing" },
      B: { label: "→ Continue exploring", next: "scene5_footprints" },
      C: { label: "← Back to hall", next: "scene1" }
    }
  },

  scene4_chest: {
    title: "Locked Chest",
    text: `It's locked. You need a key.`,
    choices: {
      A: { label: "→ Search for key", next: "scene4_key_search" },
      B: { label: "→ Force open", next: "bad_ending_trap" },
      C: { label: "← Leave it", next: "scene3_keep_walking" }
    }
  },

  scene4_key_search: {
    title: "Key Search",
    evidence: "Old key",
    text: `You find a rusty key under the rug.`,
    choices: {
      A: { label: "→ Open chest", next: "good_ending_truth" },
      B: { label: "← Pocket key", next: "scene3_keep_walking" },
      C: { label: "→ Show team", next: "scene4_team_discuss" }
    }
  },

  scene3_obey: {
    title: "Obeying the Warning",
    text: `You avoid doors. Safer, but miss clues?`,
    choices: {
      A: { label: "→ Reconsider and open one", next: "scene4_open_door" },
      B: { label: "→ Go to hall", next: "scene1" },
      C: { label: "→ Call Sir Henry", next: "scene_henry_intro" }
    }
  }
};

/* ======================================================
   🖥️ DOM ELEMENTS
====================================================== */
const titleEl = document.getElementById("scene-title");
const textEl = document.getElementById("scene-text");
const extraEl = document.getElementById("scene-extra");
const miniEl = document.getElementById("mini-english-content");
const clueMediaEl = document.getElementById("clue-media");
const inventoryListEl = document.getElementById("inventory-list");
const btnA = document.getElementById("choiceA");
const btnB = document.getElementById("choiceB");
const btnC = document.getElementById("choiceC");
const backBtn = document.getElementById("backButton");
const scoreEl = document.getElementById("score-display");

/* ======================================================
   🧠 HELPERS
====================================================== */
function updateScore() {
  scoreEl.textContent = `Score: ${score} points`;
}

function addEvidence(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);
    updateInventoryDisplay();
    score += 1;
    updateScore();
  }
}

function updateInventoryDisplay() {
  inventoryListEl.innerHTML = inventory.map(item => `<li>${item}</li>`).join("");
}

/* ======================================================
   🎬 RENDER SCENE
====================================================== */
function renderScene(id) {
  const scene = scenes[id];
  if (!scene) return console.warn(`Scene ${id} not found`);

  history.push(id);

  playSound("stepSound");

  document.querySelector(".game").style.opacity = "0";
  setTimeout(() => {
    titleEl.innerHTML = scene.title;
    textEl.innerHTML = scene.text || "";
    extraEl.innerHTML = scene.extra || "";
    miniEl.innerHTML = scene.miniEnglish || "";

    if (scene.task) {
      miniEl.innerHTML += TaskEngine.render(scene.task);
    }

    clueMediaEl.innerHTML = "";
    if (scene.media) {
      if (scene.media.type === "image") {
        const img = document.createElement("img");
        img.src = scene.media.src;
        img.alt = scene.media.alt || "Clue";
        clueMediaEl.appendChild(img);
      } else if (scene.media.type === "video") {
        const video = document.createElement("video");
        video.src = scene.media.src;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsinline = true;
        clueMediaEl.appendChild(video);
      }
    }

    if (scene.sound) {
      if (scene.sound === "diary-voice") {
        const playBtn = document.createElement("button");
        playBtn.textContent = "🎧 Listen to diary";
        playBtn.onclick = () => playSound("diary-voice");
        clueMediaEl.appendChild(playBtn);
      } else {
        playSound(scene.sound);
      }
    }

    if (scene.quote) {
      const quoteBubble = document.createElement("div");
      quoteBubble.innerHTML = `"${scene.quote}" — Sir Henry`;
      clueMediaEl.appendChild(quoteBubble);
    }

    if (scene.evidence) addEvidence(scene.evidence);

    const ch = scene.choices || {};
    btnA.textContent = ch.A ? ch.A.label : "";
    btnB.textContent = ch.B ? ch.B.label : "";
    btnC.textContent = ch.C ? ch.C.label : "";
    btnA.style.display = ch.A ? "block" : "none";
    btnB.style.display = ch.B ? "block" : "none";
    btnC.style.display = ch.C ? "block" : "none";

    btnA.onclick = ch.A ? () => { playSound('clickSound'); renderScene(ch.A.next); } : null;
    btnB.onclick = ch.B ? () => { playSound('clickSound'); renderScene(ch.B.next); } : null;
    btnC.onclick = ch.C ? () => { playSound('clickSound'); renderScene(ch.C.next); } : null;

    if (history.length > 1) {
      backBtn.style.display = "block";
      backBtn.onclick = () => {
        history.pop();
        playSound('clickSound');
        renderScene(history[history.length - 1]);
      };
    } else {
      backBtn.style.display = "none";
    }

    document.querySelector(".game").style.opacity = "1";
  }, 400);
}

/* ======================================================
   🚀 INIT
====================================================== */
updateScore();
updateInventoryDisplay();
