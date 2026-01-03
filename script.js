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
// ⭐ СТАРТОВЫЙ ЭКРАН ⭐
document.addEventListener('DOMContentLoaded', function() {
  const startScreen = document.getElementById('start-screen');
  const gameContent = document.querySelector('.game-content');
  const startBtn = document.getElementById('start-game-btn');
  
  if (!startScreen) return; // если стартового экрана нет, играем сразу
  
  startBtn.addEventListener('click', function() {
    // плавное исчезновение старта
    startScreen.style.transition = 'opacity 0.6s ease-out';
    startScreen.style.opacity = '0';
    startScreen.style.pointerEvents = 'none';
    
    setTimeout(() => {
      startScreen.style.display = 'none';
      
      // появление игры
      gameContent.style.display = 'block';
      gameContent.style.opacity = '0';
      gameContent.style.transition = 'opacity 0.6s ease-in';
      setTimeout(() => { gameContent.style.opacity = '1'; }, 50);
      
      // музыка + первая сцена
      if (!musicStarted) {
        playSound('bgMusic');
        musicStarted = true;
      }
      renderScene("scene1");
    }, 600);
  });
});

// ====== ИГРА ======
let inventory = [];
let score = 0;

const scenes = {
  scene1: {
    chapter: "Episode I · The Summons",
    title: "Prologue: Whisper from Ravenhill",
    text: `You are part of a small detective team. Tonight, you arrive at an old Scottish manor house: <strong>Ravenhill Estate</strong>. 
           The house is dark; only <em>one window</em> is still lit. Inside the hall, you find a dusty table and an old diary with the name <strong>Elizabeth Ravenhill</strong> on the cover.`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      manor house — загородный особняк<br>
      dusty — пыльный<br>
      to arrive — прибывать
      <br><br>
      <strong>❓ Question:</strong><br>
      Why is only one window still lit? (Почему горит только одно окно?)
    `,
    choices: {
      A: { label: "→ Stay in the hall and read Elizabeth's diary", next: "scene2A" },
      B: { label: "⇢ Go to the East Wing and follow the mysterious footsteps", next: "scene2B" },
      C: { label: "⇢ Find the old radio and listen to the whispers of the house", next: "scene2C" }
    }
  },

 scene2A: {
  chapter: "Episode I · The Summons",
  title: "🖤 Elizabeth's Diary",
  evidence: "Elizabeth's diary",
  media: { type: "image", src: "diary-mystical.png", alt: "Mystical diary" },
  sound: "diary-voice",
  text: `You open Elizabeth's diary in the cold library. <strong>🎧 Listen first → CAE tasks below!</strong>`,
  miniEnglish: `
<div class="task-alert" style="background:rgba(201,164,109,0.15);border:2px solid #c9a46d;border-radius:12px;padding:16px;margin-bottom:16px;font-size:1rem">
  <strong>CAE B2: Cloze (6 gaps) + Word Form (4)</strong> → +3 pts!
</div>
<div class="english-task" style="background:rgba(25,30,40,0.95);border:3px solid #c9a46d;border-radius:16px;padding:24px;max-height:400px;overflow-y:auto">
  <p style="color:#f5f1e8;font-size:1.05rem;line-height:1.4;margin-bottom:20px">
    "House feels <input id="gap1" maxlength="8" placeholder="_____" style="width:120px;border:2px solid #c9a46d;padding:8px 4px;background:#2a2f3a;color:#f5f1e8;font-size:1rem;border-radius:6px;margin:0 2px"> tonight.<br>
    Soft <input id="gap2" maxlength="9" placeholder="________" style="width:120px;..."> in East Wing.<br>
    <input id="gap3" maxlength="11" placeholder="___________" style="width:120px;..."> shaking.<br>
    Something <input id="gap4" maxlength="7" placeholder="______" style="width:120px;..."> watching.<br>
    Shadows <input id="gap5" maxlength="6" placeholder="______" style="width:120px;..."> alive.<br>
    Find the <input id="gap6" maxlength="6" placeholder="______" style="width:120px;...">."
  </p>
  <div style="font-size:0.95rem;color:#d0cabd;margin:16px 0">
    investigate(n): <input id="wf1" maxlength="12" placeholder="____________" style="width:140px;border:2px solid #c9a46d;padding:6px;background:#2a2f3a;color:#f5f1e8;font-size:0.95rem"><br>
    mystery(adj): <input id="wf2" maxlength="10" placeholder="__________" style="..."><br>
    silent(n): <input id="wf3" maxlength="8" placeholder="________" style="..."><br>
    fear(adv): <input id="wf4" maxlength="9" placeholder="_________" style="...">
  </div>
  <button onclick="checkScene2A()" style="background:#c9a46d;color:#1a1e29;padding:12px 24px;border:none;border-radius:10px;font-size:1.05rem;font-weight:700;cursor:pointer;width:100%;margin-top:12px">🔍 Check (+3 pts)</button>
  <div id="feedback2a" style="margin-top:12px;padding:12px;border-radius:8px;font-size:1rem;text-align:center;display:none"></div>
</div>`,
  choices: {
    A: { label: "→ Next diary page", next: "scene3A" },
    B: { label: "→ East Wing now", next: "scene2B" },
    C: { label: "→ Old radio", next: "scene2C" }
  }
},


  scene2B: {
    chapter: "Episode I · The Summons",
    title: "Shadows in the East Wing",
    text: `You walk toward the East Wing. The corridor is long and narrow, walls covered in faded wallpaper. 
           The old wooden floor creaks under your feet with every step. 
           <strong>Suddenly</strong> — you hear soft footsteps <em>behind you</em>. You turn around quickly... but the corridor is empty.`,
    extra: `<em style="color: #c9a46d;">Свет вашей лампы дрожит. Шаги слышны позади, но никого нет.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      narrow corridor — узкий коридор<br>
      to creak — скрипеть<br>
      to turn around — обернуться
      <br><br>
      <strong>❓ Question:</strong><br>
      Where do you hear the footsteps? (Где слышны шаги?)
    `,
    choices: {
       A: { label: "A. Call out loudly: “Who’s there?”", next: "scene3B_call" },
      B: { label: "B. Pretend you heard nothing and keep walking forward", next: "scene3B_keep" },
      C: { label: "C. Run back to the safety of the hall as fast as you can", next: "scene1" }
    }
  },

  scene2C: {
    chapter: "Episode I · The Summons",
    title: "Whispers on the Radio",
    isRadioScene: true,
    evidence: "Radio warning",
    media: { type: "video", src: "assets/radio-scene.mp4" },
    text: `Near the stairs, you find an old radio on a small dusty table. It's turned off, but a small <strong>orange light</strong> still glows faintly. 
           When you touch the button, static crackles... then a broken voice: 
           <em>"...don't... open... the... door..."</em> Complete silence follows.`,
    extra: `<em style="color: #c9a46d;">Дом будто отвечает вам. Голос звучит как старая запись из прошлого.</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      glowing — слабо светящийся<br>
      broken sentence — обрывистая фраза<br>
      silence — тишина
      <br><br>
      <strong>❓ Question:</strong><br>
      What does the voice tell you NOT to do?
    `,
    choices: {
      A: { label: "A. Obey the mysterious voice and avoid all doors", next: "scene3C_obey" },
      B: { label: "B. Ignore the warning and open the nearest door", next: "scene3C_open" },
      C: { label: "C. Call Sir Henry Ravenhill to ask about his daughter Elizabeth", next: "scene_henry_intro" }
    }
  },

  scene_henry_intro: {
    chapter: "Episode II · The Family's Version",
    title: "🖤 Sir Henry on the Phone",
    evidence: "Official family story",
    media: { type: "image", src: "sir-henry.jpeg", alt: "Sir Henry Ravenhill" },
    video: { type: "video", src: "sir-henry-video.mp4" },
    sound: "sir-henry-voice",
    quote: "There is no mystery here. My daughter simply needed time away from the family. Please, do not dramatise the situation.",
    text: `You dial Sir Henry Ravenhill's number. His voice sounds perfectly <strong>calm and controlled</strong>, every word measured. 
           He thanks you for your "professional interest" and firmly repeats the <em>official family version</em>: 
           Elizabeth left the Ravenhill Estate voluntarily and is completely safe.`,
    extra: `<em style="color: #c9a46d;">Он говорит идеально выверенными фразами, как по сценарию. Но веришь ли ты ему?</em>`,
    miniEnglish: `
      <strong>Key vocabulary:</strong><br>
      calm and controlled — спокойный, сдержанный<br>
      official version — официальная версия<br>
      to leave voluntarily — уйти по своей воле
      <br><br>
      <strong>❓ Question:</strong><br>
      What does Sir Henry claim happened to Elizabeth?
    `,
    choices: {
      A: { label: "→ Ask Sir Henry about the deleted security recordings", next: "scene_henry_recordings" },
      B: { label: "→ Ask why he never reported Elizabeth as missing", next: "scene_henry_missing" },
      C: { label: "← End the call politely and return to the hall", next: "scene1" }
    }
  },

  // ... остальные сцены аналогично с полными красивыми текстами
  scene3A: {
    chapter: "Episode II · Midnight Hunt",
    title: "Page Torn Out",
    evidence: "Shadow warning",
    media: { type: "video", src: "assets/diary-page2.mp4" },
    text: `The next page has been <strong>violently torn out</strong>. But on the back of the previous page, 
           written in completely different handwriting, you find a chilling warning: 
           <em>"She saw the shadow. Don't let her go to the East Wing."</em>`,
    extra: `<em style="color: #c9a46d;">Кто-то пытался уничтожить эту информацию. Почерк незнакомый и торопливый.</em>`,
    choices: {
      A: { label: "→ Ignore the warning and go to East Wing anyway", next: "scene4A_danger" },
      B: { label: "→ Immediately show this note to your investigation team", next: "scene4A_team" },
      C: { label: "← Return to the safety of the main hall", next: "scene1" }
    }
  },
  
scene4A_danger: {
    chapter: "Episode IV · Against Warnings",
    title: "Danger in the East Wing",
    evidence: "Ignored warning",
    text: "You step into the East Wing despite the warning. The air grows colder with every step. Somewhere ahead, something moves in the shadows, just out of sight.",
    extra: "<em>Вы нарушили правило дома. Теперь он наблюдает за каждым шагом.</em>",
    choices: {
      A: { label: "→ Keep going into the darkness", next: "scene1" },
      B: { label: "← Retreat to the hall", next: "scene1" },
      C: { label: "→ Stop and listen carefully", next: "scene1" }
    }
  },

  scene4A_team: {
    chapter: "Episode IV · Against Warnings",
    title: "Team Discussion",
    evidence: "Team consensus",
    text: "You show the note to your team. Alex frowns: \"This means someone else was trying to protect Elizabeth from the house.\"",
    extra: "<em>Теперь у вас есть союзники — и больше вопросов, чем ответов.</em>",
    choices: {
      A: { label: "→ Go to the East Wing together", next: "scene1" },
      B: { label: "→ Check old security logs later", next: "scene1" },
      C: { label: "← Return to the hall and plan", next: "scene1" }
    }
  },

  scene4B_door: {
    chapter: "Episode IV · Against Warnings",
    title: "The Open Door",
    media: { type: "video", src: "assets/dark-room.mp4" },
    text: "You approach the open door. Inside you see dusty furniture, a cracked mirror and fresh footprints in the dust leading deeper into the room.",
    extra: "<em>Кто-то был здесь совсем недавно. Возможно, он всё ещё в доме.</em>",
    choices: {
      A: { label: "→ Follow the fresh footprints", next: "scene1" },
      B: { label: "← Close the door and go back to the hall", next: "scene1" },
      C: { label: "→ Take photos for evidence", next: "scene1" }
    }
  },

  scene4B_team: {
    chapter: "Episode IV · Against Warnings",
    title: "Team Backup",
    text: "Your team arrives with flashlights. Together you move toward the open door. The footprints lead out of the room and deeper into the house.",
    extra: "<em>Вместе безопаснее, но дом всё равно шепчет в темноте.</em>",
    choices: {
      A: { label: "→ Follow the trail as a team", next: "scene1" },
      B: { label: "← Mark the room and go back to the hall", next: "scene1" },
      C: { label: "→ Secure the area and take notes", next: "scene1" }
    }
  }
};

