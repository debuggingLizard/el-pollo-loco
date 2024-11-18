class World {
  character = new Character();
  bottleBar = new BottleBar();
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  throwableObjects = [];
  inventory = 0;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.character.updatePreviousY();
    }, 60);
  }

  checkThrowObjects() {
    if (this.keyboard.ENTER && this.inventory > 0) {
      this.inventory--;
      let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 130);
      this.throwableObjects.push(bottle);
      this.bottleBar.setPercentage(6.25 * this.inventory);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (enemy.active && this.character.isColliding(enemy)) {
        if (this.character.isJumpingOn(enemy)) {
          console.log("character ist auf enemy gesprungen und hat ihn besiegt");
          enemy.energy = 0;
          console.log(enemy.energy);
          setTimeout(() => {
            enemy.active = false;
          }, 1000);
        } else if (enemy.energy > 0) {
          this.character.hit();
          this.healthBar.setPercentage(this.character.energy);
        }
      }
    });
    // this.level.bottles.forEach((bottle, index) => {
    //   if (bottle.active && this.character.isColliding(bottle)) {
    //     console.log("flasche aufgesammelt");
    //     bottle.active = false;
    //     this.inventory++;
    //     this.bottleBar.setPercentage(6.25 * this.inventory);
    //   }
    // })
    // this.level.coins.forEach((coin, index) => {
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
    this.addObjectsToMap(this.level.enemies);
    // this.addObjectsToMap(this.level.bottles);
    // this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    // Space for fixed Objects
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
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
