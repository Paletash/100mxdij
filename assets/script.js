// ===================== DATA =====================
const DEFAULT_CONFIG = {
  mainTitle: "2GM1 Dijeron",
  subTitle: "✦ Edición: Modelo Multifactorial de Liderazgo ✦",
  questions: [
    {
      q: "¿Cuáles son los tipos de liderazgo que incluye el Modelo FRLM de Bass?",
      answers: [
        { text: "Transformacional", pts: 45, keys: ["transformacional","transformador","transformacion"] },
        { text: "Transaccional", pts: 35, keys: ["transaccional","transaccion"] },
        { text: "Laissez-faire", pts: 20, keys: ["laissez","laissez-faire","laissez faire","pasivo","abstencionista"] }
      ]
    },
    {
      q: "¿En qué se basa el intercambio del líder transaccional con sus seguidores?",
      answers: [
        { text: "Recompensas", pts: 40, keys: ["recompensa","recompensas","premio","premios","incentivo","incentivos"] },
        { text: "Castigos", pts: 35, keys: ["castigo","castigos","sancion","sanciones","penalizacion"] },
        { text: "Cumplimiento de tareas", pts: 25, keys: ["tareas","tarea","cumplimiento","metas","objetivos"] }
      ]
    },
    {
      q: "¿Qué resultados psicológicos produce el liderazgo transformacional en los empleados?",
      answers: [
        { text: "Confianza", pts: 30, keys: ["confianza"] },
        { text: "Lealtad", pts: 25, keys: ["lealtad","leal"] },
        { text: "Compromiso", pts: 22, keys: ["compromiso","comprometido"] },
        { text: "Autoconfianza / Optimismo", pts: 13, keys: ["autoconfianza","auto confianza","optimismo","optimista","seguridad"] },
        { text: "Admiración y Respeto", pts: 10, keys: ["admiracion","admiro","respeto","respeto"] }
      ]
    },
    {
      q: "¿Qué necesidades satisface el liderazgo transformacional según la jerarquía de Maslow?",
      answers: [
        { text: "Autorrealización", pts: 40, keys: ["autorealizacion","autorrealización","autorealizacion","realizacion","realizacion personal"] },
        { text: "Logro personal", pts: 35, keys: ["logro","logros","alcanzar metas"] },
        { text: "Crecimiento personal", pts: 25, keys: ["crecimiento","crecimiento personal","desarrollo","superacion"] }
      ]
    },
    {
      q: "¿Cómo orienta el modelo transformacional a sus empleados?",
      answers: [
        { text: "Autonomía e innovación", pts: 38, keys: ["autonomia","innovacion","creatividad","autonomía","innovar"] },
        { text: "Compromiso colectivo / Visión compartida", pts: 35, keys: ["colectivo","vision colectiva","vision compartida","grupo","equipo","bien comun"] },
        { text: "Desarrollo personal / Mentoría", pts: 27, keys: ["desarrollo","mentoria","mentor","mentoring","coaching","coach","entrenador","individual"] }
      ]
    },
    {
      q: "¿En qué teoría se apoya el liderazgo transaccional?",
      answers: [
        { text: "Teoría del Refuerzo", pts: 50, keys: ["refuerzo","teoria del refuerzo","behaviorismo","conductismo"] },
        { text: "Administración Científica (Taylor)", pts: 50, keys: ["taylor","administracion cientifica","cientifico","frederick taylor","taylor"] }
      ]
    },
    {
      q: "¿Qué resultados de rendimiento genera el Modelo Multifactorial?",
      answers: [
        { text: "Rendimiento extraordinario", pts: 40, keys: ["extraordinario","excepcional","extraordinaria","rendimiento extraordinario","más allá","mas alla"] },
        { text: "Eficacia organizacional", pts: 35, keys: ["eficacia","eficiencia","organizacional","eficaz","productividad","productivo"] },
        { text: "Esfuerzo extra de los empleados", pts: 25, keys: ["esfuerzo","extra","esfuerzo extra","mayor esfuerzo","adicional"] }
      ]
    }
  ]
};

