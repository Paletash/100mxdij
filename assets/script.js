// ===================== DATA =====================
const DEFAULT_FAST_MONEY = [
  { q: "Di una característica clave de un buen líder.", answers: [{ text: "Empatía", pts: 35, keys: ["empatia", "empatico"] }, { text: "Visión", pts: 25, keys: ["vision"] }, { text: "Comunicación", pts: 20, keys: ["comunicacion", "hablar"] }] },
  { q: "Menciona un estilo de liderazgo.", answers: [{ text: "Transformacional", pts: 40, keys: ["transformacional"] }, { text: "Democrático", pts: 30, keys: ["democratico"] }, { text: "Transaccional", pts: 20, keys: ["transaccional"] }] },
  { q: "Nombra un incentivo laboral.", answers: [{ text: "Dinero/Bono", pts: 45, keys: ["dinero", "bono"] }, { text: "Reconocimiento", pts: 30, keys: ["reconocimiento"] }, { text: "Días libres", pts: 15, keys: ["dias libres", "vacaciones"] }] },
  { q: "Di una cualidad que genera confianza.", answers: [{ text: "Sinceridad", pts: 40, keys: ["sinceridad", "verdad"] }, { text: "Transparencia", pts: 30, keys: ["transparencia", "claro"] }, { text: "Lealtad", pts: 20, keys: ["lealtad", "fidelidad"] }] },
  { q: "¿Qué se necesita para innovar?", answers: [{ text: "Creatividad", pts: 50, keys: ["creatividad", "imaginacion"] }, { text: "Autonomía", pts: 30, keys: ["autonomia", "libertad"] }, { text: "Recursos", pts: 15, keys: ["recursos", "dinero"] }] }
];

const DEFAULT_CONFIG = {
  mainTitle: "2GM1 Dijeron",
  subTitle: "Edición: Modelo Multifactorial de Liderazgo",
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
  ],
  timeLimit: 20,
  fastMoney: DEFAULT_FAST_MONEY,
  colors: {
    gold: "#F5C842",
    red: "#D62828",
    green: "#2D6A4F",
    dark: "#0f050a",
    accent: "#C0185E"
  }
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
    document.getElementById('configTimeLimit').value = gameConfig.timeLimit !== undefined ? gameConfig.timeLimit : 20;
    
    if (!gameConfig.fastMoney) gameConfig.fastMoney = DEFAULT_FAST_MONEY;
    const configFmJSON = document.getElementById('configFmQuestionsJSON');
    if (configFmJSON) configFmJSON.value = JSON.stringify(gameConfig.fastMoney, null, 2);
    
    // Set colors in inputs
    const colors = gameConfig.colors || DEFAULT_CONFIG.colors;
    document.getElementById('configColorGold').value = colors.gold;
    document.getElementById('configColorDark').value = colors.dark;
    document.getElementById('configColorAccent').value = colors.accent;
    document.getElementById('configColorRed').value = colors.red;
    document.getElementById('configColorGreen').value = colors.green;

    updateJSONCount();
    lucide.createIcons();
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

  const fmBadge = document.getElementById('fmQuestionsCountBadge');
  const fmTextarea = document.getElementById('configFmQuestionsJSON');
  if (fmBadge && fmTextarea) {
    try {
      const parsedFm = JSON.parse(fmTextarea.value);
      if (Array.isArray(parsedFm)) {
        fmBadge.textContent = `(${parsedFm.length} preguntas detectadas)`;
        fmBadge.style.color = "var(--gold)";
      } else {
        fmBadge.textContent = "(Formato inválido)";
        fmBadge.style.color = "var(--red)";
      }
    } catch (e) {
      fmBadge.textContent = "(JSON incompleto/error)";
      fmBadge.style.color = "var(--red)";
    }
  }
}

