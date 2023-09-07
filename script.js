// Lista de retos
const challenges = [
  { title: "Suma de números", description: "Calcular la suma de todos los números enteros desde el 1 hasta el 20.", completed: false },
  { title: "Factorial", description: "Calcular el factorial de 10.", completed: false },
  { title: "Números pares", description: "Imprime todos los números pares desde 1 hasta 18.", completed: false },
  { title: "Fibonacci", description: "Genera una secuencia de Fibonacci hasta el 10º término.", completed: false },
  { title: "Palíndromo", description: "Determina si la cadena 'level' es un palíndromo.", completed: false },
  { title: "Suma de números pares e impares", description: "Calcula la suma de los números pares y la suma de los números impares del 1 al 30.", completed: false },
  { title: "Números impares", description: "Imprime todos los números impares desde 1 hasta 25.", completed: false },
  { title: "Tabla de multiplicar", description: "Imprime la tabla de multiplicar del 7.", completed: false },
  { title: "Suma de cuadrados", description: "Calcula la suma de los cuadrados de los números enteros desde 1 hasta 10.", completed: false },
  { title: "Números primos", description: "Encuentra todos los números primos hasta 50.", completed: false },
  { title: "Inversión de cadena", description: "Invierte la cadena 'programming'.", completed: false },
  { title: "Máximo común divisor", description: "Encuentra el máximo común divisor de 56 y 48.", completed: false },
  { title: "Suma de dígitos", description: "Calcula la suma de los dígitos del número 12345.", completed: false },
  { title: "Potencia de un número", description: "Calcular 2 elevado a la potencia 10.", completed: false },
  { title: "Longitud de una cadena", description: "Encuentra la longitud de la cadena 'Hello, World!'.", completed: false },
  { title: "Contar vocales", description: "Cuenta el número de vocales en la cadena 'Dia del programador!'.", completed: false },
  { title: "Números aleatorios", description: "Genera 5 números aleatorios entre 1 y 100.", completed: false },
  { title: "Ordenar un array", description: "Ordena el array [34, 7, 23, 32, 5, 62].", completed: false },
  { title: "Eliminar duplicados", description: "Elimina los elementos duplicados del array [1, 2, 2, 3, 4, 3, 5].", completed: false },
  { title: "Suma de elementos de un array", description: "Calcula la suma de los elementos del array [1, 2, 3, 4, 5].", completed: false },
  { title: "Concatenación de cadenas", description: "Concatena las cadenas 'Hello' y 'World'.", completed: false },
  { title: "Divisores de un número", description: "Encuentra todos los divisores del número 100.", completed: false },
  { title: "Número más grande en un array", description: "Encuentra el número más grande en el array [1, 6, 3, 9, 2, 10].", completed: false },
  { title: "Número más pequeño en un array", description: "Encuentra el número más pequeño en el array [1, 6, 3, 9, 2, 10].", completed: false },
  { title: "Verificar si un número es par o impar", description: "Verifica si el número 256 es par o impar.", completed: false }
];

let currentRound = 0;
let timer;

// Elementos del DOM
const homePage = document.getElementById("homePage");
const duelPage = document.getElementById("duelPage");
const roundSummaryPage = document.getElementById("roundSummaryPage");
const endGamePage = document.getElementById("endGamePage");

const challengeTitle = document.getElementById("challengeTitle");
const challengeDescription = document.getElementById("challengeDescription");
const timerElement = document.getElementById("timer");
const startDuelBtn = document.getElementById("startDuelBtn");
const stopTimerBtn = document.getElementById("stopTimerBtn");
const duelist1Btn = document.getElementById("duelist1Btn");
const duelist2Btn = document.getElementById("duelist2Btn");
const roundSummary = document.getElementById("roundSummary");
const currentRoundElement = document.getElementById("currentRound");


// Iniciar ronda
document.getElementById("startRoundBtn").addEventListener("click", function() {
  currentRound++;
  currentRoundElement.textContent = `Ronda: ${currentRound}`;
  startNewRound();
});

// Iniciar duelo
startDuelBtn.addEventListener("click", function() {
  startDuelBtn.classList.add("hidden");
  stopTimerBtn.classList.remove("hidden");
  startTimer();
});

// Detener contador
stopTimerBtn.addEventListener("click", function() {
  clearInterval(timer);
  stopTimerBtn.classList.add("hidden");
  showWinnerButtons();
});

// Elegir ganador
duelist1Btn.addEventListener("click", chooseWinner);
duelist2Btn.addEventListener("click", chooseWinner);

// Iniciar siguiente ronda
document.getElementById("nextRoundBtn").addEventListener("click", function() {
  if (currentRound < 25) {
    currentRound++;
    currentRoundElement.textContent = `Ronda: ${currentRound}`;
    startNewRound();
  } else {
    endGame();
  }
});

// Reiniciar juego
document.getElementById("restartBtn").addEventListener("click", function() {
  location.reload();
});

function startNewRound() {
  homePage.classList.add("hidden");
  duelPage.classList.remove("hidden");
  roundSummaryPage.classList.add("hidden");

  startDuelBtn.classList.remove("hidden");
  stopTimerBtn.classList.add("hidden");
  duelist1Btn.classList.add("hidden");
  duelist2Btn.classList.add("hidden");
  timerElement.textContent = "03:00";

  let availableChallenges = challenges.filter(challenge => !challenge.completed);
  let randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];

  challengeTitle.textContent = randomChallenge.title;
  challengeDescription.textContent = randomChallenge.description;
  randomChallenge.completed = true;
}

function startTimer() {
  let minutes = 2;
  let seconds = 59;
  timerElement.textContent = "03:00";

  timer = setInterval(function() {
    if (seconds < 10) {
      timerElement.textContent = `0${minutes}:0${seconds}`;
    } else {
      timerElement.textContent = `0${minutes}:${seconds}`;
    }

    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      showWinnerButtons();
      return;
    }

    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
  }, 1000);
}

function showWinnerButtons() {
  stopTimerBtn.classList.add("hidden");
  duelist1Btn.classList.remove("hidden");
  duelist2Btn.classList.remove("hidden");

  // Añadir texto para indicar que se debe elegir un ganador
  const chooseWinnerText = document.createElement("p");
  chooseWinnerText.id = "chooseWinnerText";  // Añadir un ID
  chooseWinnerText.textContent = "Elegir ganador del duelo";
  duelPage.insertBefore(chooseWinnerText, duelist1Btn);
  
  // Insertar el texto antes de los botones
  duelPage.insertBefore(chooseWinnerText, duelist1Btn);
}

function chooseWinner() {
  duelPage.classList.add("hidden");
  roundSummaryPage.classList.remove("hidden");
  roundSummary.textContent = currentRound;

  // Eliminar el texto "Elegir ganador del duelo"
  const chooseWinnerText = document.getElementById("chooseWinnerText");
  if (chooseWinnerText) {
    chooseWinnerText.remove();
  }
}

function endGame() {
  roundSummaryPage.classList.add("hidden");
  endGamePage.classList.remove("hidden");
}

function saveGameState() {
  const gameState = {
    currentRound,
    completedChallenges: challenges.filter(challenge => challenge.completed),
    // ... cualquier otro estado que quieras guardar
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    currentRound = gameState.currentRound;
    // ... cargar cualquier otro estado que hayas guardado
  }
}