let gameConfig = JSON.parse(localStorage.getItem('mxDijeronConfig')) || DEFAULT_CONFIG;
let questions = gameConfig.questions;

// ===================== CONFIG LOGIC =====================
function toggleConfigModal() {
  const modal = document.getElementById('configModal');
  const isShow = modal.classList.toggle('show');
  
  if (isShow) {
    document.getElementById('configMainTitle').value = gameConfig.mainTitle;
    document.getElementById('configSubTitle').value = gameConfig.subTitle;
    document.getElementById('configQuestionsJSON').value = JSON.stringify(gameConfig.questions, null, 2);
    updateJSONCount();
  }
}

function updateJSONCount() {
  const badge = document.getElementById('questionsCountBadge');
  const textarea = document.getElementById('configQuestionsJSON');
  try {
    const parsed = JSON.parse(textarea.value);
    if (Array.isArray(parsed)) {
      badge.textContent = `(${parsed.length} preguntas detectadas)`;
      badge.style.color = "var(--gold)";
    } else {
      badge.textContent = "(Formato inválido)";
      badge.style.color = "var(--red)";
    }
  } catch (e) {
    badge.textContent = "(JSON incompleto/error)";
    badge.style.color = "var(--red)";
  }
}

function saveConfig() {
  try {
    const newQuestions = JSON.parse(document.getElementById('configQuestionsJSON').value);
    gameConfig.mainTitle = document.getElementById('configMainTitle').value.trim() || DEFAULT_CONFIG.mainTitle;
    gameConfig.subTitle = document.getElementById('configSubTitle').value.trim() || DEFAULT_CONFIG.subTitle;
    gameConfig.questions = newQuestions;
    
    localStorage.setItem('mxDijeronConfig', JSON.stringify(gameConfig));
    showToast("💾 ¡CAMBIOS GUARDADOS!");
    
    // Refresh UI and Restart
    setTimeout(() => location.reload(), 1000);
  } catch (e) {
    alert("❌ Error en el formato JSON. Revisa las comas y corchetes.");
  }
}

function resetToDefault() {
  if (confirm("¿Estás seguro de volver a las preguntas originales de liderazgo?")) {
    localStorage.removeItem('mxDijeronConfig');
    location.reload();
  }
}

