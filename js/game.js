let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my character is: ", world.character); //oder world['character'] = ist beides das gleiche
  console.log("my enemies are: ", world.enemies);
}

window.addEventListener("keydown", (e) => {
  if (e.key == 'd' || e.key == 'D') {
    keyboard.RIGHT = true;
  }
  if (e.key == 'a' || e.key == 'A') {
    keyboard.LEFT = true;
  }
  if (e.key == 'w' || e.key == 'W') {
    keyboard.UP = true;
  }
  if (e.key == 's' || e.key == 'S') {
    keyboard.DOWN = true;
  }
  if (e.key == ' ') {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == 'd' || e.key == 'D') {
    keyboard.RIGHT = false;
  }
  if (e.key == 'a' || e.key == 'A') {
    keyboard.LEFT = false;
  }
  if (e.key == 'w' || e.key == 'W') {
    keyboard.UP = false;
  }
  if (e.key == 's' || e.key == 'S') {
    keyboard.DOWN = false;
  }
  if (e.key == ' ') {
    keyboard.SPACE = false;
  }
})
