// ====== ЗВУК ======
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

// фоновая музыка после первого клика по странице
let musicStarted = false;
document.addEventListener(
  "click",
  () => {
    if (!musicStarted) {
      playSound("bgMusic");
      musicStarted = true;
    }
  },
  { once: true }
);

// ====== ВСЕ СЦЕНЫ И ИГРА ======
const scenes = {
  scene1: {
    chapter: "Episode I · The Summons",
    title: "Prologue: Whisper from Ravenhill",
    text: `You are part of a small detective team. Tonight, you arrive at an old Scottish manor house: Ravenhill Estate. The house is dark; only one window is still lit. Inside the hall, you find a dusty table and an old diary with the name Elizabeth Ravenhill on the cover.`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      manor house — a large country house with land; загородный особняк<br>
      dusty — covered with dust; пыльный<br>
      to arrive — to reach a place; прибывать
      <br><br>
      <strong>Question:</strong><br>
      Why is only one window still lit? (Почему горит только одно окно?)<br>
      <em>You don't know yet...</em>
    `,
    choices: {
      A: {
        label: "→ Stay in the hall and read the diary",
        next: "scene2A"
      },
      B: {
        label: "⇢ Go to the East Wing and follow the footsteps",
        next: "scene2B"
      },
      C: {
        label: "⇢ Find the old radio and listen to the house",
        next: "scene2C"
      }
    }
  },

  scene2A: {
    chapter: "Episode I · The Summons",
    title: "The Hallway Echoes",
    evidence: "Elizabeth's diary",
    media: {
      type: "video",
      src: "assets/diary-abandoned.mp4"
    },
    text: `You stay in the cold hall and open the diary. The first page is dated “October 12, 2004”. The handwriting is quick and nervous, as if the writer was in a hurry.`,
    extra: `<em>Вы остаетесь в холле и начинаете читать. Почерк Элизабет будто дрожит.</em><br><br>
      <strong>Diary entry:</strong><br>
      “The house feels different tonight. I keep hearing soft footsteps in the East Wing, but when I open the door, the corridor is empty. Everyone tells me I’m just tired and imagining things. Mother says I should stop writing about the house in my diary. But I can’t. Something is wrong here, and I don’t feel safe anymore.”`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      footsteps — sounds of someone walking; шаги<br>
      to imagine things — to think something exists when it doesn't; воображать<br>
      to feel safe — to not be afraid; чувствовать себя в безопасности
      <br><br>
      <strong>Check yourself:</strong><br>
      Why doesn't Elizabeth feel safe?<br>
      a) She hears footsteps but sees no one.<br>
      b) She doesn't like her mother.<br>
      c) She hates writing in her diary.
    `,
    choices: {
      A: {
        label: "A. Read the next page of the diary.",
        next: "scene3A"
      },
      B: {
        label: "B. Close the diary and go to the East Wing.",
        next: "scene2B"
      },
      C: {
        label: "C. Take the diary with you and look for a radio.",
        next: "scene2C"
      }
    }
  },

  scene2B: {
    chapter: "Episode I · The Summons",
    title: "Diary of Shadows",
    text: `You walk to the East Wing. The corridor is long and narrow. The old wooden floor creaks under your feet. Suddenly, you hear soft footsteps behind you—but when you turn around, no one is there.`,
    extra: `<em>Вы идёте по узкому коридору, свет лампы дрожит. Шаги слышны позади, но коридор пуст.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      narrow corridor — a corridor that is not wide; узкий коридор<br>
      every step makes a noise — each step can be heard; каждый шаг издаёт звук<br>
      to turn around — to move your body to face another direction; обернуться
      <br><br>
      <strong>Question:</strong><br>
      Are the footsteps in front of you or behind you? (Впереди или позади?)
    `,
    choices: {
      A: {
        label: "A. Call out: “Who’s there?”",
        next: "scene3B_call"
      },
      B: {
        label: "B. Pretend you heard nothing and keep walking.",
        next: "scene3B_keep"
      },
      C: {
        label: "C. Go back to the hall as fast as you can.",
        next: "scene1"
      }
    }
  },

  scene2C: {
    chapter: "Episode I · The Summons",
    title: "Whispers on the Radio",
    isRadioScene: true,
    evidence: "Radio warning",
    media: {
      type: "video",
      src: "assets/radio-scene.mp4"
    },
    text: `Near the stairs, you find an old radio on a small table. It's off, but a small orange light still glows. When you touch the button, a short, broken sentence crackles through: "...don't... open... the... door..." Then silence.`,
    extra: `<em>Вы трогаете радио — и дом будто отвечает. Фраза звучит так, как будто её записали много лет назад.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      glowing — giving a soft, steady light; светящийся<br>
      broken sentence — sentence with pauses or missing parts; обрывочная фраза<br>
      silent — making no sound; беззвучный, тихий
      <br><br>
      <strong>Question:</strong><br>
      What does the voice tell you <em>not</em> to do? (Чего голос просит не делать?)
    `,
    choices: {
      A: {
        label: "A. Obey the voice and stay away from any doors.",
        next: "scene3C_obey"
      },
      B: {
        label: "B. Ignore the voice and open the nearest door.",
        next: "scene3C_open"
      },
      C: {
        label: "C. Call Sir Henry Ravenhill to ask about Elizabeth.",
        next: "scene_henry_intro"
      }
    }
  },

  // ----- ДАЛЬШЕ СЦЕНЫ -----

  scene3A: {
    chapter: "Episode II · Midnight Hunt",
    title: "Page Left Blank",
    media: {
      type: "video",
      src: "assets/diary-page2.mp4"
    },
    text: `The next page has been torn out. But on the back of the previous page, you find a small note in different handwriting: "She saw the shadow. Don't let her go to the East Wing."`,
    extra: `<em>Кто-то пытался скрыть эту страницу. Почерк незнакомый.</em>`,
    miniEnglish: `
      torn out — вырванная<br>
      handwriting — почерк<br>
      shadow — тень
      <br><br><strong>Question:</strong> Who wrote the warning? (Кто написал предупреждение?)
    `,
    choices: {
      A: {
        label: "→ Hide the diary and go East Wing anyway",
        next: "scene4A_danger"
      },
      B: {
        label: "→ Show the note to your team",
        next: "scene4A_team"
      },
      C: {
        label: "← Back to hall",
        next: "scene1"
      }
    }
  },

  scene3B_call: {
    chapter: "Episode II · Midnight Hunt",
    title: "Echo in the Corridor",
    media: {
      type: "video",
      src: "assets/corridor-shadow.mp4"
    },
    text: `"Who's there?" — your voice echoes through the corridor. Silence. Then... a door creaks open 10 meters ahead. A cold wind blows from the darkness.`,
    extra: `<em>Дверь открылась сама. Из темноты дует холод.</em>`,
    miniEnglish: `to creak — скрипеть<br>to blow — дуть (о ветре)`,
    choices: {
      A: { label: "→ Walk to the open door", next: "scene4B_door" },
      B: { label: "→ Run back to hall", next: "scene1" },
      C: { label: "→ Call your team", next: "scene4B_team" }
    }
  },

  scene3B_keep: {
    chapter: "Episode II · Midnight Hunt",
    title: "Pretending Nothing Happened",
    text: "You keep walking and pretend you heard nothing. The footsteps slowly fade. Maybe it was just the old floor… or maybe not.",
    extra: "<em>Иногда легче сделать вид, что ничего не было. Но дом помнит.</em>",
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      to fade — to become weaker or quieter and then disappear; затихать, постепенно исчезать
    `,
    choices: {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    }
  },

  scene3C_obey: {
    chapter: "Episode III · The House Decides",
    title: "Careful Step in the Dark",
    backTo: "scene1",
    isRadioScene: true,
    text: "You decide to trust the voice. You stay away from the doors and listen. The house stays silent, as if it is waiting for your next move.",
    extra: "<em>Иногда самая смелая стратегия — подождать.</em>",
    miniEnglish: "",
    choices: {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    }
  },

  scene3C_open: {
    chapter: "Episode III · The House Decides",
    title: "Opening the Forbidden Door",
    backTo: "scene1",
    isRadioScene: true,
    text: "You ignore the warning and open the nearest door. Cold air hits your face. The room is empty, but you feel that someone was here a moment ago.",
    extra: "<em>Вы нарушили правило дома. Иногда это нужно, чтобы продвинуться в расследовании.</em>",
    miniEnglish: "",
    choices: {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    }
  },

  scene3C_record: {
    chapter: "Episode III · The House Decides",
    title: "Captured Evidence",
    backTo: "scene1",
    isRadioScene: true,
    evidence: "Recorded message: You are not alone",
    text: "You hold your phone close to the radio and wait. After a few seconds the voice returns: “If you hear this, you are not alone in the house.” This time you record it.",
    extra: "<em>Теперь у вас есть первая настоящая улика — запись голоса.</em>",
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      evidence — facts or information that help you prove something; улика<br>
      to record — to save sound or video so you can listen or watch later; записывать
    `,
    choices: {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    }
  },

  // ----- СЭР ГЕНРИ -----

  scene_henry_intro: {
    chapter: "Episode II · The Family's Version",
    title: "Sir Henry on the Phone",
    evidence: "Official family story",
    media: {
      type: "image",
      src: "sir-henry.jpeg",
      alt: "Sir Henry Ravenhill"
    },
    video: {
      type: "video",
      src: "sir-henry-video.mp4"
    },
    sound: "sir-henry-voice",
    quote:
      "There is no mystery here. My daughter simply needed time away from the family. Please, do not dramatise the situation.",
    text: `You call Sir Henry Ravenhill. His voice sounds calm and controlled. He thanks you for your "professional interest" and repeats the official version: Elizabeth left the estate on her own and is safe.`,
    extra: `<em>Он говорит идеально выверенными фразами. Но веришь ли ты ему?</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      calm and controlled — speaking without strong emotions; спокойный, контролирующий себя<br>
      official version — what the family tells the public; официальная версия<br>
      to leave on one's own — уйти по собственной воле
      <br><br>
      <strong>Question:</strong><br>
      What does Sir Henry say about Elizabeth?
    `,
    choices: {
      A: {
        label: "→ Ask about the deleted recordings",
        next: "scene_henry_recordings"
      },
      B: {
        label: "→ Ask why he didn't report her missing",
        next: "scene_henry_missing"
      },
      C: {
        label: "← End the call and go back to the hall",
        next: "scene1"
      }
    }
  },

  scene_henry_recordings: {
    chapter: "Episode II · The Family's Version",
    title: "Nothing to See Here",
    evidence: "Recordings were destroyed",
    text: `When you mention the security recordings, Sir Henry pauses for a second. Then he says, "All technical materials from that period were destroyed. There was nothing of importance on them."`,
    extra: `<em>Слишком чёткий, слишком быстрый ответ. Почти как заранее выученная фраза.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      to pause — to stop speaking for a short time; сделать паузу<br>
      to destroy materials — to remove or erase them completely; уничтожить материалы<br>
      nothing of importance — ничего важного
      <br><br>
      <strong>Question:</strong><br>
      Do you think there was really "nothing of importance" on the recordings?
    `,
    choices: {
      A: {
        label: "→ Compare his words with Alex's story",
        next: "scene2A"
      },
      B: {
        label: "← End the call and return to the hall",
        next: "scene1"
      },
      C: {
        label: "→ Note this as suspicious and continue the investigation",
        next: "scene2B"
      }
    }
  },

  scene_henry_missing: {
    chapter: "Episode II · The Family's Version",
    title: "Not Missing, Just Gone",
    evidence: "Henry refused to report her missing",
    text: `"There was no reason to report Elizabeth missing," Sir Henry says. "She is an adult. She simply needed time away from the family. Please, do not dramatise the situation."`,
    extra: `<em>Для отца его слова звучат слишком холодно. И слишком удобно для репутации.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      to report someone missing — официально заявить о пропаже; заявить о пропаже<br>
      to need time away — to need distance from a place or people; нуждаться в том, чтобы уехать<br>
      to dramatise the situation — делать ситуацию более драматичной, чем она есть
      <br><br>
      <strong>Question:</strong><br>
      Why doesn't Sir Henry call Elizabeth "missing"?
    `,
    choices: {
      A: {
        label: "→ Connect his words with the diary",
        next: "scene2A"
      },
      B: {
        label: "→ Discuss his reaction with your team",
        next: "scene1"
      },
      C: {
        label: "← End the call and return to the hall",
        next: "scene1"
      }
    }
  }
  // ----- scene4 ЗАГЛУШКИ -----
  scene4A_danger: {
    chapter: "Episode IV · Against Warnings",
    title: "Danger in the East Wing",
    evidence: "Shadow warning ignored",
    text: "You ignore the warning and enter the East Wing. The air grows colder. Something moves in the shadows ahead.",
    extra: "<em>Вы нарушили правило. Теперь дом знает, что вы здесь.</em>",
    choices: {
      A: { label: "→ Keep going", next: "scene1" },
      B: { label: "← Back to hall", next: "scene1" },
      C: { label: "← Back to hall", next: "scene1" }
    }
  },

  scene4A_team: {
    chapter: "Episode IV · Against Warnings",
    title: "Team Discussion",
    evidence: "Team consensus",
    text: "Your team examines the note. 'This changes everything,' says Alex. 'Someone else was protecting Elizabeth.'",
    extra: "<em>Теперь у вас есть союзники. Расследование набирает обороты.</em>",
    choices: {
      A: { label: "→ East Wing together", next: "scene1" },
      B: { label: "→ Check security logs", next: "scene1" },
      C: { label: "← Back to hall", next: "scene1" }
    }
  },

  scene4B_door: {
    chapter: "Episode IV · Against Warnings",
    title: "The Open Door",
    media: { type: "video", src: "assets/dark-room.mp4" },
    text: "You approach the open door. Inside: dusty furniture, a broken mirror, and... fresh footprints in the dust.",
    extra: "<em>Кто-то был здесь недавно. Очень недавно.</em>",
    choices: {
      A: { label: "→ Follow the footprints", next: "scene1" },
      B: { label: "← Back to hall", next: "scene1" },
      C: { label: "→ Take photos", next: "scene1" }
    }
  },

    scene4B_team: {
    chapter: "Episode IV · Against Warnings",
    title: "Team Backup Arrives",
    text: "Your team arrives with flashlights. Together you approach the open door. The footprints lead deeper into the house.",
    extra: "<em>Вместе безопаснее. Но дом всё ещё наблюдает.</em>",
    choices: {
      A: { label: "→ Follow footprints", next: "scene1" },
      B: { label: "← Back to hall", next: "scene1" },
      C: { label: "→ Secure the area", next: "scene1" }
    }
  }
};  