function saveConfig() {
  try {
    const newQuestions = JSON.parse(document.getElementById('configQuestionsJSON').value);
    let newFmQuestions = DEFAULT_FAST_MONEY;
    const fmTextarea = document.getElementById('configFmQuestionsJSON');
    if (fmTextarea) {
      newFmQuestions = JSON.parse(fmTextarea.value);
    }
    
    // Validar estructura JSON
    if (!Array.isArray(newQuestions) || !Array.isArray(newFmQuestions)) {
      throw new Error('Las preguntas deben ser un array');
    }
    
    // Crear configuración temporal
    const tempConfig = {
      mainTitle: document.getElementById('configMainTitle').value.trim() || DEFAULT_CONFIG.mainTitle,
      subTitle: document.getElementById('configSubTitle').value.trim() || DEFAULT_CONFIG.subTitle,
      timeLimit: parseInt(document.getElementById('configTimeLimit').value) || 0,
      questions: newQuestions,
      fastMoney: newFmQuestions,
      colors: {
        gold: document.getElementById('configColorGold').value,
        dark: document.getElementById('configColorDark').value,
        accent: document.getElementById('configColorAccent').value,
        red: document.getElementById('configColorRed').value,
        green: document.getElementById('configColorGreen').value
      }
    };
    
    // Validar configuración completa
    const validation = validateConfig(tempConfig);
    if (!validation.isValid) {
      const errorMsg = validation.errors.join('\n');
      logDebug('error', 'Validación fallida', validation.errors);
      alert('❌ ERRORES EN LA CONFIGURACIÓN:\n\n' + errorMsg);
      return;
    }
    
    // Guardar configuración validada
    gameConfig = tempConfig;
    localStorage.setItem('mxDijeronConfig', JSON.stringify(gameConfig));
    logDebug('validation', 'Configuración guardada exitosamente', { 
      questionsCount: newQuestions.length 
    });
    showToast("<i data-lucide='save' style='margin-right:10px'></i> ¡CAMBIOS GUARDADOS!");
    
    // Reiniciar después de guardar
    setTimeout(() => location.reload(), 1000);
  } catch (e) {
    logDebug('error', 'Error al guardar configuración', { error: e.message });
    alert("❌ Error en el formato JSON.\n\n" + e.message + "\n\nRevisa las comas, corchetes y comillas.");
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
      
      // Validar estructura mínima
      if (!imported.questions || !Array.isArray(imported.questions)) {
        throw new Error('El archivo no contiene un array "questions"');
      }
      
      // Validar configuración completa
      const validation = validateConfig(imported);
      if (!validation.isValid) {
        const errorMsg = validation.errors.join('\n');
        logDebug('error', 'Validación fallida al importar', validation.errors);
        alert("❌ ERRORES EN LA CONFIGURACIÓN IMPORTADA:\n\n" + errorMsg);
        return;
      }
      
      // Importar configuración validada
      gameConfig = imported;
      localStorage.setItem('mxDijeronConfig', JSON.stringify(gameConfig));
      logDebug('validation', 'Configuración importada exitosamente', { 
        questionsCount: imported.questions.length,
        fileName: file.name
      });
      showToast(`<i data-lucide='check-circle' style='margin-right:10px'></i> ¡${imported.questions.length} preguntas importadas!`);
      
      setTimeout(() => location.reload(), 1000);
    } catch (err) {
      logDebug('error', 'Error al importar configuración', { error: err.message });
      alert("❌ Error al leer el archivo JSON.\n\nDetalles: " + err.message);
    }
  };
  reader.readAsText(file);
}

// Migrar subtítulos antiguos que tengan HTML
if (gameConfig.subTitle && gameConfig.subTitle.includes('<')) {
  gameConfig.subTitle = gameConfig.subTitle.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  localStorage.setItem('mxDijeronConfig', JSON.stringify(gameConfig));
}

// Actualizar títulos al cargar
document.getElementById('displayMainTitle').textContent = gameConfig.mainTitle;
document.getElementById('displaySubTitle').innerHTML = `<i data-lucide="sparkles" class="decoration"></i> ${gameConfig.subTitle} <i data-lucide="sparkles" class="decoration"></i>`;

// Aplicar colores
function applyColors() {
  const colors = gameConfig.colors || DEFAULT_CONFIG.colors;
  const root = document.documentElement;
  root.style.setProperty('--gold', colors.gold);
  root.style.setProperty('--dark', colors.dark);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--red', colors.red);
  root.style.setProperty('--green', colors.green);
}
applyColors();

lucide.createIcons();

