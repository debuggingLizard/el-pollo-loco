class ThrowableObject extends MovableObject {
  constructor() {
    super();
    this.x = 100;
    this.y = 300;
    this.height = 100;
    this.loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.throw(100, 300);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 32;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
