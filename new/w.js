/* ========================================================
   1. NAVIGATION & SIDEBAR MENU LOGIC
   ======================================================== */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

function highlightCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  
  if (page === "index.html" || page === "") {
    const playLink = document.getElementById('link-play');
    if (playLink) playLink.classList.add('active');
  } else if (page === "lesson.html" || page === "lesson.html") {
    const studyLink = document.getElementById('link-study');
    if (studyLink) studyLink.classList.add('active');
  } else if (page === "games.html") {
    const challengeLink = document.getElementById('link-challenge');
    if (challengeLink) challengeLink.classList.add('active');
  } else if (page === "skills-hub.html") {
    const masteryLink = document.getElementById('link-mastery');
    if (masteryLink) masteryLink.classList.add('active');
  }
}

window.addEventListener('DOMContentLoaded', highlightCurrentPage);


/* ========================================================
   2. LISTENING GAME LOGIC (Rhymes)
   ======================================================== */
const listeningQuestions = [
  { target: "🐱 CAT", choices: ["BAT", "DOG", "PIG"], correct: "BAT" },
  { target: "☀️ SUN", choices: ["MOON", "RUN", "STAR"], correct: "RUN" },
  { target: "🌳 TREE", choices: ["BEE", "LEAF", "ROCK"], correct: "BEE" },
  { target: "🍰 CAKE", choices: ["PIE", "BAKE", "SWEET"], correct: "BAKE" },
  { target: "🐸 FROG", choices: ["LOG", "FISH", "POND"], correct: "LOG" }
];
let listenIdx = 0, listenScore = 0;
let listenActive = false;

function startListeningGame() {
  listenIdx = 0; listenScore = 0; listenActive = true;
  document.getElementById('btn-start-listen').style.display = 'none';
  document.getElementById('score-listen').innerText = listenScore;
  loadListeningQuestion();
}

function loadListeningQuestion() {
  if (listenIdx >= listeningQuestions.length) {
    document.getElementById('target-listen').innerText = "🏆 CLEAR!";
    document.getElementById('feedback-listen').innerText = "Perfect Ear! Listening Medallion Earned!";
    document.getElementById('feedback-listen').style.color = "#A55EEA";
    document.getElementById('choices-listen').innerHTML = "";
    
    let startBtn = document.getElementById('btn-start-listen');
    startBtn.innerText = "Play Again ↺";
    startBtn.style.display = 'block';
    listenActive = false;
    return;
  }
  let q = listeningQuestions[listenIdx];
  document.getElementById('target-listen').innerText = q.target;
  document.getElementById('feedback-listen').innerText = "Which word rhymes?";
  document.getElementById('feedback-listen').style.color = "#8A7B9F";
  
  let choicesContainer = document.getElementById('choices-listen');
  choicesContainer.innerHTML = "";
  q.choices.forEach(choice => {
    choicesContainer.innerHTML += `<button class="game-btn" onclick="submitListenAnswer('${choice}')">${choice}</button>`;
  });
}

function submitListenAnswer(selected) {
  if (!listenActive) return;
  if (selected === listeningQuestions[listenIdx].correct) {
    listenScore++;
    document.getElementById('feedback-listen').innerText = "🎉 Dynamic sound! Correct!";
    document.getElementById('feedback-listen').style.color = "#1DD1A1";
  } else {
    document.getElementById('feedback-listen').innerText = "❌ Missed the sound! Keep listening.";
    document.getElementById('feedback-listen').style.color = "#FF6B6B";
  }
  document.getElementById('score-listen').innerText = listenScore;
  listenIdx++;
  setTimeout(loadListeningQuestion, 1200);
}


/* ========================================================
   3. SPEAKING GAME LOGIC (Syllables)
   ======================================================== */
const speakingQuestions = [
  { target: "🐶 DOG", correct: 1 },
  { target: "🐒 MONKEY", correct: 2 },
  { target: "🍌 BANANA", correct: 3 },
  { target: "🏠 HOUSE", correct: 1 },
  { target: "💻 COMPUTER", correct: 3 }
];
let speakIdx = 0, speakScore = 0;
let speakActive = false;

function startSpeakingGame() {
  speakIdx = 0; speakScore = 0; speakActive = true;
  document.getElementById('btn-start-speak').style.display = 'none';
  document.getElementById('score-speak').innerText = speakScore;
  loadSpeakingQuestion();
}

