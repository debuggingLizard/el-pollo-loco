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

  /**
   * Checks if current object is colliding (overlapping) with another movable object (mo).
   * 
   * @param {Object} mo - The other movable object to check collision with.
   * - checks if object is colliding with mo on the right side (x + width)
   * - checks if object is colliding with mo on the left side (x)
   * - checks if object is colliding with mo on the bottom side (y + height)
   * - checks if object is colliding with mo on the top side (y)
   * @returns {boolean} True if this object is colliding with the other object, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width> mo.x && 
      this.x < mo.x + mo.width && 
      this.y + this.height> mo.y && 
      this.y + 70 < mo.y + mo.height 
    );
  }

  /**
   * Checks if the current object is jumping on (colliding/overlapping from above) another movable object (mo).
   *
   * @param {Object} mo - The movable object to check against.
   * - checks if bottom side of object is below top side of mo (y + height >= mo.y)
   * - checks if bottom side of object is above bottom side of mo (y + height <= mo.y + mo.height)
   * - checks if bottom side of object was above top side of mo in the previous frame (previousY + height <= mo.y) (to ensure object is actually colliding from above)
   * - checks if right side of object is right of left side of mo (x + width > mo.x) (to ensure object is completely jumping above mo)
   * - checks if left side of object is left of right side of mo (x < mo.x + mo.width) (to ensure object is completely jumping above mo)
   * @returns {boolean} - Returns true if the current object is jumping on the specified movable object, otherwise false.
   */
  isJumpingOn(mo) {
    return (
      this.y + this.height >= mo.y &&
      this.y + this.height <= mo.y + mo.height &&
      this.previousY + this.height <= mo.y &&
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width
    );
  }

  /**
   * Updates the previous Y-coordinate to the current Y-coordinate.
   * Necessary for checking jumping-on collisions.
   */
  updatePreviousY() {
    this.previousY = this.y;
  }

  /**
   * Reduces the energy of the object by the specified damage amount if the object is not currently invincible.
   * If the energy drops to 0 or below, it is set to 0 (to avoid negative values)
   * If the object takes damage, it becomes invincible for a specified duration.
   *
   * @param {number} damage - The amount of damage to inflict on the object.
   */
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

  /**
   * Checks if the object is currently hurt.
   * 
   * This method calculates the time passed since the last hit and determines
   * if it is less than 1 second. If the time passed is less than 1 second,
   * the object is considered to be hurt.
   * 
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; 
    timePassed = timePassed / 1000; 
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead.
   * 
   * @returns {boolean} True if the object's energy is 0, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation by cycling through a set of images.
   *
   * @param {string[]} images - An array of image paths to be used in the animation.
   * @param {number} [frameCount=null] - The current frame count. If null, the animation will play on every call.
   * @param {number} [frameDelay=1] - The delay between frames. The animation will update every `frameDelay` calls.
   */
  playAnimation(images, frameCount = null, frameDelay = 1) {
    if (frameCount == null || frameCount % frameDelay == 0) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  /**
   * Moves the object to the right by increasing its x-coordinate by the object's speed.
   * Also sets the visual direction of the object.
   *
   * @param {boolean} bool - A boolean indicating the visual direction of the object.
   */
  moveRight(bool) {
    this.x += this.speed;
    this.otherDirection = bool;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate by the object's speed.
   * Also sets the visual direction of the object.
   *
   * @param {boolean} bool - A boolean indicating the visual direction of the object.
   */
  moveLeft(bool) {
    this.x -= this.speed;
    this.otherDirection = bool;
  }

  /**
   * Applies gravity to the object by continuously adjusting its vertical position (y) and speed (speedY).
   * The method uses setInterval to repeatedly check if the object is above the ground or moving upwards,
   * and then updates the object's position and speed accordingly.
   * 
   * The interval is set to 40 milliseconds (1000 / 25), which means the gravity effect is applied 25 times per second.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * 
   * This method determines if the object is either an instance of ThrowableObject,
   * is dead, or its y-coordinate is less than 160.
   * 
   * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this.isDead()) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  /**
   * Makes the object jump by setting its vertical speed.
   * This method sets the `speedY` property to 28, causing the object to move upwards.
   */
  jump() {
    this.speedY = 28;
  }
}
