# 🇲🇽 100 Mexicanos Dijeron - Simulador de Juego

¡Bienvenido al simulador definitivo de **100 Mexicanos Dijeron**! Este proyecto es una aplicación web interactiva (compatible con Electron para ejecutarse como aplicación de escritorio) diseñada para hospedar y dirigir un show de concurso real con amigos, familiares o en eventos académicos/laborales.

La aplicación cuenta con efectos de sonido programados, un cronómetro de tensión, un buscador inteligente de respuestas con corrector de acentos y un épico modo final de **Dinero Rápido** con pantalla dual.

---

## 🎮 Modos de Juego y Cómo Jugar

### 1. Ronda Normal (Juego Principal)
El objetivo es acumular puntos adivinando las respuestas más populares de la encuesta.
*   **Inicio:** Ingresa el nombre de ambos equipos y haz clic en **"¡A JUGAR!"**.
*   **Dinámica de Turnos:**
    *   El anfitrión lee la pregunta. Un participante responde y el anfitrión escribe la respuesta en la barra inferior.
    *   Si la respuesta es **correcta**, se revela la tarjeta en el tablero con una animación 3D y suena un *Ding!* alegre. Los puntos se acumulan en el pozo de la ronda.
    *   Si la respuesta es **incorrecta**, el equipo recibe un **Strike (X)** y suena un molesto zumbido (*Buzzer*).
    *   El equipo puede decidir **pasar el turno** al oponente usando el botón "PASAR".
*   **Robo de Puntos (Steal Phase):**
    *   Si un equipo acumula **3 Strikes**, el equipo contrario tiene una **única oportunidad** de adivinar cualquier respuesta restante en el tablero.
    *   Si aciertan, ¡se roban todos los puntos acumulados en la ronda! Si fallan, el equipo original se queda con los puntos.
*   **Cronómetro de Turno:** Cada turno tiene un tiempo límite (por defecto **20 segundos**). Si el cronómetro llega a cero, suena el *Buzzer*, se marca un Strike automático y el turno cambia al equipo contrario.

### 2. Dinero Rápido (Ronda Final / Fast Money)
La gran final clásica donde el equipo ganador compite por el premio mayor. Puedes jugarla al terminar las rondas normales o directamente desde la pantalla de inicio.
*   **Dinámica de Pantalla Dual:** La pantalla se divide en dos columnas (Jugador 1 y Jugador 2).
*   **Jugador 1 (20 segundos):**
    *   El Jugador 2 se "va del foro" (no debe ver la pantalla).
    *   El anfitrión inicia la ronda y lee las 5 preguntas consecutivas. Escribe la respuesta que le den y presiona `ENTER`.
    *   Si el jugador no sabe una, puede decir **"PASO"** (haciendo clic en el botón Pasar) para saltarla.
*   **Jugador 2 (25 segundos):**
    *   El Jugador 2 regresa a jugar. El anfitrión lee las mismas 5 preguntas.
    *   **Detector de Repeticiones:** Si el Jugador 2 da una respuesta idéntica o muy similar a la del Jugador 1, el sistema emite un zumbido de error y le pide dar otra respuesta inmediatamente.
*   **La Revelación:**
    *   Al terminar ambas rondas de respuestas, el anfitrión presiona **"REVELAR PUNTOS"** para cada respuesta una por una.
    *   El sistema calcula automáticamente los aciertos y suma los puntajes.
    *   ¡Si entre ambos participantes logran acumular **200 puntos o más**, ganan el gran premio! (Acompañado de confeti tridimensional y fanfarrias).

---

## ⚙️ Configuración y Personalización

El simulador es 100% personalizable desde el panel de control (icono de engranaje ⚙️ en la parte superior derecha):

*   **Títulos:** Cambia el título principal y el subtítulo del juego.
*   **Segundos por turno:** Define el límite de tiempo (ej. 20s). Si configuras `0`, el tiempo será ilimitado y el reloj desaparecerá.
*   **Preguntas y Respuestas (JSON):** Puedes programar tus propias encuestas escribiendo en formato JSON.
*   **Exportar/Importar:** Guarda tus bancos de preguntas personalizados en un archivo `.json` en tu computadora para cargarlos al instante en cualquier momento.

### Formato del JSON para Preguntas Normales:
Cada pregunta es un objeto que contiene una pregunta (`q`) y un array de respuestas (`answers`), cada una con su texto visible (`text`), su valor en puntos (`pts`) y palabras clave alternativas (`keys`):
```json
[
  {
    "q": "¿Qué se asocia con el liderazgo transformacional?",
    "answers": [
      { "text": "Visión a futuro", "pts": 50, "keys": ["vision", "futuro", "soñador"] },
      { "text": "Empatía", "pts": 30, "keys": ["empatia", "empatico", "comprensivo"] }
    ]
  }
]
```

### Formato para Preguntas de Dinero Rápido:
Se configuran en su propio cuadro de texto dedicado en formato idéntico de 5 preguntas.

---

## 🛠️ Arquitectura y Tecnologías del Proyecto

La aplicación está construida sobre una arquitectura modular "Vanilla" de alto rendimiento para garantizar compatibilidad directa y carga instantánea:

1.  **Estructura y UI (`index.html`):** Contenedores semánticos en HTML5 estructurados para transiciones rápidas de pantallas y overlays.
2.  **Estética Premium (`assets/style.css`):**
    *   Diseño responsivo y futurista con temática oscura profunda, bordes dorados, desenfoques de fondo (*backdrop-filters*) y botones interactivos.
    *   Tipografías premium integradas (Inter y Bebas Neue para emular pantallas de televisión LED).
    *   Animaciones integradas para el parpadeo de peligro en el temporizador, sacudidas ante respuestas erróneas (`shake`) y giros de tarjetas 3D.
3.  **Lógica del Juego (`assets/script.js`):**
    *   **Buscador Inteligente (`normalize` y `calculateSimilarity`):** Motor de búsqueda que limpia las respuestas del jugador (quita acentos, signos de puntuación, mayúsculas y espacios extra) y utiliza la distancia de Levenshtein para permitir pequeños errores de dedo o respuestas parciales aproximadas a un 75%.
    *   **Generador de Sonidos (`AudioManager`):** Utiliza la **Web Audio API** para sintetizar sonidos en tiempo real (tonos armónicos para aciertos, osciladores de sierra/cuadrada para el zumbador y melodías alegres para la victoria) evitando cargar archivos de audio externos pesados y asegurando compatibilidad en cualquier navegador.
    *   **Gestión de Estados (`GameState`):** Una fuente única de verdad para controlar turnos, puntos, strikes, estadísticas finales y fases especiales de robo de forma totalmente reactiva.
    *   **Temporizadores (`TimerManager`):** Controlador asíncrono robusto que maneja el reloj sin bloquear la interacción del juego.

---

## 🚀 Cómo Ejecutar el Proyecto
Dado que es una aplicación web moderna y ligera, tienes dos opciones:

### Opción 1: En el Navegador (Directo)
Simplemente haz doble clic en el archivo `index.html` para abrirlo en Chrome, Edge o Firefox. ¡Listo para jugar!

### Opción 2: Como Aplicación de Escritorio (Electron)
Este proyecto incluye soporte para convertirse en una app de escritorio nativa:
1.  Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2.  Instala las dependencias necesarias ejecutando en la terminal:
    ```bash
    npm install
    ```
3.  Inicia la aplicación de escritorio ejecutando:
    ```bash
    npm start
    ```

---

