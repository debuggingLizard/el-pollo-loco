class Coin extends Collectable {
  height = 40;
  width = 40;
  IMAGES_COIN = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 400);
  }
}
