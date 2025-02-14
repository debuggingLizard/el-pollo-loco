class Collectable extends MovableObject {
  collectSoundHasPlayed = false;

  constructor() {
    super();
  }

  /**
   * Periodically checks if the item has been collected and plays a sound if it has.
   * The check is performed every 160 milliseconds.
   * 
   * @method checkItemCollection
   * @memberof CollectableObject
   */
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
