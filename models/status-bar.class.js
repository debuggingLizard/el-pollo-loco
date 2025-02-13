class StatusBar extends DrawableObject {
  IMAGES = [];
  percentage = 100;

  constructor() {
    super();
    this.x = 20;
    this.width = 140;
    this.height = 40;
  }

  /**
   * Sets the percentage value and updates the image based on the resolved image index.
   * 
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current percentage.
   * - status bars come in 6 varieties, each representing a percentage range (e.g. 0-19%, 20-39%, etc.)
   * - the image index is determined by the percentage range the current percentage falls into
   * 
   * @returns {number} The image index corresponding to the percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