function loadSpeakingQuestion() {
  if (speakIdx >= speakingQuestions.length) {
    document.getElementById('target-speak').innerText = "🏆 CLEAR!";
    document.getElementById('feedback-speak').innerText = "Super Speaker! Speaking Medallion Earned!";
    document.getElementById('feedback-speak').style.color = "#A55EEA";
    document.getElementById('choices-speak').innerHTML = "";
    
    let startBtn = document.getElementById('btn-start-speak');
    startBtn.innerText = "Play Again ↺";
    startBtn.style.display = 'block';
    speakActive = false;
    return;
  }
  let q = speakingQuestions[speakIdx];
  document.getElementById('target-speak').innerText = q.target;
  document.getElementById('feedback-speak').innerText = "Count the syllable beats!";
  document.getElementById('feedback-speak').style.color = "#8A7B9F";
  
  let container = document.getElementById('choices-speak');
  container.innerHTML = `
    <button class="game-btn" onclick="submitSpeakAnswer(1)">1</button>
    <button class="game-btn" onclick="submitSpeakAnswer(2)">2</button>
    <button class="game-btn" onclick="submitSpeakAnswer(3)">3</button>
  `;
}

function submitSpeakAnswer(num) {
  if (!speakActive) return;
  if (num === speakingQuestions[speakIdx].correct) {
    speakScore++;
    document.getElementById('feedback-speak').innerText = "🎉 Great Cadence! Correct!";
    document.getElementById('feedback-speak').style.color = "#1DD1A1";
  } else {
    document.getElementById('feedback-speak').innerText = "❌ Incorrect syllable count.";
    document.getElementById('feedback-speak').style.color = "#FF6B6B";
  }
  document.getElementById('score-speak').innerText = speakScore;
  speakIdx++;
  setTimeout(loadSpeakingQuestion, 1200);
}


/* ========================================================
   4. READING GAME LOGIC (Noun Hunt Options)
   ======================================================== */
const readingQuestions = [
  { word: "🦅 EAGLE", isNoun: true },
  { word: "🏃 RUN", isNoun: false },
  { word: "🏫 SCHOOL", isNoun: true },
  { word: "✨ BRIGHT", isNoun: false },
  { word: "🎈 BALLOON", isNoun: true }
];
let readIdx = 0, readScore = 0;
let readActive = false;

function startReadingGame() {
  readIdx = 0; readScore = 0; readActive = true;
  document.getElementById('btn-start-read').style.display = 'none';
  document.getElementById('score-read').innerText = readScore;
  document.getElementById('choices-read').style.display = 'flex';
  loadReadingQuestion();
}

function loadReadingQuestion() {
  if (readIdx >= readingQuestions.length) {
    document.getElementById('target-read').innerText = "🏆 CLEAR!";
    document.getElementById('feedback-read').innerText = "Elite Hunter! Reading Medallion Earned!";
    document.getElementById('feedback-read').style.color = "#A55EEA";
    document.getElementById('choices-read').style.display = 'none';
    
    let startBtn = document.getElementById('btn-start-read');
    startBtn.innerText = "Play Again ↺";
    startBtn.style.display = 'block';
    readActive = false;
    return;
  }
  document.getElementById('target-read').innerText = readingQuestions[readIdx].word;
  document.getElementById('feedback-read').innerText = "Is it a naming word?";
  document.getElementById('feedback-read').style.color = "#8A7B9F";
}

function checkReadingAnswer(userGuess) {
  if (!readActive || readIdx >= readingQuestions.length) return;
  
  if (userGuess === readingQuestions[readIdx].isNoun) {
    readScore++;
    document.getElementById('feedback-read').innerText = "🎉 Sharp Eyes! Correct!";
    document.getElementById('feedback-read').style.color = "#1DD1A1";
  } else {
    document.getElementById('feedback-read').innerText = "❌ Not quite right!";
    document.getElementById('feedback-read').style.color = "#FF6B6B";
  }
  document.getElementById('score-read').innerText = readScore;
  readIdx++;
  setTimeout(loadReadingQuestion, 1200);
}


/* ========================================================
   5. WRITING GAME LOGIC (Plurals)
   ======================================================== */
