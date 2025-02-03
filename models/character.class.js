class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 160;
  speed = 10;
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  world;
  walking_sound = new Audio("./audio/pepe/walking.mp3");
  longIdle_sound = new Audio("./audio/pepe/long_idle-snoring.mp3");
  jump_sound = new Audio("./audio/pepe/jump.mp3");
  hurt_sound = new Audio("./audio/pepe/hurt.mp3");
  dying_sound = new Audio("./audio/pepe/dying.mp3");
  jumpHasPlayed = false;
  dyingHasPlayed = false;
  idleFrameCount = 0;
  noMovementTime = 2000;
  idleDelay = 2000;
  longIdleDelay = 10000;

  constructor() {
    super();
    this.previousY = this.y;
    this.loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.getSoundSettings();
    this.animate();
  }

  getSoundSettings() {
    this.walking_sound.playbackRate = 1.3;
    this.walking_sound.volume = 0.6;
    this.hurt_sound.volume = 0.6;
    this.dying_sound.volume = 0.8;
    this.jump_sound.volume = 0.6;
    this.longIdle_sound.volume = 0.8;
  }

  stopSound(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  animate() {
    setInterval(() => {
      this.enableMovement();
    }, 1000 / 60);
    setInterval(() => {
      this.animatePepe();
    }, 160);
  }

  animatePepe() {
    if (!this.world.gameOver) {
      if (this.isDead()) {
        this.wrapUpGame();
      } else if (this.isHurt()) {
        this.playHurtAnimation();
      } else if (this.isAboveGround()) {
        this.playJumpAnimation();
      } else if (this.pepeIsWalking()) {
        this.playWalkingAnimation();
      } else if (this.pepeFellAsleep()) {
        this.playSleepingAnimation();
      } else {
        this.playIdleAnimation();
      }
    }
  }

  enableMovement() {
    let moved = false;
    if (!this.world.gameOver) {
      moved = this.movePepe();
    }
    if (moved) {
      this.noMovementTime = 0;
    } else {
      this.noMovementTime += 1000 / 60;
    }
  };

  movePepe() {
    let moved = false;
    if (this.playerMovesRight()) {
      this.moveRight(false);
      moved = true;
    } else if (this.playerMovesLeft()) {
      this.moveLeft(true);
      moved = true;
    }
    if (this.playerJumps()) {
      this.jumpHasPlayed = false;
      this.jump();
      moved = true;
    }
    this.world.camera_x = -this.x + 80;
    return moved;
  }

  playerMovesRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  playerMovesLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  playerJumps() {
    return this.world.keyboard.UP && this.y == 160;
  }

  wrapUpGame() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_DEAD);
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
    this.world.level.boss[0].status = "alert";
    setTimeout(() => {
      this.world.gameOver = true;
    }, 1000);
  }

  playHurtAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.play();
  }

  playJumpAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_JUMPING);
    if (!this.jumpHasPlayed) {
      this.jump_sound.play();
      this.jumpHasPlayed = true;
    }
  }

  pepeIsWalking() {
    return (
      this.y == 160 && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    );
  }

  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.walking_sound.play();
  }

  pepeFellAsleep() {
    return this.noMovementTime >= this.longIdleDelay;
  }

  playSleepingAnimation() {
    this.stopSound(this.walking_sound);
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.longIdle_sound.play();
  }

  playIdleAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_IDLE, this.idleFrameCount, 2);
    this.idleFrameCount++;
  }
}
