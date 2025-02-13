class ThrowableObject extends MovableObject {
  IMAGES_THROW = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SMASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  bossIsHit = false;
  smash_sound = new Audio("./audio/world/bottle_smash.mp3");
  soundHasPlayed = false;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.height = 100;
    this.loadImage(this.IMAGES_THROW[0]);
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SMASH);
    this.throw();
  }

  /**
   * Initiates the throw action for the throwable object.
   * Sets the initial vertical speed and applies gravity.
   * Moves the object horizontally at a constant rate.
   * Animates the throw action at regular intervals.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
    setInterval(() => {
      this.animateThrow();
    }, 60);
  }

  /**
   * Animates the throw action of the object.
   * If the boss is not hit, it plays the throw animation.
   * If the boss is hit, it plays the smash sound.
   */
  animateThrow() {
    if (!this.bossIsHit) {
      this.playAnimation(this.IMAGES_THROW);
    } else {
      this.playSmashSound();
    }
  }

  /**
   * Plays the smash sound if it hasn't been played already.
   * This method ensures that the smash sound is only played once.
   */
  playSmashSound() {
    if (!this.soundHasPlayed) {
      this.smash_sound.play();
      this.soundHasPlayed = true;
    }
  }
}