const writingQuestions = [
  { singular: "🐱 CAT", choices: ["CATS", "CATTER", "CATSES"], correct: "CATS" },
  { singular: "📦 BOX", choices: ["BOXS", "BOXES", "BOXIES"], correct: "BOXES" },
  { singular: "👶 BABY", choices: ["BABYS", "BABIES", "BABYIES"], correct: "BABIES" },
  { singular: "🦷 TOOTH", choices: ["TOOTHS", "TEETH", "TEETHS"], correct: "TEETH" },
  { singular: "🚌 BUS", choices: ["BUSES", "BUSS", "BUSIS"], correct: "BUSES" }
];
let writeIdx = 0, writeScore = 0;
let writeActive = false;

function startWritingGame() {
  writeIdx = 0; writeScore = 0; writeActive = true;
  document.getElementById('btn-start-write').style.display = 'none';
  document.getElementById('score-write').innerText = writeScore;
  loadWritingQuestion();
}

function loadWritingQuestion() {
  if (writeIdx >= writingQuestions.length) {
    document.getElementById('target-write').innerText = "🏆 CLEAR!";
    document.getElementById('feedback-write').innerText = "Master Spellcaster! Writing Medallion Earned!";
    document.getElementById('feedback-write').style.color = "#A55EEA";
    document.getElementById('choices-write').innerHTML = "";
    
    let startBtn = document.getElementById('btn-start-write');
    startBtn.innerText = "Play Again ↺";
    startBtn.style.display = 'block';
    writeActive = false;
    return;
  }
  let q = writingQuestions[writeIdx];
  document.getElementById('target-write').innerText = q.singular;
  document.getElementById('feedback-write').innerText = "Make it plural!";
  document.getElementById('feedback-write').style.color = "#8A7B9F";
  
  let container = document.getElementById('choices-write');
  container.innerHTML = "";
  q.choices.forEach(choice => {
    container.innerHTML += `<button class="game-btn" onclick="submitWriteAnswer('${choice}')">${choice}</button>`;
  });
}

function submitWriteAnswer(selected) {
  if (!writeActive) return;
  if (selected === writingQuestions[writeIdx].correct) {
    writeScore++;
    document.getElementById('feedback-write').innerText = "🎉 Perfect Grammar! Correct!";
    document.getElementById('feedback-write').style.color = "#1DD1A1";
  } else {
    document.getElementById('feedback-write').innerText = "❌ Incorrect spelling!";
    document.getElementById('feedback-write').style.color = "#FF6B6B";
  }
  document.getElementById('score-write').innerText = writeScore;
  writeIdx++;
  setTimeout(loadWritingQuestion, 1200);
}


/* ========================================================
   6. BUBBLE LETTER SCRAMBLE LOGIC (Challenge Mode Section 1)
   ======================================================== */
const scrambleQuestions = [
  { word: "APPLE", scrambled: ["P", "A", "L", "E", "P"] },
  { word: "BIRD",  scrambled: ["R", "B", "D", "I"] },
  { word: "FROG",  scrambled: ["O", "G", "R", "F"] },
  { word: "SCHOOL",scrambled: ["O", "H", "C", "S", "L", "O"] },
  { word: "FISH",  scrambled: ["S", "I", "H", "F"] }
];

let activeAnswers = { 0: "", 1: "", 2: "", 3: "", 4: "" };

function initScrambleGame(idx) {
  const q = scrambleQuestions[idx];
  activeAnswers[idx] = ""; 
  
  const zone = document.getElementById(`scramble-zone-${idx}`);
  if (!zone) return;
  
  let html = `
    <div class="answer-bar" id="scramble-ans-${idx}">&nbsp;</div>
    <div class="bubble-container" id="bubble-cont-${idx}">
  `;
  
  q.scrambled.forEach((letter, letterIdx) => {
    html += `<button class="letter-bubble" id="bubble-${idx}-${letterIdx}" onclick="selectBubble(${idx}, ${letterIdx}, '${letter}')">${letter}</button>`;
  });
  
  html += `
    </div>
    <div style="display: flex; gap: 10px; margin-top: 15px;">
      <button class="game-btn btn-action-red" onclick="resetScrambleQuest(${idx})">Reset ↺</button>
      <button class="game-btn btn-action-green" onclick="checkScrambleAnswer(${idx})">Check ✓</button>
    </div>
    <p id="scramble-feedback-${idx}" style="margin-top: 10px; font-weight: bold; color: #8A7B9F;"></p>
  `;
  
  zone.innerHTML = html;
}

function selectBubble(gameIdx, letterIdx, letter) {
  const bubble = document.getElementById(`bubble-${gameIdx}-${letterIdx}`);
  if (!bubble || bubble.classList.contains('used')) return;
  
  bubble.classList.add('used');
  activeAnswers[gameIdx] += letter;
  
  document.getElementById(`scramble-ans-${gameIdx}`).innerText = activeAnswers[gameIdx];
  
  speakWord(letter);
}