// ====== DOM ЭЛЕМЕНТЫ ======
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

// ====== ИНВЕНТАРЬ ======
function addEvidence(id) {
  if (!inventory.includes(id)) {
    inventory.push(id);
    score += 1;
    renderInventory();
  }
}

function checkScene2A() {
  const gaps = {gap1:'different', gap2:'footsteps', gap3:'handwriting', gap4:'is', gap5:'come', gap6:'truth'};
  const wfs = {wf1:'investigation', wf2:'mysterious', wf3:'silence', wf4:'fearfully'};
  let gapScore = 0, wfScore = 0;
  for (let id in gaps) if (document.getElementById(id)?.value.toLowerCase().trim() === gaps[id]) gapScore++;
  for (let id in wfs) if (document.getElementById(id)?.value.toLowerCase().trim() === wfs[id]) wfScore++;
  const total = gapScore + wfScore;
  const fb = document.getElementById('feedback2a');
  fb.style.display = 'block';
  let pts = total >= 8 ? 3 : total >= 5 ? 2 : 1;
  fb.innerHTML = total >= 8 ? '🕵️‍♀️ Perfect! +3 pts. Unlock clue!' : total >= 5 ? `📝 ${total}/10 pts +2. Answers: gaps(${Object.values(gaps).join('/')}), words(${Object.values(wfs).join('/')})` : `🔄 ${total}/10 +1 pt. Try: ${Object.values(gaps).join(', ')}`;
  fb.style.background = total >= 8 ? 'rgba(201,164,109,0.3)' : total >= 5 ? 'rgba(170,130,100,0.25)' : 'rgba(120,80,50,0.3)';
  fb.style.color = '#f5f1e8'; fb.style.border = `2px solid ${total >= 8 ? '#c9a46d' : '#aa8a70'}`;
  score += pts; renderInventory(); // обновляет score
}





