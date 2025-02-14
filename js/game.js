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
let muteButton;
let muteImage;
let throwBottleMuted = false;
let muteThrowBottleInterval;
let explainOverlay;
let throwBottleNotification;

/**
 * Initializes the game by setting up the UI elements, adding the necessary event listeners and starting the animation of the start screen.
 */
function init() {
  initializeUIElements();
  animateStartScreen();
  addKeyBoardNavigationLogic();
  addTouchNavigationLogic();
  toggleTouchNavigation();
}

/**
 * Initializes the UI elements by getting the necessary elements from the DOM.
 */
function initializeUIElements() {
  overlay = document.getElementById("overlay");
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("start-screen");
  winScreen = document.getElementById("win-screen");
  loseScreen = document.getElementById("lose-screen");
  touchCheckbox = document.getElementById("touch-checkbox");
  touchNavigation = document.getElementById("touch-navigation");
  muteButton = document.getElementById("mute-button");
  muteImage = document.getElementById("mute-img");
  mainMenuButtons = document.getElementById("main-menu-btns");
  endMenuButtons = document.getElementById("end-menu-btns");
  explainOverlay = document.getElementById("game-explain");
  throwBottleNotification = document.getElementById("throwbottle-notification");
}

/**
 * Toggles the explanation overlay on and off.
 */
function toggleExplanationOverlay() {
  explainOverlay.style.display =
    explainOverlay.style.display == "none" ? "" : "none";
}

/**
 * Animates the start screen by changing the image every 1.2 seconds.
 */
function animateStartScreen() {
  setInterval(() => {
    if (!gameStarted) {
      currentImageIndex = (currentImageIndex + 1) % startImages.length;
      startScreen.src = startImages[currentImageIndex];
    }
  }, 1200);
}

/**
 * Mutes or unmutes all sounds in the game.
 */
function muteSounds() {
  muteImage.src = muteImage.src.includes("not")
    ? "./img/muted.png"
    : "./img/not-muted.png";
  muteGeneralSounds();
  muteCharacter();
  muteEnemies();
  muteObjects();
}

/**
 * Mutes or unmutes the general sounds in the game.
 */
function muteGeneralSounds() {
  world.music_sound.muted = !world.music_sound.muted;
  world.atmosphere_sound.muted = !world.atmosphere_sound.muted;
  world.win_sound.muted = !world.win_sound.muted;
  world.lose_sound.muted = !world.lose_sound.muted;
}

/**
 * Mutes or unmutes the character sounds in the game.
 */
function muteCharacter() {
  world.character.walking_sound.muted = !world.character.walking_sound.muted;
  world.character.longIdle_sound.muted = !world.character.longIdle_sound.muted;
  world.character.jump_sound.muted = !world.character.jump_sound.muted;
  world.character.hurt_sound.muted = !world.character.hurt_sound.muted;
  world.character.dying_sound.muted = !world.character.dying_sound.muted;
}

/**
 * Mutes or unmutes the enemies sounds in the game.
 */
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

/**
 * Mutes or unmutes object sounds in the game.
 */
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

/**
 * Starts the game by creating a new world and hiding the overlays
 */
function startGame() {
  createNewWorld();
  gameStarted = true;
  hideOverlays();
}

/**
 * Returns to the main menu by resetting the game and showing the start screen.
 */
function returnToMenu() {
  gameStarted = false;
  resetMute();
  resetWorld();
  resetOverlaysReturn();
}

/**
 * Restarts the game by resetting the game and creating a new world.
 */
function restartGame() {
  resetMute();
  resetWorld();
  createNewWorld();
  gameStarted = true;
  resetOverlaysRestart();
}

/**
 * Creates a new instance of the World object with the provided parameters.
 */
function createNewWorld() {
  world = new World(
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    endMenuButtons,
    muteButton,
    touchNavigation,
    throwBottleNotification
  );
}

/**
 * Hides the overlay, start screen, and main menu buttons by setting their display style to "none".
 */
function hideOverlays() {
  overlay.style.display = "none";
  startScreen.style.display = "none";
  mainMenuButtons.style.display = "none";
}

/**
 * Resets the mute state of the game to its initial unmuted state.
 */
