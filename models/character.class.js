class Character extends MovableObject {
  height = 320;
  width = 150;
  y = 110;
  speed = 10;
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];
  world;
  walking_sound = new Audio("../audio/running.mp3");

  constructor() {
    super();
    this.loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight(false);
        if (this.walking_sound.paused) {
          this.walking_sound.currentTime = 0;
          this.walking_sound.play();
        }
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft(true);
        if (this.walking_sound.paused) {
          this.walking_sound.currentTime = 0;
          this.walking_sound.play();
        }
      } else {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
      }

      if (this.world.keyboard.UP && this.y == 110) {
        this.jump();
      }
      this.world.camera_x = -this.x + 80;
    }, 1000 / 60);
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      if (this.y == 110 && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 90);
  }

}
