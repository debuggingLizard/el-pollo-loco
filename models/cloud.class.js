class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  constructor(x) {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(false);
    }, 60);

  }
}
