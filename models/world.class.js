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
   * @method setWorld
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
   * @method run
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
   * @method checkBossActivation
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
   * @method displayThrowbottleActiveNotification
   */
  displayThrowbottleActiveNotification() {
    this.throwBottleNotification.classList.add("display-alert");
    setTimeout(() => {
      this.throwBottleNotification.classList.remove("display-alert");
    }, 2000);
  }

  /**
   * Checks if the player can throw an object and performs the throw action if that is the case.
   * @method checkThrowObjects
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
   * @method checkCollisions
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy, 12);
    });
    this.level.enemiesSmall.forEach((enemySmall) => {
      this.checkEnemyCollision(enemySmall, 6, () => this.keyboard.RIGHT || this.keyboard.LEFT);
    });
    this.level.boss.forEach((boss) => {
      this.checkBossCollision(boss);
    });
    this.throwableObjects.forEach((throwBottle) => {
      this.checkThrowBottleCollision(throwBottle);
    });
    this.level.bottles.forEach((bottle) => {
      this.checkCollectableCollision(bottle, this.inventory, this.bottleBar);
    });
    this.level.coins.forEach((coin) => {
      this.checkCollectableCollision(coin, this.coinCounter, this.coinBar);
    });
  }

  /**
   * Checks for a collision between the character and an enemy, applying damage or deactivating the enemy based on conditions.
   *
   * @method checkEnemyCollision
   * @param {Object} enemy - The enemy object to check for collision.
   * @param {number} damage - The amount of damage to apply to the character if collision occurs.
   * @param {Function} [additionalCondition=() => false] - An optional additional condition to check for defeating the enemy.
   */
  checkEnemyCollision(enemy, damage, additionalCondition = () => false) {
    if (enemy.active && this.character.isColliding(enemy)) {
      if (this.character.isJumpingOn(enemy) || additionalCondition()) {
        enemy.energy = 0;
        setTimeout(() => {
          enemy.active = false;
        }, 1000);
      } else if (enemy.energy > 0) {
        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Checks for a collision between the character and the boss.
   * If a collision is detected, the character takes damage and the health bar is updated.
   * @method checkBossCollision
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
   * @method checkThrowBottleCollision
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
   * Checks for a collision between the character and a collectable item.
   * If a collision is detected, the collectable is deactivated, the counter is incremented, and the status bar percentage is updated.
   * @method checkCollectableCollision
   * @param {Object} collectable - The collectable item to check for collision.
   * @param {number} counter - The current count of collected items.
   * @param {Object} statusbar - The status bar object to update the percentage.
   */
  checkCollectableCollision(collectable, counter, statusbar) {
    if (collectable.active && this.character.isColliding(collectable)) {
      collectable.active = false;
      counter++;
      statusbar.setPercentage(6.25 * counter);
    }
  }

  /**
   * Draws the game world on the canvas.
   * @method draw
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
   * @method addMovableObjects
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
   * @method addStatusBars
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
   * Ends the game by pausing the music and atmosphere sounds, hiding certain UI elements, and displaying the end game overlay. 
   * Depending on the energy levels of the boss and the character, it will either trigger the win or lose game over sequence.
   * 
   * @method finishGame
   */
  finishGame() {
    this.music_sound.pause();
    this.atmosphere_sound.pause();
    this.muteButton.style = "display: none";
    this.touchNavigation.style = "display: none";
    this.overlay.style = "";
    this.endMenuButtons.style = "";
    if (this.level.boss[0].energy <= 0) {
      this.winGameOver();
    }
    if (this.character.energy <= 0) {
      this.lostGameOver();
    }
  }

  /**
   * Handles the game over scenario when the player wins.
   * @method winGameOver
   */
  winGameOver() {
    this.win_sound.play();
    this.winScreen.style = "";
  }

  /**
   * Handles the game over scenario when the player loses.
   * @method lostGameOver
   */
  lostGameOver() {
    this.level.boss[0].boss_sound.pause();
    this.lose_sound.play();
    this.loseScreen.style = "";
  }

  /**
   * Adds active objects to the map.
   * @method addObjectsToMap
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
   * @method addToMap
   * @param {Object} mo - The movable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the given image horizontally.
   * @method flipImage
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
   * @method flipImageBack
   * @param {Object} mo - The object whose image is to be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