// ====== ИНВЕНТАРЬ и СТАТУС ======
let inventory = [];
let score = 0;
let endingsUnlocked = [];

const overlayEl = document.getElementById("scene-overlay");
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

function addEvidence(id, scoreValue = 1) {
  if (!inventory.includes(id)) {
    inventory.push(id);
    score += scoreValue;
    renderInventory();
  }
}

function renderInventory() {
  if (!inventoryListEl) return;

  inventoryListEl.innerHTML = "";

  if (inventory.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No evidence yet / Улик пока нет";
    inventoryListEl.appendChild(li);
  } else {
    inventory.forEach((evidenceId) => {
      const li = document.createElement("li");
      li.textContent = evidenceId;
      inventoryListEl.appendChild(li);
    });
  }

  updateStatus();
}

function updateStatus() {
  if (scoreDisplayEl) {
    scoreDisplayEl.textContent = `Evidence score: ${score}`;
  }

  let ending = "";
  if (score >= 4) {
    ending = "Ending: Ravenhill Solved";
  } else if (score >= 2) {
    ending = "Ending: The House Watches";
  } else {
    ending = "Ending: The House Wins";
  }

  if (endingDisplayEl) {
    endingDisplayEl.textContent = ending;
  }
}

// ====== ОТРИСОВКА СЦЕН ======

