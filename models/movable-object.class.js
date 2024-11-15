class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;
  invincible = false;
  invincibilityDuration = 1000;
  previousY;

  constructor() {
    super();
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }

  isJumpingOn(mo) {
    return (
      this.y + this.height >= mo.y &&
      this.y + this.height <= mo.y + mo.height &&
      this.previousY + this.height <= mo.y &&
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width
    );
  }

  updatePreviousY() {
    this.previousY = this.y;
  }

  hit() {
    if (!this.invincible) { //wenn invincible = false
      this.energy -= 1;
      console.log((this.energy));
      if (this.energy <= 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        this.invincible = true;
        setTimeout(() => {
          this.invincible = false;
        }, this.invincibilityDuration);
      }
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //difference in milliseconds
    timePassed = timePassed / 1000; //in seconds
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    // 0, 1, 2, 3, 4, 5, 0, 1, 2, ....
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight(bool) {
    this.x += this.speed;
    this.otherDirection = bool;
  }

  moveLeft(bool) {
    this.x -= this.speed;
    this.otherDirection = bool;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 110;
    }
  }

  jump() {
    this.speedY = 28;
  }
}
