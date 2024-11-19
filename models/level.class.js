class Level {
    bottles;
    coins;
    enemies; 
    boss;
    clouds;
    backgroundObjects;
    level_end_x = 10000;

    constructor(bottles, coins, enemies, boss, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.boss = boss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}