// ===================== AUDIO MANAGER =====================
const AudioManager = {
  ctx: null,
  isMuted: true,

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    const btn = document.getElementById('muteBtn');
    if (this.isMuted) {
      btn.innerHTML = '<i data-lucide="volume-x"></i>';
    } else {
      btn.innerHTML = '<i data-lucide="volume-2"></i>';
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    lucide.createIcons({ root: btn });
  },

  playTone(freq, type, duration, vol = 0.1) {
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  playDing() {
    if (this.isMuted) return;
    this.playTone(880, 'sine', 0.2, 0.3); // A5
    setTimeout(() => this.playTone(1108.73, 'sine', 0.4, 0.3), 150); // C#6
  },

  playBuzzer() {
    if (this.isMuted) return;
    this.playTone(150, 'sawtooth', 0.6, 0.3);
    this.playTone(160, 'square', 0.6, 0.2);
  },

  playWin() {
    if (this.isMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.3), i * 150);
      setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.2), i * 150);
    });
    setTimeout(() => {
      this.playTone(261.63, 'sine', 1.0, 0.2);
      this.playTone(329.63, 'sine', 1.0, 0.2);
      this.playTone(392.00, 'sine', 1.0, 0.2);
      this.playTone(523.25, 'sine', 1.0, 0.2);
    }, notes.length * 150);
  }
};

// ===================== TIMER MANAGER =====================
const TimerManager = {
  interval: null,
  timeLeft: 0,
  isActive: false,

  start() {
    this.stop();
    const limit = gameConfig.timeLimit !== undefined ? parseInt(gameConfig.timeLimit) : 20;
    if (limit <= 0) {
      document.getElementById('timerDisplay').style.display = 'none';
      return;
    }
    
    this.timeLeft = limit;
    this.isActive = true;
    this.updateUI();
    document.getElementById('timerDisplay').style.display = 'block';

    this.interval = setInterval(() => {
      if (state.answered || state.stealPhase) {
        this.stop();
        return;
      }
      this.timeLeft--;
      this.updateUI();
      
      if (this.timeLeft <= 5 && this.timeLeft > 0) {
        AudioManager.playTone(400, 'square', 0.1, 0.1);
      }

      if (this.timeLeft <= 0) {
        this.timeout();
      }
    }, 1000);
  },

  stop() {
    this.isActive = false;
    clearInterval(this.interval);
    const display = document.getElementById('timerDisplay');
    if (display) display.classList.remove('danger');
  },

  updateUI() {
    const display = document.getElementById('timerDisplay');
    if (!display) return;
    display.textContent = this.timeLeft;
    if (this.timeLeft <= 5 && this.timeLeft > 0) {
      display.classList.add('danger');
    } else {
      display.classList.remove('danger');
    }
  },

  timeout() {
    this.stop();
    AudioManager.playBuzzer();
    if (!state.stealPhase) {
      state.addStrike();
      updateStrikes();
      showToast('<i data-lucide="clock" style="margin-right:10px"></i> ¡TIEMPO AGOTADO!', true);
      
      if (state.strikes >= 3) {
        triggerSteal();
      } else {
        state.switchTurn();
        updateTurnIndicator();
        updateScores();
        setTimeout(() => { if (!state.stealPhase && !state.answered) this.start(); }, 1500);
      }
    }
  }
};

// ===================== STATE MANAGEMENT =====================
class GameState {
  constructor() {
    this.teams = ['Equipo 1', 'Equipo 2'];
    this.scores = [0, 0];
    this.currentQ = 0;
    this.currentTeam = 0;
    this.strikes = 0;
    this.stealPhase = false;
    this.revealed = [];
    this.roundPot = 0;
    this.totalQuestions = 0;
    this.answered = false;
    this.keysNormalized = false;
    this.teamStats = [
      { correct: 0, strikes: 0, stealAttempts: 0, stealSuccess: 0 },
      { correct: 0, strikes: 0, stealAttempts: 0, stealSuccess: 0 }
    ];
  }

  initGame(t1, t2, totalQ) {
    this.teams = [t1, t2];
    this.scores = [0, 0];
    this.currentQ = 0;
    this.totalQuestions = totalQ;
    this.teamStats = [
      { correct: 0, strikes: 0, stealAttempts: 0, stealSuccess: 0 },
      { correct: 0, strikes: 0, stealAttempts: 0, stealSuccess: 0 }
    ];
    
    if (!this.keysNormalized) {
      questions.forEach(q => {
        q.answers.forEach(a => {
          if (!a.normKeys) a.normKeys = a.keys.map(k => normalize(k));
        });
      });
      this.keysNormalized = true;
    }
  }

  resetRound() {
    this.strikes = 0;
    this.revealed = [];
    this.stealPhase = false;
    this.answered = false;
  }

  addScore(teamIndex, points) {
    this.scores[teamIndex] += points;
  }

  addStrike() {
    this.strikes++;
    this.teamStats[this.currentTeam].strikes++;
  }

