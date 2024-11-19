class Level {
    bottles;
    coins;
    enemies; 
    enemiesSmall;
    boss;
    clouds;
    backgroundObjects;
    level_end_x = 10000;

    constructor(bottles, coins, enemies, enemiesSmall, boss, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.enemiesSmall = enemiesSmall;
        this.boss = boss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}