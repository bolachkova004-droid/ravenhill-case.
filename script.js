function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

// фоновая музыка после первого клика по странице
let musicStarted = false;
document.addEventListener('click', () => {
  if (!musicStarted) {
    playSound('bgMusic');
    musicStarted = true;
  }
}, { once: true });
const scenes = {
  scene1: {
    chapter: "Episode I · The Summons",
    title: "Prologue: Whisper from Ravenhill",
    text: `You are part of a small detective team. Tonight you arrive at an old Scottish manor house: Ravenhill Estate. The house is dark. Only one window is still lit. Inside the hall you find a dusty table and an old diary with the name Elizabeth Ravenhill on the cover.`,
    extra: `<em>Вы — команда детективов, вернувшаяся к старому делу. Вы стоите в холле Ravenhill и держите дневник в руках.</em>`,
    miniEnglish: `
      <strong>Useful words:</strong><br>
      manor house — загородный особняк, усадьба<br>
      dusty — пыльный<br>
      to arrive — прибывать, приезжать
      <br><br>
      <strong>Question:</strong> Why is only one window still lit? (Почему горит только одно окно?) — you don't know yet…
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
    media: {
    type: "video",
    src: "assets/diary-abandoned.mp4"
  },
    text: `You stay in the cold hall and open the diary. The first page is dated “October 12, 2004”. The handwriting is fast and nervous.`,
    extra: `<em>Вы остаетесь в холле и начинаете читать. Почерк Элизабет будто дрожит.</em><br><br>
      <strong>Diary entry:</strong><br>
      “The house feels different tonight. I keep hearing soft footsteps in the East Wing, but when I open the door, the corridor is empty. Everyone tells me I’m just tired and imagining things. Mother says I should stop writing about the house in my diary. But I can’t. Something is wrong here, and I don’t feel safe anymore.”`,
    miniEnglish: `
      footsteps — шаги<br>
      to imagine things — надумывать, воображать то, чего нет<br>
      to feel safe — чувствовать себя в безопасности
      <br><br>
      <strong>Check yourself:</strong><br>
      Why doesn’t Elizabeth feel safe?<br>
      a) She hears footsteps but sees no one.<br>
      b) She doesn’t like her mother.<br>
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
    text: `You walk to the East Wing. The corridor is long and narrow. The wooden floor is old and every step makes a quiet noise. Suddenly you hear soft footsteps behind you, but when you turn around, no one is there.`,
    extra: `<em>Вы идёте по узкому коридору, свет лампы дрожит. Шаги слышны позади, но коридор пуст.</em>`,
    miniEnglish: `
      narrow corridor — узкий коридор<br>
      every step makes a noise — каждый шаг издаёт звук<br>
      to turn around — обернуться
      <br><br>
      <strong>Question:</strong> Are the footsteps in front of you or behind you? (Впереди или позади?)
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
    media: {
    type: "video",
    src: "assets/radio-scene.mp4"
  },
    text: `Near the stairs you find an old radio on a small table. The radio is off, but a small orange light is still glowing. When you touch the button, you hear a short, broken sentence in English: “...don’t... open... the... door...” Then the radio is silent again.`,
    extra: `<em>Вы трогаете радио — и дом будто отвечает. Фраза звучит так, как будто её записали много лет назад.</em>`,
    miniEnglish: `
      glowing — светящийся<br>
      broken sentence — обрывочная фраза<br>
      silent — беззвучный, тихий
      <br><br>
      <strong>Question:</strong> What does the voice tell you <em>not</em> to do? (Чего голос просит не делать?)
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
        label: "C. Try to record the next message from the radio.",
        next: "scene3C_record"
      }
    }
  },

  // заглушки для следующих сцен — пока просто возвращаем в начало
 scene3A: {
  chapter: "Episode II · Midnight Hunt",
  title: "Page Left Blank",
  media: {
    type: "video",
    src: "assets/diary-page2.mp4"  // твой новый ролик
  },
  text: `The next page is torn out. But on the back of the previous page you find a small note in different handwriting: "She saw the shadow. Don't let her go to the East Wing."`,
  extra: `<em>Кто-то пытался скрыть эту страницу. Почерк незнакомый.</em>`,
  miniEnglish: `
    torn out — вырванная<br>
    handwriting — почерк<br>
    shadow — тень
    <br><br><strong>Question:</strong> Who wrote the warning? (Кто написал предупреждение?)
  `,
  choices: {
    A: { label: "→ Hide the diary and go East Wing anyway", next: "scene4A_danger" },
    B: { label: "→ Show the note to your team", next: "scene4A_team" },
    C: { label: "← Back to hall", next: "scene1" }
  }
},


 scene3B_call: {
  chapter: "Episode II · Midnight Hunt",
  title: "Echo in the Corridor", 
  media: {
    type: "video",
    src: "assets/corridor-shadow.mp4"
  },
  text: `"Who's there?" — your voice echoes. Silence. Then... a door creaks slowly open 10 meters ahead. A cold wind blows from the darkness.`,
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
    miniEnglish: "to fade — затихать, исчезать постепенно.",
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
    text: "You hold your phone close to the radio and wait. After a few seconds the voice returns: “If you hear this, you are not alone in the house.” This time you record it.",
    extra: "<em>Теперь у вас есть первая настоящая улика — запись голоса.</em>",
    miniEnglish: "evidence — улика.<br>to record — записывать.",
    choices: {
      A: { label: "← Back to the hall", next: "scene1" },
      B: { label: "← Back to the hall", next: "scene1" },
      C: { label: "← Back to the hall", next: "scene1" }
    }
  }
};


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

// состояние игры
let inventory = [];
let score = 0;
let endingsUnlocked = [];




function renderScene(id) {
  playSound('stepSound'); // 🔊 шаги при переходе

  const scene = scenes[id];
  if (!scene) return;
    // спец-эффект: радио
  if (scene.isRadioScene) {
    playSound('radioSound');
  }

  // отдельная кнопка "назад" для сцен с backTo
if (scene.backTo) {
  backBtn.style.display = "block";
  backBtn.onclick = () => {
    playSound('clickSound');
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
    titleEl.textContent = scene.title;
    textEl.textContent = scene.text;
    extraEl.innerHTML = scene.extra || "";
    miniEl.innerHTML = scene.miniEnglish || "";
        // медиа-улика для сцены
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


    btnA.textContent = scene.choices.A.label;
btnB.textContent = scene.choices.B.label;
btnC.textContent = scene.choices.C.label;

btnA.onclick = () => {
  playSound('clickSound');
  renderScene(scene.choices.A.next);
};
btnB.onclick = () => {
  playSound('clickSound');
  renderScene(scene.choices.B.next);
};
btnC.onclick = () => {
  playSound('clickSound');
  renderScene(scene.choices.C.next);
};

    sceneEl.classList.remove("fade-out");
    choicesEl.classList.remove("fade-out");
    miniBlockEl.classList.remove("fade-out");
  }, 500);
}




// стартуем с первой сцены
renderScene("scene1");
