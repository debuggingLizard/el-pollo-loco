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
  restartButton;
  menuButton;
  win_sound = new Audio("./audio/world/win.mp3");
  lose_sound = new Audio("./audio/world/lose.mp3");
  atmosphere_sound = new Audio("./audio/world/atmosphere.mp3");

  constructor(
    canvas,
    keyboard,
    overlay,
    winScreen,
    loseScreen,
    restartButton,
    menuButton
  ) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.overlay = overlay;
    this.winScreen = winScreen;
    this.loseScreen = loseScreen;
    this.restartButton = restartButton;
    this.menuButton = menuButton;
    this.atmosphere_sound.play();
    this.atmosphere_sound.loop = true;
    this.setWorld();
    this.draw();
    this.run();
  }

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

  checkBossActivation() {
    if (this.character.x > 9280 && !this.bossActivated) {
      this.bossActivated = true;
      this.level.boss[0].boss_sound.play();
      this.level.boss[0].boss_sound.loop = true;
      this.level.boss[0].startAlert();
    }
  }

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

  checkEnemyCollision(enemy) {
    if (enemy.active && this.character.isColliding(enemy)) {
      if (this.character.isJumpingOn(enemy)) {
        enemy.energy = 0;
        setTimeout(() => {
          enemy.active = false;
        }, 1000);
      } else if (enemy.energy > 0) {
        this.character.hit(6);
        this.healthBar.setPercentage(this.character.energy);
      }
    }
  }

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
        this.character.hit(3);
        this.healthBar.setPercentage(this.character.energy);
      }
    }
  }

  checkBossCollision(boss) {
    if (this.character.isColliding(boss)) {
      this.character.hit(10);
      this.healthBar.setPercentage(this.character.energy);
    }
  }

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

  checkBottleCollision(bottle) {
    if (bottle.active && this.character.isColliding(bottle)) {
      bottle.active = false;
      this.inventory++;
      this.bottleBar.setPercentage(6.25 * this.inventory);
    }
  }

  checkCoinCollision(coin) {
    if (coin.active && this.character.isColliding(coin)) {
      coin.active = false;
      this.coinCounter++;
      this.coinBar.setPercentage(6.25 * this.coinCounter);
    }
  }

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

  finishGame() {
    if (this.level.boss[0].energy <= 0) {
      this.winGameOver();
    }
    if (this.character.energy <= 0) {
      this.lostGameOver();
    }
  }
  w;

  winGameOver() {
    this.atmosphere_sound.pause();
    this.win_sound.play();
    this.overlay.style = "";
    this.winScreen.style = "";
    this.restartButton.style = "";
    this.menuButton.style = "";
  }

  lostGameOver() {
    this.atmosphere_sound.pause();
    this.level.boss[0].boss_sound.pause();
    this.lose_sound.play();
    this.overlay.style = "";
    this.loseScreen.style = "";
    this.restartButton.style = "";
    this.menuButton.style = "";
  }

  addObjectsToMap(objects) {
    objects.forEach((element) => {
      if (element.active) {
        this.addToMap(element);
      }
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx); //für debugging
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
