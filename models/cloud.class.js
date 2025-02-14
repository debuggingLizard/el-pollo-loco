class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  constructor(x) {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left at a regular interval.
   * The cloud moves left every 60 milliseconds.
   * 
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.moveLeft(false);
    }, 60);
  }
}
