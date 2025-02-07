let overlay;
let canvas;
let startScreen;
let winScreen;
let loseScreen;
let mainMenuButtons;
let endMenuButtons;
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
let throwBottleMuted = false;
let muteThrowBottleInterval;

function init() {
  initializeUIElements();
  // animateStartScreen();
  addTouchNavigationLogic();
  toggleTouchNavigation();
}

function initializeUIElements() {
  overlay = document.getElementById("overlay");
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start-screen");
  winScreen = document.getElementById("win-screen");
  loseScreen = document.getElementById("lose-screen");
  touchCheckbox = document.getElementById("touch-checkbox");
  touchNavigation = document.getElementById("touch-navigation");
  muteImage = document.getElementById("mute-img");
  mainMenuButtons = document.getElementById("main-menu-btns");
  endMenuButtons = document.getElementById("end-menu-btns");
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
  if (gameStarted) {
    muteImage.src = muteImage.src.includes("not")
      ? "./img/muted.png"
      : "./img/not-muted.png";
    muteImage.classList.toggle("not-muted");
    muteGeneralSounds();
    muteCharacter();
    muteEnemies();
    muteObjects();
  }
}

function muteGeneralSounds() {
  world.music_sound.muted = !world.music_sound.muted;
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
  throwBottleMuted = !throwBottleMuted;
  muteThrowBottleInterval = setInterval(() => {
    world.throwableObjects.forEach((throwBottle) => {
      throwBottle.smash_sound.muted = throwBottleMuted;
    });
  }, 1000 / 60);
  world.level.bottles.forEach((bottle) => {
    bottle.collect_sound.muted = !bottle.collect_sound.muted;
  });
  world.level.coins.forEach((coin) => {
    coin.collect_sound.muted = !coin.collect_sound.muted;
  });
}

function startGame() {
  createNewWorld();
  gameStarted = true;
  muteImage.classList.remove("inactive");
  hideOverlays();
}

function returnToMenu() {
  gameStarted = false;
  resetMute();
  resetWorld();
  resetOverlaysReturn();
}

function restartGame() {
  resetMute();
  resetWorld();
  createNewWorld();
  gameStarted = true;
  resetOverlaysRestart();
}

function createNewWorld() {
  world = new World(
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    endMenuButtons
  );
}

function hideOverlays() {
  overlay.style.display = "none";
  startScreen.style.display = "none";
  mainMenuButtons.style.display = "none";
}

function resetMute() {
  muteImage.src = "./img/not-muted.png";
  muteImage.classList.add("not-muted");
  clearInterval(muteThrowBottleInterval);
  throwBottleMuted = false;
}

function resetWorld() {
  level1 = {};
  createNewLevel();
  world = {};
}

function resetOverlaysReturn() {
  startScreen.style.display = "";
  mainMenuButtons.style.display = "";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
  endMenuButtons.style.display = "none";
}

function resetOverlaysRestart() {
  endMenuButtons.style.display = "none";
  overlay.style.display = "none";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
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
  let navigationLeft = document.getElementById("navigation-left");
  let navigationRight = document.getElementById("navigation-right");
  let navigationJump = document.getElementById("navigation-jump");
  let navigationThrow = document.getElementById("navigation-throw");
  let touchElements = [
    navigationLeft,
    navigationRight,
    navigationJump,
    navigationThrow,
  ];
  navigationLeft.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });
  navigationRight.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });
  navigationJump.addEventListener("touchstart", () => {
    keyboard.UP = true;
  });
  navigationThrow.addEventListener("touchstart", () => {
    keyboard.ENTER = true;
  });
  navigationLeft.addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });
  navigationRight.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });
  navigationJump.addEventListener("touchend", () => {
    keyboard.UP = false;
  });
  navigationThrow.addEventListener("touchend", () => {
    keyboard.ENTER = false;
  });
  touchElements.forEach((element) => {
    element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    element.addEventListener("selectstart", (e) => {
      e.preventDefault();
    });
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
