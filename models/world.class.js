class World {
  character = new Character();
  bottleBar = new BottleBar();
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bossBar = new BossBar();
  throwableObjects = [];
  inventory = 20; //muss später wieder auf null
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bossActivated = false;
  canThrow = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.boss[0].world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBossActivation();
      this.character.updatePreviousY();
    }, 60);
  }

  checkBossActivation() {
    if (this.character.x > 400 && !this.bossActivated) {
      this.bossActivated = true;
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
      }, 1000);
    }
  }

  checkCollisions() {
    // this.level.enemies.forEach((enemy) => {
    //   if (enemy.active && this.character.isColliding(enemy)) {
    //     if (this.character.isJumpingOn(enemy)) {
    //       console.log("character ist auf enemy gesprungen und hat ihn besiegt");
    //       enemy.energy = 0;
    //       console.log(enemy.energy);
    //       setTimeout(() => {
    //         enemy.active = false;
    //       }, 1000);
    //     } else if (enemy.energy > 0) {
    //       this.character.hit(1);
    //       this.healthBar.setPercentage(this.character.energy);
    //     }
    //   }
    // });
    // this.level.boss.forEach((boss) => {
    //   if (this.character.isColliding(boss)) {
    //     this.character.hit(4);
    //     this.healthBar.setPercentage(this.character.energy);
    //   }
    // });

    // this.throwableObjects.forEach((throwBottle) => {
    //   if (this.level.boss[0].isColliding(throwBottle)) {
    //     this.level.boss[0].hit(7);
    //     if (this.level.boss[0].energy < 20) {
    //       this.level.boss[0].energy = 0;
    //     }
    //     this.bossBar.setPercentage(this.level.boss[0].energy);
    //   }
    // });

    // this.level.bottles.forEach((bottle) => {
    //   if (bottle.active && this.character.isColliding(bottle)) {
    //     console.log("flasche aufgesammelt");
    //     bottle.active = false;
    //     this.inventory++;
    //     this.bottleBar.setPercentage(6.25 * this.inventory);
    //   }
    // })
    // this.level.coins.forEach((coin) => {
    //   if (coin.active && this.character.isColliding(coin)) {
    //     console.log("Coin gesammelt");
    //     coin.active = false;
    //     this.coinBar.setPercentage(100);
    //   }
    // })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(this.level.clouds);
    // this.addObjectsToMap(this.level.enemies);
    // this.addToMap(this.level.boss[0]);
    this.addObjectsToMap(this.level.bottles);
    // this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    // Space for fixed Objects
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    if (this.bossActivated) {
      this.addToMap(this.bossBar);
    }
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
    mo.drawFrame(this.ctx);
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
