class Chick extends MovableObject {
  y = 388;
  height = 30;
  width = 30;
  world;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  dying_sound = new Audio("./audio/enemies/chick_dead.mp3");
  dyingHasPlayed = false;

  constructor(start) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = start + Math.random() * 600;
    this.speed = 0.4 + Math.random() * 0.25;
    this.animate();
    this.active = true;
  }

  /**
   * Animates the chick by setting up two intervals:
   * - One interval runs at 60 frames per second to make the chick follow Pepe.
   * - Another interval runs every 150 milliseconds to animate the chick.
   * 
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.followPepe();
    }, 1000 / 60);
    setInterval(() => {
      this.animateChick();
    }, 150);
  }

  /**
   * Makes the chick follow Pepe (the main character).
   * If the chick is not dead and the world is defined, it will move left if it is to the right of Pepe, otherwise it will move right.
   * 
   * @method followPepe
   */
  followPepe() {
    if (!this.isDead()) {
      if (this.world && this.x >= this.world.character.x) {
        this.moveLeft(false);
      } else {
        this.moveRight(true);
      }
    }
  }

  /**
   * Animates the chick based on its current state.
   * If the chick is dead, it plays the dying animation.
   * Otherwise, it plays the walking animation.
   * 
   * @method animateChick
   */
  animateChick() {
    if (this.isDead()) {
      this.playDyingAnimation();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the dying animation for the chick.
   * Loads the image of the dead chick and plays the dying sound.
   * 
   * @method playDyingAnimation
   */
  playDyingAnimation() {
    this.loadImage("./img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.playDyingSound();
  }

  /**
   * Plays the dying sound if it has not been played yet.
   * Sets the flag `dyingHasPlayed` to true after playing the sound to ensure the sound is only played once.
   * 
   * @method playDyingSound
   */
  playDyingSound() {
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
  }
}
