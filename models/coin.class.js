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
    this.collect_sound = new Audio("./audio/world/coin.mp3");
    this.collect_sound.volume = 0.8;
    this.checkItemCollection();
  }

  /**
   * Animates the coin by playing its animation at a set interval.
   * The animation is played using the images defined in `this.IMAGES_COIN`.
   * The interval for the animation is set to 400 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 400);
  }
}
