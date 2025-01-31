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
let touchCheckbox;
let touchNavigation;
let muteImage;

function init() {
  overlay = document.getElementById("overlay");
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start-screen");
  startButton = document.getElementById("start-button");
  winScreen = document.getElementById("win-screen");
  loseScreen = document.getElementById("lose-screen");
  menuButton = document.getElementById("menu-button");
  restartButton = document.getElementById("restart-button");
  touchCheckbox = document.getElementById("touch-checkbox");
  touchNavigation = document.getElementById("touch-navigation");
  muteImage = document.getElementById("mute-img");
  animateStartScreen();
  addTouchNavigationLogic();
  toggleTouchNavigation();
}

function animateStartScreen() {
  setInterval(() => {
    if (!gameStarted) {
      currentImageIndex = (currentImageIndex + 1) % startImages.length;
      startScreen.src = startImages[currentImageIndex];
    }
  }, 1200);
}

function muteSounds() {
  muteImage.src = muteImage.src.includes("not") ? "./img/muted.png" : "./img/not-muted.png";
  muteImage.classList.toggle("not-muted");
  muteGeneralSounds();
  muteCharacter();
  muteEnemies();
  muteObjects();
}

function muteGeneralSounds() {
  world.atmosphere_sound.muted = !world.atmosphere_sound.muted;
  world.win_sound.muted = !world.win_sound.muted;
  world.lose_sound.muted = !world.lose_sound.muted;
}

function muteCharacter() {
  world.character.walking_sound.muted = !world.character.walking_sound.muted;
  world.character.longIdle_sound.muted = !world.character.longIdle_sound.muted;
  world.character.jump_sound.muted = !world.character.jump_sound.muted;
  world.character.hurt_sound.muted = !world.character.hurt_sound.muted;
  world.character.dying_sound.muted = !world.character.dying_sound.muted;
}

function muteEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.dying_sound.muted = !enemy.dying_sound.muted;
  });
  world.level.enemiesSmall.forEach((enemySmall) => {
    enemySmall.dying_sound.muted = !enemySmall.dying_sound.muted;
  });
  world.level.boss.forEach((boss) => {
    boss.boss_sound.muted = !boss.boss_sound.muted;
    boss.dying_sound.muted = !boss.dying_sound.muted;
  });
}

function muteObjects() {
  world.throwableObjects.forEach((throwBottle) => {
    throwBottle.smash_sound.muted = !throwBottle.smash_sound.muted;
  });
  world.level.bottles.forEach((bottle) => {
    bottle.collect_sound.muted = !bottle.collect_sound.muted;
  });
  world.level.coins.forEach((coin) => {
    coin.collect_sound.muted = !coin.collect_sound.muted;
  });
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
  restartButton.style.display = "none";
  menuButton.style.display = "none";
  overlay.style.display = "none";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
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

function addTouchNavigationLogic() {
  document
    .getElementById("navigation-left")
    .addEventListener("touchstart", () => {
      keyboard.LEFT = true;
    });
  document
    .getElementById("navigation-right")
    .addEventListener("touchstart", () => {
      keyboard.RIGHT = true;
    });
  document
    .getElementById("navigation-jump")
    .addEventListener("touchstart", () => {
      keyboard.UP = true;
    });
  document
    .getElementById("navigation-throw")
    .addEventListener("touchstart", () => {
      keyboard.ENTER = true;
    });
  document
    .getElementById("navigation-left")
    .addEventListener("touchend", () => {
      keyboard.LEFT = false;
    });
  document
    .getElementById("navigation-right")
    .addEventListener("touchend", () => {
      keyboard.RIGHT = false;
    });
  document
    .getElementById("navigation-jump")
    .addEventListener("touchend", () => {
      keyboard.UP = false;
    });
  document
    .getElementById("navigation-throw")
    .addEventListener("touchend", () => {
      keyboard.ENTER = false;
    });
}

function toggleTouchNavigation() {
  touchCheckbox.addEventListener("change", () => {
    if (touchCheckbox.checked) {
      touchNavigation.classList.add("touch-nav-visible");
    } else {
      touchNavigation.classList.remove("touch-nav-visible");
    }
  });
}
