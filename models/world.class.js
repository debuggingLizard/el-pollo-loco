class World {
  character = new Character();
  bottleBar = new BottleBar();
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bossBar = new BossBar();
  gameOver = false;
  throwableObjects = [];
  inventory = 0;
  coinCounter = 0;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bossActivated = false;
  canThrow = false;
  overlay;
  winScreen;
  loseScreen;
  endMenuButtons;
  muteButton;
  touchNavigation;
  throwBottleNotification;
  win_sound = new Audio("./audio/world/win.mp3");
  lose_sound = new Audio("./audio/world/lose.mp3");
  atmosphere_sound = new Audio("./audio/world/atmosphere.mp3");
  music_sound = new Audio("./audio/world/game-music.mp3");

  constructor(
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    endMenuButtons,
    muteButton,
    touchNavigation,
    throwBottleNotification
  ) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.overlay = overlay;
    this.winScreen = winScreen;
    this.loseScreen = loseScreen;
    this.endMenuButtons = endMenuButtons;
    this.muteButton = muteButton;
    this.touchNavigation = touchNavigation;
    this.throwBottleNotification = throwBottleNotification;
    this.music_sound.volume = 0.4;
    this.music_sound.play();
    this.atmosphere_sound.play();
    this.music_sound.loop = true;
    this.atmosphere_sound.loop = true;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world reference for the character, boss, and all enemies in the level for functionality.
   */
  setWorld() {
    this.character.world = this;
    this.level.boss[0].world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.level.enemiesSmall.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the game loop which runs every 30 milliseconds.
   */
  run() {
    setInterval(() => {
      if (!this.gameOver) {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkBossActivation();
        this.character.updatePreviousY();
      }
    }, 30);
  }

  /**
   * Checks if the boss should be activated based on the character's position.
   */
  checkBossActivation() {
    if (this.character.x > 9280 && !this.bossActivated) {
      this.bossActivated = true;
      this.level.boss[0].boss_sound.play();
      this.level.boss[0].boss_sound.loop = true;
      this.displayThrowbottleActiveNotification();
      this.level.boss[0].startAlert();
    }
  }

  /**
   * Displays a notification indicating that the player can now throw objects.
   */
  displayThrowbottleActiveNotification() {
    this.throwBottleNotification.classList.add("display-alert");
    setTimeout(() => {
      this.throwBottleNotification.classList.remove("display-alert");
    }, 2000);
  }

  /**
   * Checks if the player can throw an object and performs the throw action if that is the case.
   */
  checkThrowObjects() {
    if (this.keyboard.ENTER && this.canThrow && this.inventory > 0) {
      this.inventory--;
      let bottle = new ThrowableObject(
        this.character.x + 60,
        this.character.y + 130
      );
      this.throwableObjects.push(bottle);
      this.bottleBar.setPercentage(6.25 * this.inventory);
      this.canThrow = false;
      setTimeout(() => {
        this.canThrow = true;
      }, 1200);
    }
  }

  /**
   * Checks for collisions between the player and various game objects.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
    });
    this.level.enemiesSmall.forEach((enemySmall) => {
      this.checkSmallEnemyCollision(enemySmall);
    });
    this.level.boss.forEach((boss) => {
      this.checkBossCollision(boss);
    });
    this.throwableObjects.forEach((throwBottle) => {
      this.checkThrowBottleCollision(throwBottle);
    });
    this.level.bottles.forEach((bottle) => {
      this.checkBottleCollision(bottle);
    });
    this.level.coins.forEach((coin) => {
      this.checkCoinCollision(coin);
    });
  }

  /**
   * Checks for a collision between the character and an enemy.
   *
   * @param {Object} enemy - The enemy object to check for collision.
   */
  checkEnemyCollision(enemy) {
    if (enemy.active && this.character.isColliding(enemy)) {
      if (this.character.isJumpingOn(enemy)) {
        enemy.energy = 0;
        setTimeout(() => {
          enemy.active = false;
        }, 1000);
      } else if (enemy.energy > 0) {
        this.character.hit(12);
        this.healthBar.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Checks for collision between the character and a small enemy.
   *
   * @param {Object} enemySmall - The small enemy object to check collision with.
   */
  checkSmallEnemyCollision(enemySmall) {
    if (enemySmall.active && this.character.isColliding(enemySmall)) {
      if (
        this.character.isJumpingOn(enemySmall) ||
        this.keyboard.RIGHT ||
        this.keyboard.LEFT
      ) {
        enemySmall.energy = 0;
        setTimeout(() => {
          enemySmall.active = false;
        }, 1000);
      } else if (enemySmall.energy > 0) {
        this.character.hit(6);
        this.healthBar.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Checks for a collision between the character and the boss.
   * If a collision is detected, the character takes damage and the health bar is updated.
   *
   * @param {Object} boss - The boss object to check for collision with.
   */
  checkBossCollision(boss) {
    if (this.character.isColliding(boss)) {
      this.character.hit(20);
      this.healthBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks for a collision between a thrown bottle and the boss.
   *
   * @param {Object} throwBottle - The thrown bottle object to check for collision.
   */
  checkThrowBottleCollision(throwBottle) {
    if (this.level.boss[0].isColliding(throwBottle)) {
      this.level.boss[0].hit(7);
      throwBottle.bossIsHit = true;
      throwBottle.playAnimation(throwBottle.IMAGES_SMASH);
      if (this.level.boss[0].energy < 20) {
        this.level.boss[0].energy = 0;
      }
      this.bossBar.setPercentage(this.level.boss[0].energy);
    }
  }

  /**
   * Checks for a collision between the character and a bottle.
   *
   * @param {Object} bottle - The bottle object to check for collision.
   */
  checkBottleCollision(bottle) {
    if (bottle.active && this.character.isColliding(bottle)) {
      bottle.active = false;
      this.inventory++;
      this.bottleBar.setPercentage(6.25 * this.inventory);
    }
  }

  /**
   * Checks for a collision between the character and a coin.
   *
   * @param {Object} coin - The coin object to check for collision.
   */
  checkCoinCollision(coin) {
    if (coin.active && this.character.isColliding(coin)) {
      coin.active = false;
      this.coinCounter++;
      this.coinBar.setPercentage(6.25 * this.coinCounter);
    }
  }

  /**
   * Draws the game world on the canvas.
   *
   * If the game is over, it calls the finishGame method and stops further drawing. Otherwise, it continues to request the next animation frame to keep drawing.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusBars();
    if (this.gameOver) {
      this.finishGame();
      return;
    }
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds all movable objects to the game map while the game is running.
   */
  addMovableObjects() {
    if (!this.gameOver) {
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.enemiesSmall);
      this.addToMap(this.level.boss[0]);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.coins);
      this.addToMap(this.character);
      this.addObjectsToMap(this.throwableObjects);
    }
  }

  /**
   * Adds status bars to the game map while the game is running.
   */
  addStatusBars() {
    if (!this.gameOver) {
      this.addToMap(this.bottleBar);
      this.addToMap(this.healthBar);
      this.addToMap(this.coinBar);
      if (this.bossActivated) {
        this.addToMap(this.bossBar);
      }
    }
  }

  /**
   * Checks the energy levels of the boss and the character to determine the game's outcome (win or lose).
   */
  finishGame() {
    if (this.level.boss[0].energy <= 0) {
      this.winGameOver();
    }
    if (this.character.energy <= 0) {
      this.lostGameOver();
    }
  }

  /**
   * Handles the game over scenario when the player wins.
   */
  winGameOver() {
    this.music_sound.pause();
    this.atmosphere_sound.pause();
    this.win_sound.play();
    this.muteButton.style = "display: none";
    this.touchNavigation.style = "display: none";
    this.overlay.style = "";
    this.winScreen.style = "";
    this.endMenuButtons.style = "";
  }

  /**
   * Handles the game over scenario when the player loses.
   */
  lostGameOver() {
    this.music_sound.pause();
    this.atmosphere_sound.pause();
    this.level.boss[0].boss_sound.pause();
    this.lose_sound.play();
    this.muteButton.style = "display: none";
    this.touchNavigation.style = "display: none";
    this.overlay.style = "";
    this.loseScreen.style = "";
    this.endMenuButtons.style = "";
  }

  /**
   * Adds active objects to the map.
   *
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((element) => {
      if (element.active) {
        this.addToMap(element);
      }
    });
  }

  /**
   * Adds a movable object to the map and handles its drawing.
   *
   * @param {Object} mo - The movable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx); //für debugging
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the given image horizontally.
   *
   * @param {Object} mo - The image object to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image of the given object back to its original orientation.
   *
   * @param {Object} mo - The object whose image is to be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
