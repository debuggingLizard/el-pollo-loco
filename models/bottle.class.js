class Bottle extends Collectable {
    height = 60;
    width = 30;
    y = 370;

    constructor(x) {
        super();
        this.x = x;
        this.loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }
}