function exportConfig() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameConfig, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `100mex_config_${gameConfig.mainTitle.replace(/\s+/g, '_')}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importConfig(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.questions && Array.isArray(imported.questions)) {
        gameConfig = imported;
        localStorage.setItem('mxDijeronConfig', JSON.stringify(gameConfig));
        location.reload();
      } else {
        alert("❌ El archivo no tiene el formato correcto.");
      }
    } catch (err) {
      alert("❌ Error al leer el archivo JSON.");
    }
  };
  reader.readAsText(file);
}

// Actualizar títulos al cargar
document.getElementById('displayMainTitle').textContent = gameConfig.mainTitle;
document.getElementById('displaySubTitle').textContent = gameConfig.subTitle;

// ===================== STATE =====================
let state = {};

function initState(t1, t2) {
  state = {
    teams: [t1, t2],
    scores: [0, 0],
    currentQ: 0,
    currentTeam: 0, // 0 or 1
    strikes: 0,
    stealPhase: false,
    revealed: [],
    roundPot: 0,
    totalQuestions: questions.length,
    answered: false
  };
}

// ===================== NORMALIZATION =====================
function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function checkAnswer(input) {
  const norm = normalize(input);
  const q = questions[state.currentQ];
  for (let i = 0; i < q.answers.length; i++) {
    if (state.revealed.includes(i)) continue;
    for (const key of q.answers[i].keys) {
      if (norm.includes(normalize(key)) || normalize(key).includes(norm) && norm.length > 3) {
        return i;
      }
    }
  }
  return -1;
}

// ===================== UI HELPERS =====================
function showToast(msg, wrong = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (wrong ? ' wrong' : '');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateScores() {
  document.getElementById('score1').textContent = state.scores[0];
  document.getElementById('score2').textContent = state.scores[1];
  // Active team highlight
  document.getElementById('scoreCard1').classList.toggle('active-team', state.currentTeam === 0 && !state.answered);
  document.getElementById('scoreCard2').classList.toggle('active-team', state.currentTeam === 1 && !state.answered);
}

function updateStrikes() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('x' + i).classList.toggle('active', i <= state.strikes);
  }
}

function renderBoard() {
  const q = questions[state.currentQ];
  const board = document.getElementById('answerBoard');
  board.innerHTML = '';
  let pot = 0;
  q.answers.forEach((ans, i) => {
    const revealed = state.revealed.includes(i);
    if (revealed) pot += ans.pts;
    const card = document.createElement('div');
    card.className = 'answer-card' + (revealed ? ' revealed' : '');
    card.innerHTML = `
      <div class="ans-num">${i + 1}</div>
      <div class="ans-text">${ans.text}</div>
      <div class="ans-dots">• • •</div>
      <div class="ans-pts">${ans.pts}</div>
    `;
    board.appendChild(card);
  });
  state.roundPot = pot;
  document.getElementById('potValue').textContent = pot;
  // Progress
  const pct = ((state.currentQ) / state.totalQuestions) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('qNumber').textContent = `PREGUNTA ${state.currentQ + 1} DE ${state.totalQuestions}`;
  document.getElementById('questionText').textContent = q.q;
}

function updateTurnIndicator() {
  const el = document.getElementById('turnIndicator');
  if (state.stealPhase) {
    el.textContent = `🔥 ${state.teams[state.currentTeam].toUpperCase()} – UNA OPORTUNIDAD PARA ROBAR`;
  } else {
    el.textContent = `▶ Turno de: ${state.teams[state.currentTeam].toUpperCase()}`;
  }
}

function allRevealed() {
  return state.revealed.length === questions[state.currentQ].answers.length;
}

// ===================== GAME LOGIC =====================
function startGame() {
  const t1 = document.getElementById('team1Name').value.trim() || 'Equipo 1';
  const t2 = document.getElementById('team2Name').value.trim() || 'Equipo 2';
  initState(t1, t2);

  document.getElementById('scoreLabel1').textContent = t1;
  document.getElementById('scoreLabel2').textContent = t2;
  document.getElementById('score1').textContent = 0;
  document.getElementById('score2').textContent = 0;

  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  loadQuestion();
}

function loadQuestion() {
  state.strikes = 0;
  state.revealed = [];
  state.stealPhase = false;
  state.answered = false;

  document.getElementById('stealBanner').classList.remove('visible');
  document.getElementById('nextBtn').classList.remove('visible');
  document.getElementById('inputArea').style.opacity = '1';
  document.getElementById('answerInput').disabled = false;
  document.getElementById('passBtn').disabled = false;

  updateStrikes();
  renderBoard();
  updateScores();
  updateTurnIndicator();
  document.getElementById('answerInput').value = '';
  document.getElementById('answerInput').focus();
}

function submitGuess() {
  const inp = document.getElementById('answerInput');
  const val = inp.value.trim();
  if (!val) return;

  const idx = checkAnswer(val);
  inp.value = '';

  if (idx >= 0) {
    // Correct!
    state.revealed.push(idx);
    renderBoard();
    const pts = questions[state.currentQ].answers[idx].pts;
    showToast(`✅ ¡CORRECTO! +${pts} pts`);

    if (allRevealed()) {
      // Give all points to current team
      const total = questions[state.currentQ].answers.reduce((s, a) => s + a.pts, 0);
      state.scores[state.currentTeam] += total;
      updateScores();
      setTimeout(endRound, 600);
    }
  } else {
    // Wrong
    if (!state.stealPhase) {
      state.strikes++;
      updateStrikes();
      showToast('❌ ¡No está en la lista!', true);
      document.getElementById('answerInput').closest('.input-area').classList.add('shake');
      setTimeout(() => document.getElementById('answerInput').closest('.input-area').classList.remove('shake'), 500);

      if (state.strikes >= 3) {
        triggerSteal();
      }
    } else {
      // Steal failed
      showToast('❌ ¡Robo fallido!', true);
      const otherTeam = 1 - state.currentTeam;
      state.scores[otherTeam] += state.roundPot;
      updateScores();
      setTimeout(endRound, 600);
    }
  }
  inp.focus();
}

function passTurn() {
  if (state.stealPhase) {
    // Passing steal = other team gets points
    const otherTeam = 1 - state.currentTeam;
    state.scores[otherTeam] += state.roundPot;
    updateScores();
    endRound();
    return;
  }
  // Switch turn between teams (before 3 strikes, teams alternate guesses if desired)
  // For simplicity: passing counts as a strike
  state.strikes++;
  updateStrikes();
  showToast('⏭ Turno pasado', true);
  if (state.strikes >= 3) {
    triggerSteal();
  } else {
    state.currentTeam = 1 - state.currentTeam;
    updateTurnIndicator();
    updateScores();
  }
}

function triggerSteal() {
  const stealTeam = 1 - state.currentTeam;
  state.currentTeam = stealTeam;
  state.stealPhase = true;
  document.getElementById('stealBanner').classList.add('visible');
  document.getElementById('stealTeamName').textContent = `${state.teams[stealTeam].toUpperCase()} tiene UNA oportunidad de robar`;
  document.getElementById('passBtn').textContent = 'PASAR ROBO';
  updateTurnIndicator();
  updateScores();
}

function endRound() {
  state.answered = true;
  // Reveal all remaining answers
  const q = questions[state.currentQ];
  q.answers.forEach((_, i) => {
    if (!state.revealed.includes(i)) state.revealed.push(i);
  });
  renderBoard();
  document.getElementById('inputArea').style.opacity = '0.4';
  document.getElementById('answerInput').disabled = true;
  document.getElementById('passBtn').disabled = true;
  document.getElementById('stealBanner').classList.remove('visible');
  updateScores();
  updateStrikes();

  if (state.currentQ + 1 >= state.totalQuestions) {
    document.getElementById('nextBtn').textContent = 'VER RESULTADOS FINALES 🏆';
  } else {
    document.getElementById('nextBtn').textContent = 'SIGUIENTE PREGUNTA ▶';
  }
  document.getElementById('nextBtn').classList.add('visible');
}

function nextQuestion() {
  state.currentQ++;
  if (state.currentQ >= state.totalQuestions) {
    showEndScreen();
    return;
  }
  // Alternate starting team each round
  state.currentTeam = state.currentQ % 2;
  loadQuestion();
}

// ===================== END SCREEN =====================
function showEndScreen() {
  const t1 = state.teams[0], t2 = state.teams[1];
  const s1 = state.scores[0], s2 = state.scores[1];
  document.getElementById('finalName1').textContent = t1;
  document.getElementById('finalName2').textContent = t2;
  document.getElementById('finalScore1').textContent = s1;
  document.getElementById('finalScore2').textContent = s2;

  let winner;
  if (s1 > s2) winner = `🎉 ¡${t1} GANA!`;
  else if (s2 > s1) winner = `🎉 ¡${t2} GANA!`;
  else winner = '🤝 ¡EMPATE!';

  document.getElementById('winnerName').textContent = winner;
  document.getElementById('endOverlay').classList.add('show');
  launchConfetti();
}

function restartGame() {
  document.getElementById('endOverlay').classList.remove('show');
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('setupScreen').classList.remove('hidden');
}

// ===================== CONFETTI =====================
function launchConfetti() {
  const colors = ['#7B1D46','#F5C842','#C0185E','#ffffff','#5a0f30','#f0a500'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (Math.random() * 10 + 6) + 'px';
    el.style.height = (Math.random() * 10 + 6) + 'px';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = (Math.random() * 1) + 's';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ===================== KEYBOARD =====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const nextBtn = document.getElementById('nextBtn');
    const inp = document.getElementById('answerInput');
    if (nextBtn.classList.contains('visible')) {
      nextQuestion();
    } else if (!inp.disabled) {
      submitGuess();
    }
  }
});
