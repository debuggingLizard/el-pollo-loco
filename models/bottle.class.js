class Bottle extends Collectable {
    height = 80;
    width = 60;
    y = 350;

    constructor(x) {
        super();
        this.x = x;
        this.loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }
}