function resetScrambleQuest(idx) {
  initScrambleGame(idx);
}

function checkScrambleAnswer(idx) {
  const q = scrambleQuestions[idx];
  const userAnswer = activeAnswers[idx];
  const feedback = document.getElementById(`scramble-feedback-${idx}`);
  
  if (userAnswer === q.word) {
    feedback.innerText = "🎉 Correct! Perfect Spelling! 🌟";
    feedback.style.color = "#1DD1A1";
    speakWord(q.word); 
  } else {
    feedback.innerText = "❌ Not quite right! Try again.";
    feedback.style.color = "#FF6B6B";
    if(userAnswer.length > 0) {
      speakWord(userAnswer);
    }
  }
}


/* ========================================================
   7. SOUND & VISION PHONICS LOGIC (Challenge Mode Section 2)
   ======================================================== */
const audioQuestions = [
  { 
    word: "DOG", 
    sentence: "Listen closely to the clip. Which phonics name matches this animal?",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80", 
    choices: ["DOG", "CAT", "PIG", "FOX"] 
  },
  { 
    word: "CAR", 
    sentence: "Listen to the horn and engine! Identify the correct naming word.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80", 
    choices: ["VAN", "CAR", "BUS", "JET"] 
  },
  { 
    word: "RUN", 
    sentence: "Hear the fast steps on the field! What action word is being shown?",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80", 
    choices: ["SIT", "RUN", "JUMP", "WALK"] 
  },
  { 
    word: "CAN", 
    sentence: "Listen to the speaker proclaim their power. Select the correct modal word!",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=400&q=80", 
    choices: ["CAN", "MUST", "WILL", "SHOULD"] 
  }, 
  { 
    word: "SUN", 
    sentence: "Listen to the outdoor nature sounds and choose the right vowel word.",
    image: "https://images.unsplash.com/photo-1506462947473-b3a1a9e34e5b?w=400&q=80", 
    choices: ["MOON", "STAR", "SUN", "RAIN"] 
  }
];

function speakSentence(sentenceText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    const speech = new SpeechSynthesisUtterance(sentenceText);
    speech.lang = 'en-US';
    speech.rate = 0.9; 
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, your browser does not support Text-to-Speech narration.");
  }
}

function speakWord(wordText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    const speech = new SpeechSynthesisUtterance(wordText);
    speech.lang = 'en-US';
    speech.rate = 0.8; 
    window.speechSynthesis.speak(speech);
  }
}

function initAudioGame(idx) {
  const q = audioQuestions[idx];
  const zone = document.getElementById(`audio-zone-${idx}`);
  if (!zone) return;
  
  let html = `
    <img src="${q.image}" alt="${q.word}" class="big-challenge-img">
    
    <button class="game-btn" onclick="speakSentence('${q.sentence}')" style="background: #A55EEA; color: white; width: 100%; font-size: 16px; margin-bottom: 15px;">
      🔊 Hear Sentence Instruction
    </button>
    
    <p style="font-size: 14px; color: #8A7B9F; margin-bottom: 8px; font-weight: bold;">Choose the correct word:</p>
    <div class="audio-letter-grid">
  `;
  
  q.choices.forEach(choice => {
    html += `<button class="game-btn" onclick="checkAudioAnswer(${idx}, '${choice}')">${choice}</button>`;
  });
  
  html += `
    </div>
    <p id="audio-feedback-${idx}" style="margin-top: 15px; font-weight: bold; color: #8A7B9F;"></p>
  `;
  
  zone.innerHTML = html;
}

function checkAudioAnswer(idx, selectedChoice) {
  const q = audioQuestions[idx];
  const feedback = document.getElementById(`audio-feedback-${idx}`);
  
  speakWord(selectedChoice);
  
  if (selectedChoice === q.word) {
    feedback.innerText = `🎉 Amazing! Correct! That is a ${q.word}! 🏅`;
    feedback.style.color = "#1DD1A1";
  } else {
    feedback.innerText = `❌ Oops! You selected ${selectedChoice}. Try listening again!`;
    feedback.style.color = "#FF6B6B";
  }
}


/* ========================================================
   8. VOICE RECOGNITION (Speaking Task for Kids)
   ======================================================== */
