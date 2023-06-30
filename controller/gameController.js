function gameController(
  canvas,
  crosshairs,
  player,
  fishContainer,
  score,
  counter,
  salmonStill,
  strikeSquare
) {
  // adding a listener for player mousewheel
  function handleWheel(event) {
    let scroll = event.deltaY;
    // if player is rolling the mousewheel up:
    if (scroll > 0) {
      // scrolling more means more pixels moved. it's negative in one direction, so I'm taking the absolute value of pixels scrolled (ie -40px or +90px) to make the player's speed somewhat proportionate to the mousewheel movement. multiplying by 0.05 gives just a little movement
      player.speed.x = Math.abs(scroll) * -0.05;
      // if player is rolling the mousehweel down:
    } else if (scroll < 0) {
      // same thing but with a positive * 0.05
      player.speed.x = Math.abs(scroll) * 0.05;
    }
  }

  function handleKeyPress(event) {
    // adding WASD controls for crosshairs
    document.addEventListener("keypress", function (event) {
      if (event.key === "w") {
        crosshairs.speed.y = -6;
      }
      if (event.key === "a") {
        crosshairs.speed.x = -6;
      }
      if (event.key === "s") {
        crosshairs.speed.y = 6;
      }
      if (event.key === "d") {
        crosshairs.speed.x = 6;
      }
    });
  }

  function handleKeyUp(event) {
    // adding key release WASD listeners
    document.addEventListener("keyup", function (event) {
      if (event.key === "w") {
        crosshairs.speed.y = 0;
      }
      if (event.key === "a") {
        crosshairs.speed.x = 0;
      }
      if (event.key === "s") {
        crosshairs.speed.y = 0;
      }
      if (event.key === "d") {
        crosshairs.speed.x = 0;
      }
    });
  }

  function handleClick() {
    // using the fishContainer array to pass any fish object to the click listener
    if (player.striking == false && player.bittenByReaper == false) {
      for (let i = 0; i < fishContainer.length; i++) {
        // check that the crosshairs are in within the fish object
        if (
          crosshairs.pos.x + 32 >= fishContainer[i].pos.x &&
          crosshairs.pos.x + 32 <=
            fishContainer[i].pos.x + fishContainer[i].image.width &&
          crosshairs.pos.y + 32 >= fishContainer[i].pos.y &&
          crosshairs.pos.y + 32 <
            fishContainer[i].pos.y + fishContainer[i].image.height
        ) {
          // check again that the fish is mostly within the box
          if (
            fishContainer[i].pos.x + fishContainer[i].image.width / 2 >=
              strikeSquare.pos.x &&
            fishContainer[i].pos.x + fishContainer[i].image.width / 2 <=
              strikeSquare.pos.x + 384 &&
            fishContainer[i].pos.y + fishContainer[i].image.height / 2 >=
              strikeSquare.pos.y &&
            fishContainer[i].pos.y + fishContainer[i].image.height / 2 <
              fishContainer[i].pos.y + 192
          ) {
            // flash the game area a random color
            document.querySelector("canvas").style.filter = `hue-rotate(${
              Math.random() * 360
            }rad)`;
            // make claws change
            player.striking = true;
            // track the fish that the player hit. this is important to move the crab into position
            player.unluckyFish = fishContainer[i];
            // remove that fish from the array with a delay. the delay is important to let the crab grab onto the fish
            setTimeout(() => {
              // if the player isn't grabbing the salmon
              if (fishContainer[i].image != salmonStill) {
                if (fishContainer[i].health > 1) {
                  fishContainer[i].health -= 1;
                  // delete that fish
                } else {
                  fishContainer.splice(i, 1);
                }
              }
              player.striking = false;
            }, 250);
            // add to the player's score
            counter += 1;
            // change the border back to red after 100ms
            setTimeout(() => {
              document.querySelector(
                "canvas"
              ).style.filter = `hue-rotate(0deg)`;
            }, 250);
            // update the score tag
            score.innerHTML = `score: ${counter}`;
          }
        }
      }
    }
  }
  document.addEventListener("wheel", handleWheel);
  document.addEventListener("keypress", handleKeyPress);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("click", handleClick);
}

module.exports = gameController;
