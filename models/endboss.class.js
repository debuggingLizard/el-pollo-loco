class Endboss extends MovableObject {
  height = 400;
  width = 250;
  x = 9750;
  y = 60;
  speed = 2.8;
  status;
  world;
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  boss_sound = new Audio("./audio/enemies/boss_chicken.mp3");
  dying_sound = new Audio("./audio/enemies/boss_chicken_dead.mp3");
  dyingHasPlayed = false;

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.status = "alert";
    this.animate();
  }

  /**
   * Initiates an alert that changes the status of the end boss to "attack"
   * and activates the ability to throw objects after a delay of 2 seconds.
   *
   * @method startAlert
   */
  startAlert() {
    setTimeout(() => {
      this.status = "attack";
      this.world.canThrow = true;
    }, 2000);
  }

  /**
   * Animates the end boss by setting up two intervals:
   * - One interval runs at 60 frames per second to make the boss follow Pepe.
   * - Another interval runs every 200 milliseconds to animate the boss.
   * 
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.followPepe();
    }, 1000 / 60);
    setInterval(() => {
      this.animateBoss();
    }, 200);
  }

  /**
   * Animates the boss character based on its current state.
   *
   * The animation changes depending on whether the boss is dead, hurt, inactive, attacking, or active.
   * - If the boss is dead, it wraps up the game.
   * - If the boss is hurt, it plays the hurt animation.
   * - If the boss is inactive, it plays the alert animation.
   * - If the boss is attacking, it plays the attack animation.
   * - If the boss is active, it plays the walking animation.
   * 
   * @method animateBoss
   */
  animateBoss() {
    if (this.isDead()) {
      this.wrapUpGame();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.bossIsInactive()) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.bossAttacks()) {
      this.playAttackAnimation();
    } else if (this.bossIsActive()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Checks if the boss is awake and in attack mode.
   *
   * @method bossIsAwake
   * @returns {boolean} True if the boss is in attack mode and not dead, otherwise false.
   */
  bossIsAwake() {
    return this.status == "attack" && !this.isDead();
  }

  /**
   * Makes the boss follow the character (Pepe) if the boss is awake.
   * The boss will move left or right depending on the character's position.
   * If the boss is close enough to the character, it will stand still.
   * 
   * @method followPepe
   */
  followPepe() {
    if (this.bossIsAwake()) {
      if (this.x >= this.world.character.x + 4) {
        this.moveLeft(false);
      } else if (this.x <= this.world.character.x - 4) {
        this.moveRight(true);
      } else {
        this.standStill();
      }
    }
  }

  /**
   * Keeps the end boss in the same position without moving.
   * 
   * @method standStill
   */
  standStill() {
    this.x += 0;
  }

  /**
   * Ends the game by pausing the boss sound, playing the dying sound and animation,
   * and setting the game over state after a delay.
   * 
   * @method wrapUpGame
   */
  wrapUpGame() {
    this.boss_sound.pause();
    this.playDyingSound();
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.gameOver = true;
    }, 1600);
  }

  /**
   * Plays the dying sound for the end boss if it hasn't been played already.
   * This method ensures that the dying sound is only played once.
   * 
   * @method playDyingSound
   */
  playDyingSound() {
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
  }

  /**
   * Checks if the boss is inactive.
   *
   * @method bossIsInactive
   * @returns {boolean} True if the boss's status is "alert", otherwise false.
   */
  bossIsInactive() {
    return this.status == "alert";
  }

  /**
   * Checks if the boss is in attack mode and within a certain distance from the character.
   *
   * @method bossAttacks
   * @returns {boolean} True if the boss is attacking and within 220 units of the character, otherwise false.
   */
  bossAttacks() {
    return (
      this.status == "attack" && Math.abs(this.x - this.world.character.x) < 220
    );
  }

  /**
   * Plays the attack animation for the end boss.
   * Temporarily increases the speed to 8 for the duration of the attack animation,
   * then resets the speed back to 2.8 after 1 second.
   * 
   * @method playAttackAnimation
   */
  playAttackAnimation() {
    this.speed = 8;
    this.playAnimation(this.IMAGES_ATTACK);
    setTimeout(() => {
      this.speed = 2.8;
    }, 1000);
  }

  /**
   * Checks if the boss is currently in attack mode.
   *
   * @method bossIsActive
   * @returns {boolean} True if the boss is in attack mode, otherwise false.
   */
  bossIsActive() {
    return this.status == "attack";
  }
}