function startSpeakingTask(targetWord, elementId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Sorry, your browser does not support voice recognition. Please use Google Chrome or Microsoft Edge.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    const feedbackElement = document.getElementById(elementId);
    if (!feedbackElement) return;
    
    feedbackElement.innerText = "Listening... say: " + targetWord;

    recognition.onresult = function(event) {
        const spokenWord = event.results[0][0].transcript.trim().toLowerCase();
        const target = targetWord.toLowerCase();
        
        if (spokenWord.includes(target)) {
            feedbackElement.innerHTML = `You said: <b>${spokenWord}</b><br>🎉 Excellent! 100% Correct!`;
        } else {
            feedbackElement.innerHTML = `You said: <b>${spokenWord}</b><br>⚠️ Close! Try to say "${targetWord}" clearly.`;
        }
    };

    recognition.onerror = function() {
        feedbackElement.innerText = "I didn't hear you! Please try again.";
    };

    recognition.start();
}

/* ========================================================
   9. VOICE WORKSHOP LOGIC (Record & Playback)
   ======================================================== */
let mediaRecorders = {}; 
let audioChunksMap = {}; 

async function toggleRecording(idx) {
    const btnRecord = document.getElementById(`btn-record-${idx}`);
    const btnPlay = document.getElementById(`btn-play-${idx}`);
    const status = document.getElementById(`status-record-${idx}`);

    if (mediaRecorders[idx] && mediaRecorders[idx].state === "recording") {
        mediaRecorders[idx].stop();
        btnRecord.innerHTML = "🎤 Record";
        btnRecord.classList.remove('btn-active');
        status.innerText = "Recording saved!";
        btnPlay.disabled = false;
        return;
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorders[idx] = new MediaRecorder(stream);
        audioChunksMap[idx] = []; 

        mediaRecorders[idx].ondataavailable = (event) => {
            audioChunksMap[idx].push(event.data);
        };

        mediaRecorders[idx].start();
        btnRecord.innerHTML = "⏹️ Stop";
        btnRecord.classList.add('btn-active');
        status.innerText = "Recording... talk now!";
        btnPlay.disabled = true;
    } catch (err) {
        alert("Oops! Microphone access is blocked. Please check your browser permissions.");
        console.error("Microphone Error:", err);
    }
}

function playRecording(idx) {
    if (!audioChunksMap[idx] || audioChunksMap[idx].length === 0) return;
    
    const audioBlob = new Blob(audioChunksMap[idx], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

/* ========================================================
   10. READING MODULE LOGIC (Noun Hunt Sentences)
   ======================================================== */
const nounLevels = [
    { text: ["The", "cat", "is", "on", "the", "mat"], nouns: ["cat", "mat"] },
    { text: ["I", "saw", "a", "dog", "in", "the", "park"], nouns: ["dog", "park"] },
    { text: ["The", "bird", "sits", "on", "a", "tree"], nouns: ["bird", "tree"] },
    { text: ["Mom", "bakes", "a", "cake", "in", "the", "kitchen"], nouns: ["mom", "cake", "kitchen"] },
    { text: ["The", "boy", "plays", "with", "a", "ball"], nouns: ["boy", "ball"] }
];

let currentLevel = 0;
let clickedNouns = 0;

function loadNounHunt() {
    const container = document.getElementById('noun-hunt-container');
    const feedback = document.getElementById('read-feedback');
    const title = document.getElementById('level-title');
    const nextBtn = document.getElementById('btn-next');
    
    if (!container || !feedback || !title || !nextBtn) return;
    
    container.innerHTML = "";
    feedback.innerText = "Find the nouns!";
    title.innerText = "Level " + (currentLevel + 1);
    nextBtn.style.display = 'none';
    clickedNouns = 0;
    
    nounLevels[currentLevel].text.forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + " ";
        span.style.cursor = "pointer";
        span.style.padding = "5px 10px";
        span.style.borderRadius = "8px";
        
        span.onclick = () => {
            if (nounLevels[currentLevel].nouns.includes(word.toLowerCase())) {
                span.style.backgroundColor = "#1DD1A1";
                span.style.color = "white";
                span.onclick = null;
                clickedNouns++;
                
                if (clickedNouns === nounLevels[currentLevel].nouns.length) {
                    feedback.innerText = "🎉 Amazing! You found them all!";
                    nextBtn.style.display = 'block';
                }
            } else {
                span.style.backgroundColor = "#FF6B6B";
                setTimeout(() => span.style.backgroundColor = "transparent", 500);
            }
        };
        container.appendChild(span);
    });
}