function resetMute() {
  muteImage.src = "./img/not-muted.png";
  muteButton.style.display = "";
  clearInterval(muteThrowBottleInterval);
  throwBottleMuted = false;
}

/**
 * Resets the world by clearing the level1 object, creating a new level and clearing the world object.
 * This is used when returning to main menu or when restarting the game.
 */
function resetWorld() {
  level1 = {};
  createNewLevel();
  world = {};
}

/**
 * Creates a new instance of the Level object with the provided parameters. 
 * This is used when returning to the main menu.
 */
function resetOverlaysReturn() {
  startScreen.style.display = "";
  mainMenuButtons.style.display = "";
  touchNavigation.style.display = "";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
  endMenuButtons.style.display = "none";
}

/**
 * Resets the overlays to their initial state by resetting their display style to the initial state. This is used when restarting the game.
 */
function resetOverlaysRestart() {
  touchNavigation.style.display = "";
  endMenuButtons.style.display = "none";
  overlay.style.display = "none";
  winScreen.style.display = "none";
  loseScreen.style.display = "none";
}


/**
 * Initializes keyboard navigation logic by activating and deactivating key event listeners.
 * This function sets up the necessary logic to handle keyboard navigation within the game.
 */
function addKeyBoardNavigationLogic() {
  keyActiveLogic();
  keyInactiveLogic();
}


/**
 * Adds event listeners for keydown events to update the keyboard object.
 */
function keyActiveLogic() {
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
}

/**
 * Adds an event listener to the window object that listens for the "keyup" event.
 */
function keyInactiveLogic() {
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
}

/**
 * Initializes touch navigation logic for the game by setting up touch event listeners for movement, jumping, and throwing actions. 
 * It also prevents unwanted behavior (such as selection of text) during touch interactions.
 */
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
  addTouchMovement(navigationLeft, navigationRight);
  addTouchJump(navigationJump);
  addTouchThrow(navigationThrow);
  preventUnwantedBehaviorDuringTouch(touchElements);
}

/**
 * Adds touch event listeners to the provided navigation elements to handle touch-based movement.
 *
 * @param {HTMLElement} navigationLeft - The HTML element for navigating left.
 * @param {HTMLElement} navigationRight - The HTML element for navigating right.
 */
function addTouchMovement(navigationLeft, navigationRight) {
  navigationLeft.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  }, { passive: false });
  navigationRight.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  }, { passive: false });
  navigationLeft.addEventListener("touchend", () => {
    keyboard.LEFT = false;
  }, { passive: false });
  navigationRight.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  }, { passive: false });
}

/**
 * Adds touch event listeners to enable jump functionality on touch devices.
 *
 * @param {HTMLElement} navigationJump - The HTML element that will trigger the jump action on touch events.
 */
function addTouchJump(navigationJump) {
  navigationJump.addEventListener("touchstart", () => {
    keyboard.UP = true;
  }, { passive: false });
  navigationJump.addEventListener("touchend", () => {
    keyboard.UP = false;
  }, { passive: false });
}

/**
 * Adds touch event listeners to the specified navigation element to simulate the ENTER key press on touch devices.
 *
 * @param {HTMLElement} navigationThrow - The navigation element to which the touch event listeners will be added.
 */
function addTouchThrow(navigationThrow) {
  navigationThrow.addEventListener("touchstart", () => {
    keyboard.ENTER = true;
  }, { passive: false });
  navigationThrow.addEventListener("touchend", () => {
    keyboard.ENTER = false;
  }, { passive: false });
}

/**
 * Prevents unwanted behavior such as text selection on touch elements.
 *
 * @param {HTMLElement[]} touchElements - An array of HTML elements to apply the prevention behavior.
 */
function preventUnwantedBehaviorDuringTouch(touchElements) {
  touchElements.forEach((element) => {
    element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    }, { passive: false });
    element.addEventListener("selectstart", (e) => {
      e.preventDefault();
    }, { passive: false });
  });
}

/**
 * Toggles the visibility of touch navigation based on the state of the touchCheckbox.
 */
function toggleTouchNavigation() {
  touchCheckbox.addEventListener("change", () => {
    if (touchCheckbox.checked) {
      touchNavigation.classList.add("touch-nav-visible");
    } else {
      touchNavigation.classList.remove("touch-nav-visible");
    }
  });
}
