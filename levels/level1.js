const level1 = new Level(
  [
    new Bottle(340),
    new Bottle(370),
    new Bottle(400),

    new Bottle(500),
    new Bottle(530),

    new Bottle(630),
    new Bottle(660),
    new Bottle(690),
    new Bottle(720),

    new Bottle(820),
    new Bottle(850),

    new Bottle(950),

    new Bottle(1050),
    new Bottle(1080),

    new Bottle(1180),
    new Bottle(1210),
  ],
  [new Coin(340, 200)],
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
  [
    new BackgroundObject("../img/5_background/layers/air.png", -80),
    new BackgroundObject("../img/5_background/layers/air.png", 1359),
    new BackgroundObject("../img/5_background/layers/air.png", 2798),
    new BackgroundObject(
      "../img/5_background/layers/3_third_layer/full.png",
      -80
    ),
    new BackgroundObject(
      "../img/5_background/layers/3_third_layer/full.png",
      1360
    ),
    new BackgroundObject(
      "../img/5_background/layers/3_third_layer/full.png",
      2800
    ),
    new BackgroundObject(
      "../img/5_background/layers/2_second_layer/full.png",
      -80
    ),
    new BackgroundObject(
      "../img/5_background/layers/2_second_layer/full.png",
      1360
    ),
    new BackgroundObject(
      "../img/5_background/layers/2_second_layer/full.png",
      2800
    ),
    new BackgroundObject(
      "../img/5_background/layers/1_first_layer/full.png",
      -80
    ),
    new BackgroundObject(
      "../img/5_background/layers/1_first_layer/full.png",
      1360
    ),
    new BackgroundObject(
      "../img/5_background/layers/1_first_layer/full.png",
      2800
    ),
  ]
);
