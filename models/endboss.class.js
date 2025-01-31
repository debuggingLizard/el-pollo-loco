class Endboss extends MovableObject {
  height = 400;
  width = 250;
  x = 9750;
  y = 60;
  speed = 2.4;
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

  startAlert() {
    setTimeout(() => {
      this.status = "attack";
    }, 2000);
  }

  animate() {
    setInterval(() => {
      if (this.bossIsAwake()) {
        this.followPepe();
      }
    }, 1000 / 60);
    setInterval(() => {
      this.animateBoss();
    }, 200);
  }

  animateBoss() {
    if (this.isDead()) {
      this.wrapUpGame();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.bossIsInactive()) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.bossAttacks()) {
      this.speed = 6;
      this.playAnimation(this.IMAGES_ATTACK);
      setTimeout(() => {
        this.speed = 2.4;
      }, 1000);
    } else if (this.bossIsActive()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  bossIsAwake() {
    return this.status == "attack" && !this.isDead();
  }

  followPepe() {
    if (this.x >= this.world.character.x + 4) {
      this.moveLeft(false);
    } else if (this.x <= this.world.character.x - 4) {
      this.moveRight(true);
    } else {
      this.standStill();
    } 
  }

  standStill() {
    this.x += 0;
  }

  wrapUpGame() {
    this.boss_sound.pause();
    if (!this.dyingHasPlayed) {
      this.dying_sound.play();
      this.dyingHasPlayed = true;
    }
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.gameOver = true;
    }, 1600);
  }

  bossIsInactive() {
    return this.status == "alert";
  }

  bossAttacks() {
    return this.status == "attack" && Math.abs(this.x - this.world.character.x) < 180;
  }

  bossIsActive() {
    return this.status == "attack";
  }
}
