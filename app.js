// grab canvas tag from DOM
const canvas = document.querySelector("canvas");
// make a variable for drawing over the 2d canvas
const c = canvas.getContext("2d");
// setting up canvas here so that I don't have to do math on or remember the dimensions
canvas.width = 1024;
canvas.height = 576;
// loading crab and fish
let crabStill = new Image();
crabStill.src = "views/fishpics/crabStill.png";
let salmonStill = new Image();
salmonStill.src = "views/fishpics/salmonStill.png";
let carpStill = new Image();
carpStill.src = "views/fishpics/uglyfish.png";
let lilStill = new Image();
lilStill.src = "views/fishpics/littlefish.png";
let longFish = new Image();
longFish.src = "views/fishpics/longFish.png";
let strikeLeft = new Image();
strikeLeft.src = "views/fishpics/strikeLeft.png";
let strikeRight = new Image();
strikeRight.src = "views/fishpics/strikeRight.png";
let gameOver = new Image();
gameOver.src = "views/fishpics/gameover.png";
// grabbing the title screen image from the DOM
const aGameBySam = document.querySelector("img");
// animate the color of the title screen
setInterval(() => {
  aGameBySam.style.filter = `hue-rotate(${Math.random() * 360}rad)`;
}, 250);
// removing the starting screen after a delay
setTimeout(() => {
  aGameBySam.style.borderStyle = "none";
  aGameBySam.height = "0px";
}, 3000);
// setting up the game area. starts at 0, 0 and is 1024px x 576px
c.fillRect(0, 0, canvas.width, canvas.height);

// importing classes for everything I'm animating
const {
  gameObject,
  commonFish,
  uglyFish,
  longerFish,
  smallFish,
  strikeArea,
  pointer,
} = require("./models/gameClasses");
// instantiating gameObject to make the player object
const player = new gameObject({
  pos: {
    x: 256,
    // placing the crab on the bottom of the screen
    y: canvas.height - crabStill.height,
  },
  speed: {
    x: 0,
    y: 0,
  },
});
// setting up an array to contain all the fish
const fishContainer = [];
// a function to create x amount of fish
function carpCall(quantity, creature, speed, level) {
  for (let i = 0; i < quantity; i++) {
    // setting a delay between each iteration so that the fish spawn slowly
    setTimeout(() => {
      fishContainer.push(
        new creature({
          pos: {
            x: -128,
            y: level,
          },
          speed: {
            x: speed,
            y: 0,
          },
        })
      );
      // multiply the delay by the current iteration so it applies to each loop
    }, 1000 * i);
  }
}
// summon creatures
carpCall(10, uglyFish, 4, -64);
setInterval(() => {
  carpCall(10, smallFish, 4, -64);
}, 10000);
setInterval(() => {
  carpCall(10, uglyFish, 4, -196);
}, 20000);
setInterval(() => {
  carpCall(1, longerFish, 1, -256);
}, 60000);

// instantiating strikeArea to make a target area object
const strikeSquare = new strikeArea({
  // x-position and speed don't matter because this object is attached to the player
  // y: 192 places the box slightly under the player's claws
  pos: { x: 0, y: 224 },
  speed: { x: 0, y: 0 },
});
// instantiating pointer to create a set of crosshairss
const crosshairs = new pointer({
  // setting the crosshairss inside of the striking area
  pos: { x: player.pos.x, y: player.pos.y - crabStill.height + 64 },
  speed: { x: 0, y: 0 },
});
// keeping track of how many salmon are spawned
reaperSpawned = 0;
// making a function to redraw each frame
function swim() {
  // this calls 'swim' on the next frame of animation so it's an infinite loop
  window.requestAnimationFrame(swim);
  // erasing previous animation frames by painting black over them
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // draw target zone if the player hasn't been dragged offscreen
  if (player.bittenByReaper == false) {
    strikeSquare.move();
  }
  // draw longer fish first, draw longer fish health bar
  for (let i = 0; i < fishContainer.length; i++) {
    if (fishContainer[i].image == longFish) {
      fishContainer[i].drawHealth();
      fishContainer[i].move();
    }
  }
  // draw all fish
  for (let i = 0; i < fishContainer.length; i++) {
    if (fishContainer[i].image != longerFish) {
      fishContainer[i].move();
    }
  }
  // draw crosshairs if the player hasn't been dragged offscreen
  if (player.bittenByReaper == false) {
    crosshairs.move();
    // draw the player
    player.move();
  }
  // add brakes to the player's speed
  if (player.speed.x !== 0) {
    if (player.speed.x > 0) {
      player.speed.x -= Math.abs(player.speed.x) * 0.03;
    } else if (player.speed.x < 0) {
      player.speed.x += Math.abs(player.speed.x) * 0.03;
    }
  }
  // draw the game over screen if the player has been dragged offscreen. strikesquare's position is forced to be offscreen when the player is bitten
  if (strikeSquare.pos.x == canvas.width) {
    c.drawImage(gameOver, 0, 0);
  }
  // update the health and remove small fish when they bite the player
  for (let i = 0; i < fishContainer.length; i++) {
    if (fishContainer[i].biting == true) {
      // grabbing the health <h1> from the DOM
      let health = document.getElementById("health");
      // decrementing it by one heart
      let hearts = health.innerHTML.substring(0, health.innerHTML.length - 1);
      health.innerHTML = hearts;
      // decrementing player object hp value
      player.hp -= 1;
      // salmon aren't deleted when they impact the player
      if (fishContainer[i].image !== salmonStill) {
        // if the salmon is spawned, fish ignore the player
        if (reaperSpawned != 1) {
          fishContainer.splice(i, 1);
        }
      }
      // delete the fish if it exits the game area
      if (
        fishContainer[i].pos.x > canvas.width &&
        fishContainer[i].pos.y > canvas.height
      ) {
        if (fishContainer[i].image == salmonStill) fishContainer.splice(i, 1);
      }
      // if the player's health is 0 and they get another bite, spawn a salmon
      // spawn only one salmon
      if (reaperSpawned < 1) {
        if (player.hp < 1) {
          reaperSpawned += 1;
          // check that the player hasn't already been dragged off the scren
          if (player.bittenByReaper == false) {
            // make things look scary
            window.flashCanvasOff = setInterval(() => {
              document.querySelector("canvas").style.filter = "invert(0)";
            }, 100);
            // make the game window blink inverted colors
            window.flashCanvasOn = setInterval(() => {
              document.querySelector("canvas").style.filter = "invert(70%)";
            }, 1000);

            document.querySelector("ul").style.filter = "brightness(0)";
          }
          fishContainer.push(
            (salmon = new commonFish({
              pos: {
                x: -384,
                y: 0,
              },
              speed: {
                x: 2,
                y: 0,
              },
            }))
          );
          // speed up all the fish if the salmon has been spawned
          if (reaperSpawned == 1) {
            // set an interval to apply to fish that will spawn after the event
            setInterval(() => {
              for (let i = 0; i < fishContainer.length; i++) {
                // with the exception of the salmon
                if (fishContainer[i].image != salmonStill) {
                  // speed up the fish
                  fishContainer[i].speed.x = 10;
                }
              }
            }, 100);
          }
        }
      }
    }
  }
}
swim();
// grabbing the <h3> that holds the score from the DOM
let score = document.getElementById("score");
// starting with a score of 0
let counter = 0;
const playerControls = require("./controller/playerControls");
playerControls(
  canvas,
  crosshairs,
  player,
  fishContainer,
  score,
  counter,
  salmonStill,
  strikeSquare
);
