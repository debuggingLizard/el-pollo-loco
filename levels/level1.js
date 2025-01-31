function createNewLevel() {
  return level1 = new Level(
    [
      new Bottle(700),
      new Bottle(760),
      new Bottle(820),
  
      new Bottle(1400),
      new Bottle(1460),
  
      new Bottle(2000),
      new Bottle(2060),
  
      new Bottle(2880),
  
      new Bottle(3800),
      new Bottle(3860),
  
      new Bottle(4460),
  
      new Bottle(6000),
      new Bottle(6060),
  
      new Bottle(6140),
      new Bottle(7240),
  
      new Bottle(9700),
    ],
    [
      new Coin(600, 120),
      new Coin(660, 100),
  
      new Coin(1000, 140),
  
      new Coin(1600, 90),
      new Coin(1660, 100),
      new Coin(1720, 110),
  
      new Coin(2400, 80),
  
      new Coin(3000, 80),
  
      new Coin(4000, 80),
      new Coin(4060, 100),
  
      new Coin(5600, 110),
      new Coin(5660, 90),
      new Coin(8000, 220),
  
      new Coin(9500, 200),
      new Coin(9560, 200),
      new Coin(9620, 200),
    ],
    [
      new Chicken(640),
      new Chicken(640),
  
      new Chicken(1200),
      new Chicken(1200),
  
      new Chicken(1600),
  
      new Chicken(2200),
      new Chicken(2200),
      new Chicken(2200),
  
      new Chicken(3000),
      new Chicken(3000),
  
      new Chicken(3600),
  
      new Chicken(4400),
      new Chicken(4400),
  
      new Chicken(6200),
      new Chicken(6200),
      new Chicken(6200),
  
      new Chicken(6800),
      new Chicken(6800),
  
      new Chicken(7400),
  
      new Chicken(8200),
      new Chicken(8200),
      new Chicken(8200),
    ],
    [
      new Chick(600),
      new Chick(640),
      new Chick(640),
  
      new Chick(1000),
      new Chick(1000),
      new Chick(1000),
  
      new Chick(2440),
      new Chick(2460),
      new Chick(2480),
  
      new Chick(3400),
      new Chick(3400),
  
      new Chick(4200),
      new Chick(4300),
      new Chick(4200),
  
      new Chick(5600),
      new Chick(5600),
      new Chick(5600),
  
      new Chick(6400),
      new Chick(6600),
      new Chick(6800),
  
      new Chick(7800),
      new Chick(7800),
      new Chick(7800),
    ],
    [new Endboss()],
    [new Cloud(400),
      new Cloud(1200),
      new Cloud(2000),
      new Cloud(2800),
      new Cloud(3800),
      new Cloud(5000),
      new Cloud(6200),
      new Cloud(7100),
      new Cloud(7800),
      new Cloud(8400),
      new Cloud(9000),
      new Cloud(9600),
    ],
    [
      new BackgroundObject("./img/5_background/layers/air.png", -80),
      new BackgroundObject("./img/5_background/layers/air.png", 1359),
      new BackgroundObject("./img/5_background/layers/air.png", 2798),
      new BackgroundObject("./img/5_background/layers/air.png", 4237),
      new BackgroundObject("./img/5_background/layers/air.png", 5676),
      new BackgroundObject("./img/5_background/layers/air.png", 7115),
      new BackgroundObject("./img/5_background/layers/air.png", 8554),
      new BackgroundObject("./img/5_background/layers/air.png", 9993),
  
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        -80
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        1360
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        2800
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        4240
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        5680
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        7120
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        8560
      ),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        10000
      ),
  
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        -80
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        1360
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        2800
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        4240
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        5680
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        7120
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        8560
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        10000
      ),
  
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        -80
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        1360
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        2800
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        4240
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        5680
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        7120
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        8560
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        10000
      ),
    ]
  );
}

createNewLevel();
