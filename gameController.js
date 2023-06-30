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
  function handleWheel(event) {
    let scroll = event.deltaY;
    if (scroll > 0) {
      player.speed.x = Math.abs(scroll) * -0.05;
    } else if (scroll < 0) {
      player.speed.x = Math.abs(scroll) * 0.05;
    }
  }

  function handleKeyPress(event) {
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
  }

  function handleKeyUp(event) {
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
  }

  function handleClick() {
    if (player.striking == false && player.bittenByReaper == false) {
      for (let i = 0; i < fishContainer.length; i++) {
        if (
          crosshairs.pos.x + 32 >= fishContainer[i].pos.x &&
          crosshairs.pos.x + 32 <=
            fishContainer[i].pos.x + fishContainer[i].image.width &&
          crosshairs.pos.y + 32 >= fishContainer[i].pos.y &&
          crosshairs.pos.y + 32 <
            fishContainer[i].pos.y + fishContainer[i].image.height
        ) {
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
            document.querySelector("canvas").style.filter = `hue-rotate(${
              Math.random() * 360
            }rad)`;
            player.striking = true;
            player.unluckyFish = fishContainer[i];
            setTimeout(() => {
              if (fishContainer[i].image != salmonStill) {
                if (fishContainer[i].health > 1) {
                  fishContainer[i].health -= 1;
                } else {
                  fishContainer.splice(i, 1);
                }
              }
              player.striking = false;
            }, 250);
            counter += 1;
            setTimeout(() => {
              document.querySelector(
                "canvas"
              ).style.filter = `hue-rotate(0deg)`;
            }, 250);
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