// ====== КРАСИВАЯ ОТРИСОВКА ======
function renderScene(id) {
  playSound('stepSound');
  const scene = scenes[id];
  if (!scene) return;

  // АНИМАЦИЯ ПЕРЕХОДА
  document.body.classList.add('fade-out');
  setTimeout(() => {
    if (scene.isRadioScene) playSound('radioSound');
    
    // БЕК БАТТОН
    if (scene.backTo) {
      backBtn.style.display = "block";
      backBtn.onclick = () => { playSound('clickSound'); renderScene(scene.backTo); };
    } else backBtn.style.display = "none";

    // КОНТЕНТ
    titleEl.innerHTML = scene.title;
    textEl.innerHTML = scene.text;
    extraEl.innerHTML = scene.extra || "";
    miniEl.innerHTML = scene.miniEnglish || "";

       // УЛИКИ
    if (scene.evidence) addEvidence(scene.evidence);

    // ===== МЕДИА (картинка или видео) =====
    clueMediaEl.innerHTML = "";

    if (scene.media?.type === "image") {
      const img = document.createElement("img");
      img.src = scene.media.src;
      img.alt = scene.media.alt || "Clue";
      img.style.maxWidth = "100%";
      img.style.borderRadius = "12px";
      clueMediaEl.appendChild(img);
    } else if (scene.media?.type === "video") {
      const video = document.createElement("video");
      video.src = scene.media.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.style.maxWidth = "100%";
      video.style.borderRadius = "12px";
      clueMediaEl.appendChild(video);
    }

    // ===== ЗВУКИ СЦЕНЫ =====
    // все звуки, КРОМЕ дневника, играем сразу (радио, голос Генри и т.п.)
    if (scene.sound && scene.sound !== "diary-voice") {
      playSound(scene.sound);
    }

    // дневник: ТОЛЬКО кнопка «Слушать дневник», без автоплея
    if (scene.sound === "diary-voice") {
      const playBtn = document.createElement("button");
      playBtn.textContent = "🎧 Слушать дневник";
      playBtn.style.cssText =
        "margin-top: 12px; background: rgba(201,164,109,0.18); border: 1px solid #c9a46d; color: #f5f1e8; padding: 8px 18px; border-radius: 20px; cursor: pointer; font-size: 0.9rem;";

      playBtn.onclick = () => {
        const audio = document.getElementById("diary-voice");
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
      };

      clueMediaEl.appendChild(playBtn);
    }

    // ✨ КРАСИВОЕ ОКОШКО ЦИТАТЫ ГЕНРИ
    if (scene.quote) {
      const quoteBubble = document.createElement("div");
      quoteBubble.style.cssText = `
        background: linear-gradient(135deg, rgba(27,30,41,0.98), rgba(10,12,20,0.98));
        border: 2px solid rgba(201,164,109,0.7);
        border-radius: 24px 24px 12px 24px;
        padding: 20px 24px 16px;
        margin: 16px 0;
        position: relative;
        font-style: italic;
        color: #f5f1e8;
        font-size: 1rem;
        max-width: 90%;
        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        animation: glow 2s ease-in-out infinite alternate;
      `;
      quoteBubble.innerHTML = `
        <div style="position: absolute; bottom: -10px; left: 32px; width: 0; height: 0; 
                    border: 10px solid transparent; border-top-color: rgba(201,164,109,0.7);"></div>
        <div style="font-weight: 600; margin-bottom: 8px; color: #c9a46d;">— Sir Henry Ravenhill</div>
        "${scene.quote}"
      `;
      clueMediaEl.appendChild(quoteBubble);
    }

    // КНОПКИ
    const choices = scene.choices;
    btnA.textContent = choices.A.label;
    btnB.textContent = choices.B.label;
    btnC.textContent = choices.C.label;

    btnA.onclick = () => { playSound('clickSound'); renderScene(choices.A.next); };
    btnB.onclick = () => { playSound('clickSound'); renderScene(choices.B.next); };
    btnC.onclick = () => { playSound('clickSound'); renderScene(choices.C.next); };

    document.body.classList.remove('fade-out');
  }, 300); // конец setTimeout
}         // конец renderScene


// ====== CSS АНИМАЦИЯ (добавь в <style>) ======
const style = document.createElement('style');
style.textContent = `
  @keyframes glow {
    0% { box-shadow: 0 8px 24px rgba(0,0,0,0.6); }
    100% { box-shadow: 0 8px 32px rgba(201,164,109,0.3); }
  }
  .fade-out { opacity: 0.3; transition: opacity 0.3s; }
`;
document.head.appendChild(style);

// ====== СТАРТ ======
renderInventory();
renderScene("scene1");


