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
    text: "You turn the page and see a new entry… but this part of the case is still under construction.",
    extra: "<em>Вы продвинулись дальше всех. Следующий фрагмент дела Ravenhill появится в следующем апдейте.</em>",
    miniEnglish: "entry — запись (в дневнике).<br><br>For now, you can go back to the beginning and try other choices.",
    choices: {
  A: { label: "← Back to the hall", next: "scene1" },
  B: { label: "← Back to the hall", next: "scene1" },
  C: { label: "← Back to the hall", next: "scene1" }
},

  },

  scene3B_call: {
  chapter: "Episode II · Midnight Hunt",
  title: "Echo in the Corridor",
    text: "You call out: “Who’s there?” Your voice echoes in the empty corridor. The footsteps stop. The house is listening.",
    extra: "<em>Дом как будто задержал дыхание. Ответа нет — только ваше эхо.</em>",
    miniEnglish: "to echo — отдавать эхом.<br><br>You feel more curious than afraid now.",
    choices: {
  A: { label: "← Back to the hall", next: "scene1" },
  B: { label: "← Back to the hall", next: "scene1" },
  C: { label: "← Back to the hall", next: "scene1" }
},

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
},
  },

  scene3C_obey: {
  chapter: "Episode III · The House Decides",
  title: "Careful Step in the Dark",
    text: "You decide to trust the voice. You stay away from the doors and listen. The house stays silent, as if it is waiting for your next move.",
    extra: "<em>Иногда самая смелая стратегия — подождать.</em>",
    miniEnglish: "",
    choices: {
  A: { label: "← Back to the hall", next: "scene1" },
  B: { label: "← Back to the hall", next: "scene1" },
  C: { label: "← Back to the hall", next: "scene1" }
},
  },

  scene3C_open: {
  chapter: "Episode III · The House Decides",
  title: "Opening the Forbidden Door",
    text: "You ignore the warning and open the nearest door. Cold air hits your face. The room is empty, but you feel that someone was here a moment ago.",
    extra: "<em>Вы нарушили правило дома. Иногда это нужно, чтобы продвинуться в расследовании.</em>",
    miniEnglish: "",
    choices: {
  A: { label: "← Back to the hall", next: "scene1" },
  B: { label: "← Back to the hall", next: "scene1" },
  C: { label: "← Back to the hall", next: "scene1" }
},
  },

  scene3C_record: {
  chapter: "Episode III · The House Decides",
  title: "Captured Evidence",
    text: "You hold your phone close to the radio and wait. After a few seconds the voice returns: “If you hear this, you are not alone in the house.” This time you record it.",
    extra: "<em>Теперь у вас есть первая настоящая улика — запись голоса.</em>",
    miniEnglish: "evidence — улика.<br>to record — записывать.",
    choices: {
  A: { label: "← Back to the hall", next: "scene1" },
  B: { label: "← Back to the hall", next: "scene1" },
  C: { label: "← Back to the hall", next: "scene1" }
},
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

function renderScene(id) {
  playSound('stepSound'); // 🔊 шаги при переходе

  const scene = scenes[id];
  if (!scene) return;

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
