class Collectable extends MovableObject {
  collectSoundHasPlayed = false;

  constructor() {
    super();
  }

  checkItemCollection() {
    setInterval(() => {
      if (!this.active) {
        if (!this.collectSoundHasPlayed) {
          this.collect_sound.play();
          this.collectSoundHasPlayed = true;
        }
      }
    }, 160);
  }
}