  reveal(idx, isCorrectGuess = false) {
    if (!this.revealed.includes(idx)) {
      this.revealed.push(idx);
      if (isCorrectGuess) {
        this.teamStats[this.currentTeam].correct++;
        if (this.stealPhase) {
          this.teamStats[this.currentTeam].stealSuccess++;
        }
      }
    }
  }

  startStealPhase() {
    this.stealPhase = true;
    this.currentTeam = 1 - this.currentTeam;
    this.teamStats[this.currentTeam].stealAttempts++;
  }

  switchTurn() {
    this.currentTeam = 1 - this.currentTeam;
  }

  markAnswered() {
    this.answered = true;
  }

  setPot(value) {
    this.roundPot = value;
  }

  isAllRevealed(totalAnswers) {
    return this.revealed.length === totalAnswers;
  }

  advanceQuestion() {
    this.currentQ++;
    this.currentTeam = this.currentQ % 2;
  }
}

const state = new GameState();

// ===================== NORMALIZATION =====================
/**
 * Normaliza completamente una cadena de texto para comparación
 * @param {string} str - Texto a normalizar
 * @returns {string} Texto normalizado
 * 
 * Proceso de normalización:
 * 1. Convierte a minúsculas
 * 2. Elimina acentos y diacríticos
 * 3. Elimina caracteres especiales (mantiene letras, números y espacios)
 * 4. Reduce espacios múltiples a uno solo
 * 5. Elimina espacios al inicio y final
 */
function normalize(str) {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .toLowerCase()                                    // Minúsculas
    .normalize('NFD')                               // Descompone acentos (é -> e + ´)
    .replace(/[\u0300-\u036f]/g, '')               // Elimina marcas diacríticas
    .replace(/[^\w\s]/g, '')                       // Elimina caracteres especiales (mantiene alfanuméricos y espacios)
    .replace(/\s+/g, ' ')                          // Reduce espacios múltiples a uno
    .trim();                                        // Elimina espacios inicio/fin
}

/**
 * Calcula la similitud entre dos palabras normalizadas
 * @param {string} normInput - Entrada del usuario normalizada
 * @param {string} normKey - Palabra clave de la respuesta normalizada
 * @returns {number} Nivel de similitud (0-100)
 */
function calculateSimilarity(normInput, normKey) {
  // Coincidencia exacta
  if (normInput === normKey) return 100;
  
  // Coincidencia parcial (el input contiene la palabra clave)
  if (normInput.includes(normKey) && normKey.length >= 4) return 85;
  
  // Coincidencia parcial (la palabra clave contiene el input)
  if (normKey.includes(normInput) && normInput.length >= 4) return 75;
  
  // No hay coincidencia
  return 0;
}

/**
 * Verifica si la respuesta del usuario es correcta
 * @param {string} input - Respuesta ingresada por el usuario
 * @returns {number} Índice de la respuesta correcta, o -1 si no hay coincidencia
 */
function checkAnswer(input) {
  const normInput = normalize(input);
  
  // Validación de entrada
  if (!normInput || normInput.length < 2) {
    return -1;
  }
  
  const q = questions[state.currentQ];
  
  // Buscar coincidencia en respuestas no reveladas
  for (let i = 0; i < q.answers.length; i++) {
    if (state.revealed.includes(i)) continue;
    
    // Buscar en todas las palabras clave normalizadas de esta respuesta
    for (const normKey of q.answers[i].normKeys) {
      const similarity = calculateSimilarity(normInput, normKey);
      
      // Retorna el índice si encuentra una coincidencia válida
      if (similarity >= 75) {
        return i;
      }
    }
  }
  
  return -1;
}

// ===================== VALIDATION & DEBUG =====================
/**
 * Valida la estructura de una pregunta
 * @param {object} question - Objeto pregunta a validar
 * @returns {object} { isValid: boolean, errors: array }
 */