function nextLevel() {
    currentLevel++;
    const gameZone = document.getElementById('game-zone');
    if (!gameZone) return;
    
    if (currentLevel < nounLevels.length) {
        loadNounHunt();
        
        const allBorderClasses = ['border-purple', 'border-pink', 'border-cyan', 'border-yellow', 'border-green'];
        gameZone.classList.remove(...allBorderClasses);
        const newColor = allBorderClasses[currentLevel % allBorderClasses.length];
        gameZone.classList.add(newColor);
        
    } else {
        gameZone.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>🏆 Reading Champion!</h2>
                <p>You finished all 5 levels!</p>
            </div>
        `;
    }
}

/* ========================================================
   11. WRITING MODULE (Canvas Trace)
   ======================================================== */  
function setupCanvas(canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    let painting = false;

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6C5CE7'; 

    const getCoordinates = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const start = (e) => {
        painting = true;
        const pos = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
        if (!painting) return;
        const pos = getCoordinates(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stop = () => { painting = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e); }, {passive: false});
    canvas.addEventListener('touchend', stop);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, {passive: false});
}

function changeColor(btn, color) {
    const parent = btn.closest('.listening-page-card');
    const canvas = parent.querySelector('.tracing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
}

function clearCanvas(btn) {
    const parent = btn.closest('.listening-page-card');
    const canvas = parent.querySelector('.tracing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ========================================================
   12. AUDIO CONTROLLER
   ======================================================== */
function playAudio(fullText) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    const speech = new SpeechSynthesisUtterance(fullText);
    speech.lang = 'en-US';
    speech.rate = 0.9; 
    speech.pitch = 1.0;
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, audio is not supported in this browser.");
  }
}

/* ========================================================
   13. SECTION 3 - CHALLENGE MORE SCRAMBLE GAME LOGIC
   ======================================================== */
const challenges = [
    { title: "Nature", words: ["CLOUDS", "RIVER", "TREES", "GRASS", "STARS"] },
    { title: "Animals", words: ["ZEBRA", "TIGER", "SHARK", "HORSE", "MOUSE"] },
    { title: "School", words: ["BOOKS", "PAPER", "CHAIR", "TABLE", "PENS"] }
];

function initChallengeArena() {
    const bubbleContainer = document.getElementById('bubble-section');
    if (!bubbleContainer) return;
    
    challenges.forEach((quest, qIndex) => {
        let card = document.createElement('div');
        card.className = "skill-card";
        card.innerHTML = `
            <h4>${quest.title}</h4>
            ${quest.words.map((word, i) => `
                <div class="game-row">
                    <span>${scramble(word)}</span>
                    <input type="text" id="q${qIndex}-i${i}" data-ans="${word}">
                </div>
            `).join('')}
            <button onclick="checkAnswers(${qIndex})">Check Answers</button>
            <div id="feedback-${qIndex}"></div>
        `;
        bubbleContainer.appendChild(card);
    });
}

function scramble(word) {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function checkAnswers(qIndex) {
    const inputs = document.querySelectorAll(`[id^="q${qIndex}-i"]`);
    let correct = 0;
    
    inputs.forEach(input => {
        if (input.value.toUpperCase() === input.getAttribute('data-ans')) {
            input.style.borderColor = "green";
            correct++;
        } else {
            input.style.borderColor = "red";
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    if (feedback) {
        feedback.innerText = correct === 5 ? "🎉 Perfect!" : `Got ${correct}/5 correct.`;
    }
}

/* ========================================================
   14. UNIFIED INITIALIZER (Auto-loads layout elements contextually)
   ======================================================== */
window.addEventListener('DOMContentLoaded', () => {
    // 1. Load Scramble & Phonics Challenges if matching elements exist
    for(let i = 0; i < 5; i++) {
        if(document.getElementById(`scramble-zone-${i}`)) {
            initScrambleGame(i);
        }
        if(document.getElementById(`audio-zone-${i}`)) {
            initAudioGame(i);
        }
    }

    // 2. Load Noun Hunt matching game parts
    if(document.getElementById('noun-hunt-container')) {
        loadNounHunt();
    }

    // 3. Setup drawing canvases safely
    const canvases = document.querySelectorAll('.tracing-canvas');
    canvases.forEach(canvas => setupCanvas(canvas));

    // 4. Initialize the Scramble challenge blocks arena
    if(document.getElementById('bubble-section')) {
        initChallengeArena();
    }
});