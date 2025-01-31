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
      this.x + this.width> mo.x && //rechts
      this.x < mo.x + mo.width && //links
      this.y + this.height> mo.y && //unten
      this.y + 70 < mo.y + mo.height //oben
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

  hit(damage) {
    if (!this.invincible) {
      this.energy -= damage;
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
    let timePassed = new Date().getTime() - this.lastHit; 
    timePassed = timePassed / 1000; 
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images, frameCount = null, frameDelay = 1) {
    if (frameCount == null || frameCount % frameDelay == 0) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
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
    if (this instanceof ThrowableObject || this.isDead()) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  jump() {
    this.speedY = 28;
  }
}