function validateQuestion(question) {
  const errors = [];
  
  if (!question.q || typeof question.q !== 'string' || question.q.trim().length === 0) {
    errors.push('❌ Pregunta vacía o inválida');
  }
  
  if (!Array.isArray(question.answers) || question.answers.length === 0) {
    errors.push('❌ Sin respuestas definidas');
  }
  
  question.answers?.forEach((ans, idx) => {
    if (!ans.text || typeof ans.text !== 'string') {
      errors.push(`❌ Respuesta ${idx + 1}: texto vacío`);
    }
    if (typeof ans.pts !== 'number' || ans.pts <= 0) {
      errors.push(`❌ Respuesta ${idx + 1}: puntos inválidos`);
    }
    if (!Array.isArray(ans.keys) || ans.keys.length === 0) {
      errors.push(`❌ Respuesta ${idx + 1}: sin palabras clave`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Valida toda la configuración del juego
 * @param {object} config - Configuración a validar
 * @returns {object} { isValid: boolean, errors: array }
 */
function validateConfig(config) {
  const errors = [];
  
  if (!config.mainTitle || config.mainTitle.trim().length === 0) {
    errors.push('❌ Título principal vacío');
  }
  
  if (!Array.isArray(config.questions) || config.questions.length === 0) {
    errors.push('❌ Sin preguntas en la configuración');
  }
  
  config.questions?.forEach((q, idx) => {
    const validation = validateQuestion(q);
    if (!validation.isValid) {
      validation.errors.forEach(err => {
        errors.push(`Pregunta ${idx + 1}: ${err}`);
      });
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Genera un reporte de normalización para debugging
 * @param {string} userInput - Entrada del usuario
 * @param {array} keywords - Palabras clave a comparar
 * @returns {object} Reporte detallado
 */
function getNormalizationReport(userInput, keywords) {
  const normalizedInput = normalize(userInput);
  const report = {
    originalInput: userInput,
    normalizedInput: normalizedInput,
    keywords: keywords.map(kw => ({
      original: kw,
      normalized: normalize(kw),
      similarity: calculateSimilarity(normalizedInput, normalize(kw))
    }))
  };
  
  return report;
}

/**
 * Registra información de debug en la consola
 * @param {string} type - Tipo de log ('answer', 'error', 'validation', etc.)
 * @param {string} message - Mensaje
 * @param {object} data - Datos adicionales
 */
function logDebug(type, message, data = {}) {
  const timestamp = new Date().toLocaleTimeString();
  const style = {
    answer: 'color: #2D6A4F; font-weight: bold;',
    error: 'color: #D62828; font-weight: bold;',
    validation: 'color: #F5C842; font-weight: bold;',
    info: 'color: #C0185E; font-weight: bold;'
  };
  
  console.log(
    `%c[${timestamp}] ${type.toUpperCase()}: ${message}`,
    style[type] || style.info,
    data
  );
}

// ===================== UI HELPERS =====================
function showToast(msg, wrong = false) {
  const toast = document.getElementById('toast');
  toast.innerHTML = msg;
  toast.className = 'toast' + (wrong ? ' wrong' : '');
  toast.classList.add('show');
  lucide.createIcons({ root: toast });
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
  // Optimización: No llamamos lucide.createIcons() aquí porque los íconos ya existen en el DOM
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
  state.setPot(pot);
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
    el.innerHTML = `<i data-lucide='zap'></i> ${state.teams[state.currentTeam].toUpperCase()} – UNA OPORTUNIDAD PARA ROBAR`;
  } else {
    el.innerHTML = `<i data-lucide='play'></i> Turno de: ${state.teams[state.currentTeam].toUpperCase()}`;
  }
  lucide.createIcons({ root: el });
}

// Función allRevealed eliminada, ahora se usa state.isAllRevealed()

// ===================== GAME LOGIC =====================
function startGame() {
  const validation = validateConfig(gameConfig);
  if (!validation.isValid) {
    const errorMsg = validation.errors.join('\n');
    logDebug('error', 'Validación fallida al iniciar juego', validation.errors);
    alert('❌ ERRORES EN LA CONFIGURACIÓN:\nNo se puede iniciar el juego. Por favor revisa la configuración.\n\n' + errorMsg);
    // Open config modal if not already open
    const modal = document.getElementById('configModal');
    if (!modal.classList.contains('show')) {
      toggleConfigModal();
    }
    return;
  }

  const t1 = document.getElementById('team1Name').value.trim() || 'Equipo 1';
  const t2 = document.getElementById('team2Name').value.trim() || 'Equipo 2';
  state.initGame(t1, t2, questions.length);

  document.getElementById('scoreLabel1').textContent = t1;
  document.getElementById('scoreLabel2').textContent = t2;
  document.getElementById('score1').textContent = 0;
  document.getElementById('score2').textContent = 0;

  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  loadQuestion();
}

function loadQuestion() {
  state.resetRound();

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
  TimerManager.start();
}

function submitGuess() {
  const inp = document.getElementById('answerInput');
  const val = inp.value.trim();
  
  if (!val) return;

  const idx = checkAnswer(val);
  
  // Log de debugging
  if (idx >= 0) {
    const answerText = questions[state.currentQ].answers[idx].text;
    logDebug('answer', 'Respuesta correcta', {
      userInput: val,
      matchedAnswer: answerText,
      points: questions[state.currentQ].answers[idx].pts
    });
  } else {
    const report = getNormalizationReport(val, questions[state.currentQ].answers.flatMap(a => a.keys));
    logDebug('error', 'Respuesta rechazada', { report });
  }
  
  inp.value = '';
  TimerManager.start();

  if (idx >= 0) {
    AudioManager.playDing();
    // Correct!
    state.reveal(idx, true);
    renderBoard();
    const pts = questions[state.currentQ].answers[idx].pts;
    showToast(`<i data-lucide='check-circle' style='margin-right:10px'></i> ¡CORRECTO! +${pts} pts`);

    if (state.isAllRevealed(questions[state.currentQ].answers.length)) {
      // Give all points to current team
      const total = questions[state.currentQ].answers.reduce((s, a) => s + a.pts, 0);
      state.addScore(state.currentTeam, total);
      updateScores();
      setTimeout(endRound, 600);
    }
  } else {
    AudioManager.playBuzzer();
    // Wrong
    if (!state.stealPhase) {
      state.addStrike();
      updateStrikes();
      showToast('<i data-lucide="alert-circle" style="margin-right:10px"></i> ¡No está en la lista!', true);
      document.getElementById('answerInput').closest('.input-area').classList.add('shake');
      setTimeout(() => document.getElementById('answerInput').closest('.input-area').classList.remove('shake'), 500);

      if (state.strikes >= 3) {
        triggerSteal();
      }
    } else {
      // Steal failed
      showToast('<i data-lucide="x-circle" style="margin-right:10px"></i> ¡Robo fallido!', true);
      const otherTeam = 1 - state.currentTeam;
      state.addScore(otherTeam, state.roundPot);
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
    state.addScore(otherTeam, state.roundPot);
    updateScores();
    endRound();
    return;
  }
  // Switch turn between teams (before 3 strikes, teams alternate guesses if desired)
  // For simplicity: passing counts as a strike
  state.addStrike();
  updateStrikes();
  showToast('<i data-lucide="skip-forward" style="margin-right:10px"></i> Turno pasado', true);
  if (state.strikes >= 3) {
    triggerSteal();
  } else {
    state.switchTurn();
    updateTurnIndicator();
    updateScores();
    TimerManager.start();
  }
}

function triggerSteal() {
  TimerManager.stop();
  state.startStealPhase();
  document.getElementById('stealBanner').classList.add('visible');
  document.getElementById('stealTeamName').textContent = `${state.teams[state.currentTeam].toUpperCase()} tiene UNA oportunidad de robar`;
  document.getElementById('passBtn').textContent = 'PASAR ROBO';
  updateTurnIndicator();
  updateScores();
}

function endRound() {
  TimerManager.stop();
  state.markAnswered();
  // Reveal all remaining answers
  const q = questions[state.currentQ];
  q.answers.forEach((_, i) => {
    state.reveal(i);
  });
  renderBoard();
  document.getElementById('inputArea').style.opacity = '0.4';
  document.getElementById('answerInput').disabled = true;
  document.getElementById('passBtn').disabled = true;
  document.getElementById('stealBanner').classList.remove('visible');
  updateScores();
  updateStrikes();

  if (state.currentQ + 1 >= state.totalQuestions) {
    document.getElementById('nextBtn').innerHTML = 'VER RESULTADOS FINALES <i data-lucide="trophy"></i>';
  } else {
    document.getElementById('nextBtn').innerHTML = 'SIGUIENTE PREGUNTA <i data-lucide="arrow-right"></i>';
  }
  document.getElementById('nextBtn').classList.add('visible');
  lucide.createIcons({ root: document.getElementById('nextBtn') });
}

function nextQuestion() {
  state.advanceQuestion();
  if (state.currentQ >= state.totalQuestions) {
    showEndScreen();
    return;
  }
  // Alternate starting team each round handled by state
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

  // Actualizar estadísticas de rendimiento
  document.getElementById('statsCorrect1').textContent = state.teamStats[0].correct;
  document.getElementById('statsCorrect2').textContent = state.teamStats[1].correct;
  document.getElementById('statsStrikes1').textContent = state.teamStats[0].strikes;
  document.getElementById('statsStrikes2').textContent = state.teamStats[1].strikes;
  document.getElementById('statsSteals1').textContent = `${state.teamStats[0].stealSuccess} / ${state.teamStats[0].stealAttempts}`;
  document.getElementById('statsSteals2').textContent = `${state.teamStats[1].stealSuccess} / ${state.teamStats[1].stealAttempts}`;

  let winner;
  if (s1 > s2) winner = `<i data-lucide="party-popper"></i> ¡${t1} GANA!`;
  else if (s2 > s1) winner = `<i data-lucide="party-popper"></i> ¡${t2} GANA!`;
  else winner = '<i data-lucide="handshake"></i> ¡EMPATE!';

  document.getElementById('winnerName').innerHTML = winner;
  document.getElementById('endOverlay').classList.add('show');
  lucide.createIcons({ root: document.getElementById('winnerName') });
  AudioManager.playWin();
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
  const fragment = document.createDocumentFragment();
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
    fragment.appendChild(el);
  }
  document.body.appendChild(fragment);
  setTimeout(() => {
    document.querySelectorAll('.confetti-piece').forEach(el => el.remove());
  }, 5000);
}

// ===================== KEYBOARD =====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const fmScreen = document.getElementById('fastMoneyScreen');
    if (fmScreen && !fmScreen.classList.contains('hidden')) {
      const fmInp = document.getElementById('fmAnswerInput');
      if (!fmInp.disabled) fmSubmitAnswer();
      return;
    }

    const nextBtn = document.getElementById('nextBtn');
    const inp = document.getElementById('answerInput');
    if (nextBtn && nextBtn.classList.contains('visible')) {
      nextQuestion();
    } else if (inp && !inp.disabled) {
      submitGuess();
    }
  }
});

// ===================== FAST MONEY LOGIC =====================
const fmState = {
  player: 1, // 1 or 2
  qIndex: 0,
  timerInterval: null,
  timeLeft: 20,
  totalPts: 0,
  phase: 'idle', // idle, input, reveal
  questions: gameConfig.fastMoney || DEFAULT_FAST_MONEY,
  answers: [
    { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 },
    { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 },
    { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 },
    { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 },
    { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 }
  ]
};

function startFastMoneyMode() {
  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('endOverlay').classList.remove('show');
  document.getElementById('fastMoneyScreen').classList.remove('hidden');
  
  // Reset state
  fmState.player = 1;
  fmState.qIndex = 0;
  fmState.totalPts = 0;
  fmState.phase = 'idle';
  for (let i=0; i<5; i++) {
    fmState.answers[i] = { p1Text: "", p1Pts: 0, p2Text: "", p2Pts: 0 };
    document.getElementById(`fm1-a${i}`).textContent = "";
    document.getElementById(`fm1-p${i}`).textContent = "";
    document.getElementById(`fm2-a${i}`).textContent = "";
    document.getElementById(`fm2-p${i}`).textContent = "";
  }
  document.getElementById('fmTotalPts').textContent = "0";
  document.getElementById('fmTimerDisplay').textContent = "20";
  document.getElementById('fmQuestionDisplay').textContent = "¿Listos para el Jugador 1?";
  document.getElementById('fmStartBtn').style.display = 'inline-block';
  document.getElementById('fmRevealBtn').style.display = 'none';
  document.getElementById('fmAnswerInput').disabled = true;
}

function fmStartRound() {
  fmState.phase = 'input';
  fmState.qIndex = 0;
  fmState.timeLeft = fmState.player === 1 ? 20 : 25;
  document.getElementById('fmTimerDisplay').textContent = fmState.timeLeft;
  document.getElementById('fmStartBtn').style.display = 'none';
  document.getElementById('fmAnswerInput').disabled = false;
  document.getElementById('fmAnswerInput').focus();
  
  fmShowQuestion();
  
  clearInterval(fmState.timerInterval);
  fmState.timerInterval = setInterval(() => {
    fmState.timeLeft--;
    document.getElementById('fmTimerDisplay').textContent = fmState.timeLeft;
    
    if (fmState.timeLeft <= 5 && fmState.timeLeft > 0) {
      AudioManager.playTone(400, 'square', 0.1, 0.1);
    }
    
    if (fmState.timeLeft <= 0) {
      fmTimeUp();
    }
  }, 1000);
}

function fmShowQuestion() {
  if (fmState.qIndex >= 5) {
    fmEndInput();
    return;
  }
  document.getElementById('fmQuestionDisplay').textContent = fmState.questions[fmState.qIndex].q;
  document.getElementById('fmAnswerInput').value = "";
}

function fmSubmitAnswer() {
  if (fmState.phase !== 'input') return;
  const val = document.getElementById('fmAnswerInput').value.trim();
  if (!val) return;
  
  if (fmState.player === 2) {
    const p1AnswerNorm = normalize(fmState.answers[fmState.qIndex].p1Text);
    const p2AnswerNorm = normalize(val);
    if (p1AnswerNorm !== "paso" && calculateSimilarity(p1AnswerNorm, p2AnswerNorm) >= 80) {
      AudioManager.playBuzzer();
      showToast("¡Respuesta repetida!", true);
      document.getElementById('fmAnswerInput').value = "";
      return;
    }
  }
  
  if (fmState.player === 1) fmState.answers[fmState.qIndex].p1Text = val;
  else fmState.answers[fmState.qIndex].p2Text = val;
  
  const cell = document.getElementById(`fm${fmState.player}-a${fmState.qIndex}`);
  cell.textContent = val.toUpperCase();
  AudioManager.playDing();
  
  fmState.qIndex++;
  fmShowQuestion();
}

function fmPassQuestion() {
  if (fmState.phase !== 'input') return;
  if (fmState.player === 1) fmState.answers[fmState.qIndex].p1Text = "PASO";
  else fmState.answers[fmState.qIndex].p2Text = "PASO";
  
  const cell = document.getElementById(`fm${fmState.player}-a${fmState.qIndex}`);
  cell.textContent = "PASO";
  
  fmState.qIndex++;
  fmShowQuestion();
}

function fmTimeUp() {
  clearInterval(fmState.timerInterval);
  AudioManager.playBuzzer();
  showToast("¡TIEMPO AGOTADO!", true);
  fmEndInput();
}

function fmEndInput() {
  clearInterval(fmState.timerInterval);
  fmState.phase = 'reveal';
  fmState.qIndex = 0;
  document.getElementById('fmAnswerInput').disabled = true;
  document.getElementById('fmQuestionDisplay').textContent = "¡Tiempo! Vamos a revisar.";
  document.getElementById('fmRevealBtn').style.display = 'inline-block';
}

function fmRevealNext() {
  if (fmState.qIndex >= 5) {
    if (fmState.player === 1) {
      fmState.player = 2;
      fmState.phase = 'idle';
      document.getElementById('fmQuestionDisplay').textContent = "¿Listos para el Jugador 2?";
      document.getElementById('fmStartBtn').style.display = 'inline-block';
      document.getElementById('fmRevealBtn').style.display = 'none';
    } else {
      document.getElementById('fmRevealBtn').style.display = 'none';
      if (fmState.totalPts >= 200) {
        document.getElementById('fmQuestionDisplay').textContent = "¡FELICIDADES! HAN GANADO EL DINERO RÁPIDO";
        AudioManager.playWin();
        launchConfetti();
      } else {
        document.getElementById('fmQuestionDisplay').textContent = "¡Lo sentimos! No alcanzaron los 200 puntos.";
        AudioManager.playBuzzer();
      }
    }
    return;
  }
  
  const ansObj = fmState.answers[fmState.qIndex];
  const text = fmState.player === 1 ? ansObj.p1Text : ansObj.p2Text;
  const qObj = fmState.questions[fmState.qIndex];
  
  let pts = 0;
  if (text && text.toLowerCase() !== "paso") {
    const normInput = normalize(text);
    for (const a of qObj.answers) {
      for (const k of a.keys) {
        if (calculateSimilarity(normInput, normalize(k)) >= 75) {
          pts = a.pts;
          break;
        }
      }
      if (pts > 0) break;
    }
  }
  
  if (fmState.player === 1) ansObj.p1Pts = pts;
  else ansObj.p2Pts = pts;
  
  const ptsCell = document.getElementById(`fm${fmState.player}-p${fmState.qIndex}`);
  ptsCell.textContent = pts;
  
  if (pts > 0) AudioManager.playDing();
  else AudioManager.playBuzzer();
  
  fmState.totalPts += pts;
  document.getElementById('fmTotalPts').textContent = fmState.totalPts;
  
  fmState.qIndex++;
}
