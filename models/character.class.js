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

  /**
   * Stops the given audio by pausing it and resetting its current time to 0.
   * 
   * @param {HTMLAudioElement} audio - The audio element to stop.
   */
  stopSound(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  /**
   * Adjusts the playback rate and volume settings for various character sounds.
   */
  getSoundSettings() {
    this.walking_sound.playbackRate = 1.3;
    this.walking_sound.volume = 0.6;
    this.hurt_sound.volume = 0.6;
    this.dying_sound.volume = 0.8;
    this.jump_sound.volume = 0.6;
    this.longIdle_sound.volume = 0.8;
  }

  /**
   * Starts the animation for the character by setting up two intervals:
   * - One interval runs at 60 frames per second to enable movement.
   * - Another interval runs every 160 milliseconds to animate the character.
   */
  animate() {
    setInterval(() => {
      this.enableMovement();
    }, 1000 / 60);
    setInterval(() => {
      this.animatePepe();
    }, 160);
  }

  /**
   * Enables the movement of the character while the game is running. 
   * Sets the noMovementTime (necessary for the sleeping animation) dependent on the character's movement.
   * noMovementTime increases if character does not move, otherwise it resets to 0.
   */
  enableMovement() {
    if (!this.world.gameOver) {
      let moved = this.movePepe();
      this.noMovementTime = moved ? 0 : this.noMovementTime + 1000 / 60;
    }
  };

  /**
   * Moves the character Pepe by handling horizontal and jump movements.
   * Updates the camera position accordingly.
   * 
   * @returns {boolean} - Returns true if any movement occurred, otherwise false.
   */
  movePepe() {
    let moved = false;
    moved = this.horizontalMovement() || moved;
    moved = this.jumpMovement() || moved;
    this.updateCameraposition();
    return moved;
  }

  /**
   * Handles the horizontal movement of the character.
   * Checks if the player is moving right or left and updates the character's position accordingly.
   * 
   * @returns {boolean} - Returns true if the character moved, otherwise false.
   */
  horizontalMovement() {
    let moved = false;
    if (this.playerMovesRight()) {
      this.moveRight(false);
      moved = true;
    } else if (this.playerMovesLeft()) {
      this.moveLeft(true);
      moved = true;
    }
    return moved;
  }

  /**
   * Handles the jump movement of the character.
   * 
   * @returns {boolean} - Returns true if the character has jumped, otherwise false.
   */
  jumpMovement() {
    let moved = false;
    if (this.playerJumps()) {
      this.jumpHasPlayed = false;
      this.jump();
      moved = true;
    }
    return moved;
  }

  /**
   * Updates the camera position based on the character's current x-coordinate.
   * Adjusts the world's camera_x property to follow the character.
   */
  updateCameraposition() {
    this.world.camera_x = -this.x + 80;
  }

  /**
   * Checks if the player is moving to the right.
   * 
   * @returns {boolean} True if the right arrow key is pressed and the player has not reached the end of the level, otherwise false.
   */
  playerMovesRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks if the player is moving left and if the player's position is greater than 0.
   * 
   * @returns {boolean} True if the player is pressing the left key and the player's x position is greater than 0, otherwise false.
   */
  playerMovesLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the player is attempting to jump.
   * 
   * @returns {boolean} True if the player is pressing the UP key and the player's y-coordinate is 160, otherwise false.
   */
  playerJumps() {
    return this.world.keyboard.UP && this.y == 160;
  }

  /**
   * Animates the character "Pepe" based on its current state.
   * The animation will vary depending on whether the game is over,
   * the character is dead, hurt, above ground, walking, or asleep.
   * If none of these conditions are met, the idle animation will be played.
   */
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

  /**
   * Ends the game by stopping character sounds, playing the death animation and sound,
   * setting the boss to inactive, and marking the game as over after a delay.
   */
  wrapUpGame() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_DEAD);
    this.playDyingSound();
    this.setBossInactive();
    setTimeout(() => {
      this.world.gameOver = true;
    }, 1000);
  }

  /**
   * Plays the dying sound if it hasn't been played already.
   * This method ensures that the dying sound is only played once.
   */
  playDyingSound() {
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
  }

  /**
   * Sets the status of the boss character in the game world to "alert" (the default state of the boss).
   */
  setBossInactive() {
    this.world.level.boss[0].status = "alert";
  }

  /**
   * Plays the hurt animation for the character.
   * Stops the walking and long idle sounds, plays the hurt animation, and plays the hurt sound.
   */
  playHurtAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.play();
  }

  /**
   * Plays the jump animation for the character.
   * 
   * This method stops any currently playing walking or long idle sounds,
   * then plays the jump animation and the associated jump sound.
   */
  playJumpAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_JUMPING);
    this.playJumpSound();
  }

  /**
   * Plays the jump sound if it hasn't been played yet.
   * Sets the `jumpHasPlayed` flag to true after playing the sound.
   */
  playJumpSound() {
    if (!this.jumpHasPlayed) {
      this.jump_sound.play();
      this.jumpHasPlayed = true;
    }
  }

  /**
   * Checks if Pepe (the character) is walking.
   * 
   * @returns {boolean} True if Pepe is at y-coordinate 160 and either the RIGHT or LEFT keyboard key is pressed.
   */
  pepeIsWalking() {
    return (
      this.y == 160 && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    );
  }

  /**
   * Plays the walking animation for the character.
   * This method triggers the walking animation sequence and plays the walking sound.
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.walking_sound.play();
  }

  /**
   * Checks if Pepe has fallen asleep based on the duration of no movement.
   * 
   * @returns {boolean} True if the no movement time is greater than or equal to the long idle delay, otherwise false.
   */
  pepeFellAsleep() {
    return this.noMovementTime >= this.longIdleDelay;
  }

  /**
   * Plays the sleeping animation for the character.
   * Stops the walking sound, plays the long idle animation, and plays the long idle sound.
   */
  playSleepingAnimation() {
    this.stopSound(this.walking_sound);
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.longIdle_sound.play();
  }

  /**
   * Plays the idle animation for the character.
   * Stops the walking and long idle sounds, then plays the idle animation.
   * Increments the idle frame count after playing the animation.
   */
  playIdleAnimation() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.longIdle_sound);
    this.playAnimation(this.IMAGES_IDLE, this.idleFrameCount, 2);
    this.idleFrameCount++;
  }
}
