// creating a class for everything I'm animating
class gameObject {
  // position and speed are given as an object for legibility during instantiation.
  constructor({ pos, speed }) {
    this.pos = pos;
    this.speed = speed;
    this.image = crabStill;
    this.hp = 5;
    // track whether the player has hit a fish
    this.striking = false;
    // track the fish that was hit
    this.unluckyFish = null;
    this.bittenByReaper = false;
  }
  // drawing the sprite or shapes at the object's position
  draw() {
    function grabOn() {}
    // check that the player isn't striking and draw the normal sprite
    if (this.striking == false) {
      c.drawImage(this.image, this.pos.x, this.pos.y);
    } else if (this.striking == true && this.image == crabStill) {
      // if the fish is mostly within the target area. the crab needs to only jump within the box
      if (
        this.unluckyFish.pos.x + this.unluckyFish.image.width / 2 >=
          strikeSquare.pos.x &&
        this.unluckyFish.pos.x + this.unluckyFish.image.width / 2 <=
          strikeSquare.pos.x + 384 &&
        this.unluckyFish.pos.y + this.unluckyFish.image.height / 2 >=
          strikeSquare.pos.y &&
        this.unluckyFish.pos.y + this.unluckyFish.image.height / 2 <
          this.unluckyFish.pos.y + 192
      ) {
        // if the fish was hit on the left side of the target area
        if (this.unluckyFish.pos.x < strikeSquare.pos.x + 92) {
          c.drawImage(
            strikeLeft,
            this.unluckyFish.pos.x + this.unluckyFish.image.width / 2 - 10,
            this.unluckyFish.pos.y + this.unluckyFish.image.height / 2
          );
          // if the fish was hit on the right side
        } else if (this.unluckyFish.pos.x > strikeSquare.pos.x + 88) {
          c.drawImage(
            strikeRight,
            this.unluckyFish.pos.x - 78,
            this.unluckyFish.pos.y + this.unluckyFish.image.height / 2
          );
        }
      }
    }
  }
  // updating object positions as they move and have to be redrawn. separate from draw() because they should still be drawn while stationary
  // making fish wrap back into the screen if they leave
  wrap() {
    // if objects exit on the right side
    if (this.pos.x > canvas.width) {
      // load the sprite in left minus its pixel width for a smooth transition
      this.pos.x = -this.image.width;
    }
    // and for the left side
    if (this.pos.x < -this.image.width) {
      this.pos.x = canvas.width;
    }
  }
  move() {
    this.draw();
    this.wrap();
    // incrementing object position by speed
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}
// creating a class for salmon
class commonFish extends gameObject {
  constructor({ pos, speed }) {
    super({ pos, speed });
    this.image = salmonStill;
    this.biting = false;
    // striking isn't needed for objects that aren't the crab
    this.striking = false;
  }
  // modifying wrap() to make fish move vertically towards the player.
  appended = 0;
  wrap() {
    if (this.image == longFish && this.pos.x > canvas.width) {
      this.pos.x = -this.image.width;
      // moving the fish down towards the player by their image height when they are offscreen
      this.pos.y += this.image.height / 2 + this.image.height / 4;
    } else if (this.pos.x > canvas.width) {
      this.pos.x = -this.image.width;
      // moving the fish down towards the player by their image height when they are offscreen
      this.pos.y += this.image.height;
    }
    if (this.pos.x < -this.image.width) {
      this.pos.x = canvas.width;
    }
    // if fish are biting the player. player.pos.y sets the hitbox below the crab's claws
    if (
      this.pos.y + this.image.height / 2 > player.pos.y + 10 &&
      this.pos.x + this.image.width > player.pos.x
    ) {
      // check the fish is a salmon. only salmon can push the player
      if (this.image == salmonStill) {
        if (this.pos.x >= canvas.width) {
          // stop drawing the player and UI
          player.bittenByReaper = true;
          // stop the window flashing
          clearInterval(window.flashCanvasOff);
          clearInterval(window.flashCanvasOn);
          // make the score visible again
          document.querySelector("ul").style.filter = "brightness(100)";
          document.querySelector("canvas").style.filter = "brightness(0)";
          // change the font size of the score
          score.style.fontSize = "35px";
          // display a new game button
          if (this.appended == 0) {
            this.appended = 1;
            const newGame = document.createElement("h1");
            newGame.innerHTML = "new game";
            // reloads the window when clicked
            newGame.onclick = () => {
              location.reload();
            };
            // adjust the padding
            newGame.style.paddingTop = "0px";
            // change the color to pink (it's inverted)
            newGame.style.color = "blue";
            // change the color when the player hovers over it
            newGame.addEventListener("mouseover", () => {
              newGame.style.color = "black";
            });
            // change the color when the player releases the mouse
            newGame.addEventListener("mouseout", () => {
              newGame.style.color = "blue";
            });
            score.style.paddingBottom = "0px";
            score.style.paddingTop = "0px";
            // append it to the <ul> that holds the score and health
            document.querySelector("ul").appendChild(newGame);
          }
        } else {
          player.pos.x = this.pos.x + 1;
          // push player crosshairs and target area offscreen when they are bitten by the salmon
          strikeSquare.pos.x = canvas.width;
          crosshairs.pos.x = canvas.width;
        }
      }
      this.biting = true;
    }
  }
}
// creating a class for smaller fish
class uglyFish extends commonFish {
  constructor({ pos, speed }) {
    super({ pos, speed });
    this.image = carpStill;
    this.health = 1;
  }
}
// creating a class for very long fish
class longerFish extends commonFish {
  constructor({ pos, speed }) {
    super({ pos, speed });
    this.image = longFish;
    this.health = 12;
  }
  drawHealth() {
    if (
      this.pos.x + this.image.width / 2 >= strikeSquare.pos.x &&
      this.pos.x + this.image.width / 2 <= strikeSquare.pos.x + 384 &&
      this.pos.y + this.image.height / 2 >= strikeSquare.pos.y &&
      this.pos.y + this.image.height / 2 < this.pos.y + 192
    ) {
      c.fillStyle = `rgba(${291 - this.health * 3}, 255, 255, 0.6)`;
      c.fillRect(
        this.pos.x + this.image.width / 2 - (128 * this.health) / 5 / 2,
        this.pos.y + this.image.height + 8,
        (128 * this.health) / 5,
        16
      );
    }
  }
}
// creating a class for even smaller fish
class smallFish extends commonFish {
  constructor({ pos, speed }) {
    super({ pos, speed });
    this.image = lilStill;
    this.health = 1;
  }
}
// creating a class for a target zone
class strikeArea extends gameObject {
  constructor({ pos, speed }) {
    super({ pos, speed }, "strikeSquare");
  }
  draw() {
    // keeping in mind that a salmon is 384px by 192px, drawing a target area
    c.fillStyle = "blue";
    c.fillRect(this.pos.x, this.pos.y, 384, 192);
    c.fillStyle = "black";
    c.fillRect(this.pos.x + 3, this.pos.y + 3, 378, 186);
    // loosely centering the target zone above the player
    this.pos.x = player.pos.x - player.pos.x / 3;
  }
}
// creating a class for player crosshairss
class pointer extends gameObject {
  constructor({ pos, speed }) {
    super({ pos, speed }, "crosshairs");
  }
  draw() {
    // drawing the crosshairs with fillStyle
    c.fillStyle = "blue";
    c.fillRect(this.pos.x + 31, this.pos.y + 16, 3, 32);
    c.fillRect(this.pos.x + 16, this.pos.y + 31, 32, 3);
    c.fillStyle = "red";
    c.fillRect(this.pos.x + 30, this.pos.y + 30, 6, 6);
    // if the center of the crosshairs touch the left of the target zone
    if (crosshairs.pos.x + 32 < strikeSquare.pos.x) {
      // let the crosshairs be dragged on the target zone
      this.pos.x = strikeSquare.pos.x - 32;
    }
    // same for the right
    if (crosshairs.pos.x + 32 > strikeSquare.pos.x + 384) {
      this.pos.x = strikeSquare.pos.x + 384 - 32;
    }
    // for the top
    if (crosshairs.pos.y + 32 < strikeSquare.pos.y) {
      crosshairs.pos.y = strikeSquare.pos.y - 32;
    }
    // for the bottom
    if (crosshairs.pos.y + 32 > strikeSquare.pos.y + 192) {
      crosshairs.pos.y = strikeSquare.pos.y + 192 - 32;
    }
  }
}
module.exports = {
  gameObject,
  commonFish,
  uglyFish,
  longerFish,
  smallFish,
  strikeArea,
  pointer,
};
