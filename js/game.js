let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("my character is: ", world.character); //oder world['character'] = ist beides das gleiche
  console.log("my enemies are: ", world.enemies);
  
}

