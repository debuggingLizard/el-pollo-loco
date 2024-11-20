let overlay;
let startScreen;
let canvas;
let world;
let keyboard = new Keyboard();
let startImages = [
  "./img/9_intro_outro_screens/start/startscreen_1.png",
  "./img/9_intro_outro_screens/start/startscreen_2.png"
]
let currentImageIndex = 0;

function init() {
  overlay = document.getElementById("overlay");
  canvas = document.getElementById("canvas");

  animateStartScreen();
}

function animateStartScreen() {
  startScreen = document.getElementById("startScreen");
  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % startImages.length;
    startScreen.src = startImages[currentImageIndex];
    }, 1000);
}

function startGame() {
  overlay.style.display = "none";
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (e.key == 'd' || e.key == 'D') {
    keyboard.RIGHT = true;
  }
  if (e.key == 'a' || e.key == 'A') {
    keyboard.LEFT = true;
  }
  if (e.key == 'w' || e.key == 'W') {
    keyboard.UP = true;
  }
  if (e.key == 's' || e.key == 'S') {
    keyboard.DOWN = true;
  }
  if (e.code == 'Enter') {
    keyboard.ENTER = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == 'd' || e.key == 'D') {
    keyboard.RIGHT = false;
  }
  if (e.key == 'a' || e.key == 'A') {
    keyboard.LEFT = false;
  }
  if (e.key == 'w' || e.key == 'W') {
    keyboard.UP = false;
  }
  if (e.key == 's' || e.key == 'S') {
    keyboard.DOWN = false;
  }
  if (e.code == 'Enter') {
    keyboard.ENTER = false;
  }
})
