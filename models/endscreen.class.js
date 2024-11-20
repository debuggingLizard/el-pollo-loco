class Endscreen extends DrawableObject {
    width;
    height;
    y = 10;
    // x = 0; 

    constructor(path, width, height, y) {
        super();
        this.loadImage(path);
        this.width = width;
        this.height = height;
        this.y = y;
    }
}