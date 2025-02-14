class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  world;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  dying_sound = new Audio("./audio/enemies/chicken_dead.mp3");
  dyingHasPlayed = false;

  constructor(start) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = start + Math.random() * 600;
    this.speed = 0.4 + Math.random() * 0.25;
    this.animate();
    this.active = true;
    this.dying_sound.volume = 0.4;
  }

  /**
   * Animates the chicken by setting up two intervals:
   * - One interval runs at 60 frames per second to make the chicken follow Pepe.
   * - Another interval runs every 150 milliseconds to animate the chicken.
   * 
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.followPepe();
    }, 1000 / 60);
    setInterval(() => {
      this.animateChicken();
    }, 150);
  }

  /**
   * Makes the chicken follow the character "Pepe" in the game world.
   * If the chicken is not dead and the world is defined, it will move left if it is to the right of the character, otherwise, it will move right.
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
   * Animates the chicken based on its current state.
   * If the chicken is dead, it plays the dying animation.
   * Otherwise, it plays the walking animation.
   * 
   * @method animateChicken
   */
  animateChicken() {
    if (this.isDead()) {
      this.playDyingAnimation();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the dying animation for the chicken.
   * Loads the image of the dead chicken and plays the dying sound.
   * 
   * @method playDyingAnimation
   */
  playDyingAnimation() {
    this.loadImage("./img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    this.playDyingSound();
  }

  /**
   * Plays the dying sound for the chicken if it hasn't been played already.
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
