class Coin extends Collectable {
  height = 100;
  width = 100;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage("../img/8_coin/coin_1.png")
  }
}
