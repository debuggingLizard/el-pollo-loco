let overlay;
let canvas;
let startScreen;
let startButton;
let winScreen;
let loseScreen;
let restartButton;
let world;
let keyboard = new Keyboard();
let startImages = [
  "./img/9_intro_outro_screens/start/startscreen_1.png",
  "./img/9_intro_outro_screens/start/startscreen_2.png",
];
let currentImageIndex = 0;
let gameStarted = false;

function init() {
  overlay = document.getElementById("overlay");
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start-screen");
  startButton = document.getElementById("start-button");
  winScreen = document.getElementById("win-screen");
  loseScreen = document.getElementById("lose-screen");
  menuButton = document.getElementById("menu-button");
  restartButton = document.getElementById("restart-button");

  animateStartScreen();
}

function animateStartScreen() {
  setInterval(() => {
    if (!gameStarted) {
      currentImageIndex = (currentImageIndex + 1) % startImages.length;
      startScreen.src = startImages[currentImageIndex];
    }
  }, 1200);
}

function startGame() {
  gameStarted = true;
  overlay.style.display = "none";
  startScreen.style.display = "none";
  startButton.style.display = "none";
  world = new World(
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    restartButton,
    menuButton
  );
}

function returnToMenu() {
  gameStarted = false;
  level1 = {};
  createNewLevel();
  world = {};
  startScreen.style.display = "";
  startButton.style.display = "";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
  restartButton.style.display = "none";
  menuButton.style.display = "none";
}

function restartGame() {
  gameStarted = true;
  level1 = {};
  createNewLevel();
  world = {};
  overlay.style.display = "none";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
  restartButton.style.display = "none";
  menuButton.style.display = "none";
  world = new World (
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    restartButton,
    menuButton
  )
}

window.addEventListener("keydown", (e) => {
  if (e.key == "d" || e.key == "D") {
    keyboard.RIGHT = true;
  }
  if (e.key == "a" || e.key == "A") {
    keyboard.LEFT = true;
  }
  if (e.key == "w" || e.key == "W") {
    keyboard.UP = true;
  }
  if (e.key == "s" || e.key == "S") {
    keyboard.DOWN = true;
  }
  if (e.code == "Enter") {
    keyboard.ENTER = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == "d" || e.key == "D") {
    keyboard.RIGHT = false;
  }
  if (e.key == "a" || e.key == "A") {
    keyboard.LEFT = false;
  }
  if (e.key == "w" || e.key == "W") {
    keyboard.UP = false;
  }
  if (e.key == "s" || e.key == "S") {
    keyboard.DOWN = false;
  }
  if (e.code == "Enter") {
    keyboard.ENTER = false;
  }
});
