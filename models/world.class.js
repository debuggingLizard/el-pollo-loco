class World {

    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
        // for (let i = 0; i < this.enemies.length; i++) {
        //     this.ctx.drawImage(this.enemies[i].img, this.enemies[i].x + 50, this.enemies[i].y + 50, this.enemies[i].width, this.enemies[i].height)
        // }

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x + 50 , enemy.y + 50, enemy.width, enemy.height)
        });
    }
}