function renderScene(id) {
  playSound("stepSound");

  const scene = scenes[id];
  if (!scene) return;

  if (scene.isRadioScene) {
    playSound("radioSound");
  }

  if (scene.backTo) {
    backBtn.style.display = "block";
    backBtn.onclick = () => {
      playSound("clickSound");
      renderScene(scene.backTo);
    };
  } else {
    backBtn.style.display = "none";
  }

  const sceneEl = document.querySelector(".scene");
  const choicesEl = document.querySelector(".choices");
  const miniBlockEl = document.querySelector(".mini-english");

  sceneEl.classList.add("fade-out");
  choicesEl.classList.add("fade-out");
  miniBlockEl.classList.add("fade-out");

  setTimeout(() => {
    titleEl.textContent = scene.title || "";
    textEl.textContent = scene.text || "";
    extraEl.innerHTML = scene.extra || "";
    miniEl.innerHTML = scene.miniEnglish || "";

    if (scene.evidence) {
      addEvidence(scene.evidence, 1);
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
        video.playsInline = true;
        clueMediaEl.appendChild(video);
      }
    }

    if (scene.video) {
      const video = document.createElement("video");
      video.src = scene.video.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.style.maxWidth = "100%";
      video.style.borderRadius = "12px";
      video.style.marginTop = "8px";
      clueMediaEl.appendChild(video);
    }

    if (scene.sound) {
      playSound(scene.sound);
    }

   

    // защита: если у сцены нет choices (заглушка) — просто вернёмся в hall
    const choices = scene.choices || {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    };

    btnA.textContent = choices.A.label;
    btnB.textContent = choices.B.label;
    btnC.textContent = choices.C.label;

    btnA.onclick = () => {
      playSound("clickSound");
      renderScene(choices.A.next);
    };
    btnB.onclick = () => {
      playSound("clickSound");
      renderScene(choices.B.next);
    };
    btnC.onclick = () => {
      playSound("clickSound");
      renderScene(choices.C.next);
    };

    sceneEl.classList.remove("fade-out");
    choicesEl.classList.remove("fade-out");
    miniBlockEl.classList.remove("fade-out");
  }, 500);
}

// стартуем с первой сцены
renderScene("scene1");

