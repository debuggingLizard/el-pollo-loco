class Introscreen extends DrawableObject {
  width = 720;
  height = 480;
  y = 0;
  // x = 0;

  IMAGES_INTRO = [
    "./img/9_intro_outro_screens/start/startscreen_1.png",
    "./img/9_intro_outro_screens/start/startscreen_2.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_INTRO[0]);
    this.loadImages(this.IMAGES_INTRO);
  }
}
