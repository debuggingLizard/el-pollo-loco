class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;

  loadImage(path) {
    this.img = new Image(); //<img>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      // rechte Seite mit linke Seite von mo vergleichen
      this.x + this.width > mo.x &&
      // untere Seite mit obere Seite von mo vergleichen
      this.y + this.height > mo.y &&
      // linke Seite mit linke Seite von mo vergleichen
      this.x < mo.x &&
      // obere Seite mit untere Seite von mo vergleichen
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5; 
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    // 0, 1, 2, 3, 4, 5, 0, 1, 2, ....
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight(bool) {
    this.x += this.speed;
    this.otherDirection = bool;
  }

  moveLeft(bool) {
    this.x -= this.speed;
    this.otherDirection = bool;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 110;
  }

  jump() {
    this.speedY = 28;
  }
}
