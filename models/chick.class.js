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

  animate() {
    setInterval(() => {
      this.followPepe();
    }, 1000 / 60);
    setInterval(() => {
      this.animateChick();
    }, 150);
  }

  followPepe() {
    if (!this.isDead()) {
      if (this.world && this.x >= this.world.character.x) {
        this.moveLeft(false);
      } else {
        this.moveRight(true);
      }
    }
  }

  animateChick() {
    if (this.isDead()) {
      this.playDyingAnimation();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  playDyingAnimation() {
    this.loadImage("./img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    this.playDyingSound();
  }

  playDyingSound() {
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
  }
}
