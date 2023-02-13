// grab canvas tag from DOM
const canvas = document.querySelector('canvas')
// make a variable for drawing over the 2d canvas
const c = canvas.getContext('2d')
// setting up canvas here so that I don't have to do math on or remember the dimensions
canvas.width = 1024
canvas.height = 576
// loading crab and fish
let crabStill = new Image()
crabStill.src = 'fishpics/crabStill.png'
let salmonStill = new Image()
salmonStill.src = 'fishpics/salmonStill.png'
let carpStill = new Image()
carpStill.src = 'fishpics/uglyfish.png'
let lilStill = new Image()
lilStill.src = 'fishpics/littlefish.png'
let longFish = new Image()
longFish.src = 'fishpics/longFish.png'
let strikeLeft = new Image()
strikeLeft.src = 'fishpics/strikeLeft.png'
let strikeRight = new Image()
strikeRight.src = 'fishpics/strikeRight.png'
let gameOver = new Image()
gameOver.src = 'fishpics/gameover.png'
// grabbing the title screen image from the DOM
const aGameBySam = document.querySelector('img')
// animate the color of the title screen
setInterval(()=> {
    aGameBySam.style.filter  = `hue-rotate(${Math.random()*360}rad)`
}, 250)
// removing the starting screen after a delay
setTimeout(()=> {
    aGameBySam.height = '0px'
}, 3000)
// setting up the game area. starts at 0, 0 and is 1024px x 576px
c.fillRect(0, 0, canvas.width, canvas.height)
// creating a class for everything I'm animating
class gameObject {
    // position and speed are given as an object for legibility during instantiation.
    constructor({pos, speed}) {
        this.pos = pos
        this.speed = speed
        this.image = crabStill
        this.hp = 5
        // track whether the player has hit a fish
        this.striking = false
        // track the fish that was hit
        this.unluckyFish = null
        this.bittenByReaper = false
    }
    // drawing the sprite or shapes at the object's position
    draw() {
        function grabOn() {
            
        }
        // check that the player isn't striking and draw the normal sprite
        if (this.striking == false) {
            c.drawImage(this.image, this.pos.x, this.pos.y)
        } else if (this.striking == true && this.image == crabStill) {
        // if the fish is mostly within the target area. the crab needs to only jump within the box
        if (this.unluckyFish.pos.x + this.unluckyFish.image.width/2 >= strikeSquare.pos.x && this.unluckyFish.pos.x + this.unluckyFish.image.width/2 <= strikeSquare.pos.x + 384 && this.unluckyFish.pos.y + this.unluckyFish.image.height/2 >= strikeSquare.pos.y && this.unluckyFish.pos.y + this.unluckyFish.image.height/2 < this.unluckyFish.pos.y + 192)
        {
             // if the fish was hit on the left side of the target area
            if (this.unluckyFish.pos.x < strikeSquare.pos.x + 92) {
            c.drawImage(strikeLeft, this.unluckyFish.pos.x + this.unluckyFish.image.width/2 - 10, this.unluckyFish.pos.y + this.unluckyFish.image.height/2)
            // if the fish was hit on the right side
        } else if (this.unluckyFish.pos.x > strikeSquare.pos.x +88) {
            c.drawImage(strikeRight, this.unluckyFish.pos.x - 78, this.unluckyFish.pos.y + this.unluckyFish.image.height/2)
        }}
    }
    }
    // updating object positions as they move and have to be redrawn. separate from draw() because they should still be drawn while stationary
    // making fish wrap back into the screen if they leave
    wrap() {
        // if objects exit on the right side
        if (this.pos.x > canvas.width) {
            // load the sprite in left minus its pixel width for a smooth transition
                this.pos.x = -this.image.width
        }
        // and for the left side
         if (this.pos.x < -this.image.width) {
                this.pos.x = canvas.width
            }
    }
    move() {
        this.draw()
        this.wrap()
        // incrementing object position by speed
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y
    }
}
// creating a class for salmon
class commonFish extends gameObject {
    constructor({pos, speed}) {
        super({pos, speed});
        this.image = salmonStill
        this.biting = false
        // striking isn't needed for objects that aren't the crab
        this.striking = false
    }
    // modifying wrap() to make fish move vertically towards the player.
    appended = 0
    wrap() {
        if (this.image == longFish && this.pos.x > canvas.width) {
            this.pos.x = -this.image.width
            // moving the fish down towards the player by their image height when they are offscreen
            this.pos.y += this.image.height / 2 + this.image.height / 4
        } else
        if (this.pos.x > canvas.width) {
            this.pos.x = -this.image.width
            // moving the fish down towards the player by their image height when they are offscreen
            this.pos.y += this.image.height
        }
         if (this.pos.x < -this.image.width) {
                this.pos.x = canvas.width
            }
        // if fish are biting the player. player.pos.y sets the hitbox below the crab's claws
        if (this.pos.y + this.image.height/2 > player.
        pos.y + 10 && this.pos.x + this.image.width > player.pos.x){
        // check the fish is a salmon. only salmon can push the player
        if (this.image == salmonStill) {
            if (this.pos.x >= canvas.width) {
                // stop drawing the player and UI
                player.bittenByReaper = true
                // stop the window flashing
                clearInterval(window.flashCanvasOff)
                clearInterval(window.flashCanvasOn)
                // make the score visible again
                document.querySelector('ul').style.filter = 'brightness(100)'
                document.querySelector('canvas').style.filter = 'brightness(0)'
                // change the font size of the score
                score.style.fontSize = '35px'
                // display a new game button
                if (this.appended == 0) 
                {
                this.appended = 1
                const newGame = document.createElement('h1')
                newGame.innerHTML = 'new game'
                // reloads the window when clicked
                newGame.onclick = (()=> {
                    location.reload()
                })
                // adjust the padding
                newGame.style.paddingTop = '0px'
                // change the color to pink (it's inverted)
                newGame.style.color = 'blue'
                // change the color when the player hovers over it
                newGame.addEventListener('mouseover', ()=> {
                    newGame.style.color = 'black'
                })
                // change the color when the player releases the mouse
                newGame.addEventListener('mouseout', ()=> {
                    newGame.style.color = 'blue'
                })
                score.style.paddingBottom = '0px'
                score.style.paddingTop = '0px'
                // append it to the <ul> that holds the score and health
                document.querySelector('ul').appendChild(newGame)
                }
            } else {
                player.pos.x = this.pos.x + 1
                // push player crosshairs and target area offscreen when they are bitten by the salmon
                strikeSquare.pos.x = canvas.width
                crosshairs.pos.x = canvas.width
            }
        } 
        this.biting = true
    }}}
// creating a class for smaller fish
class uglyFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = carpStill
        this.health = 1
    }
}
// creating a class for very long fish
class longerFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = longFish
        this.health = 12
    }
    drawHealth() {
        if (this.pos.x + this.image.width/2 >= strikeSquare.pos.x && this.pos.x + this.image.width/2 <= strikeSquare.pos.x + 384 && this.pos.y + this.image.height/2 >= strikeSquare.pos.y && this.pos.y + this.image.height/2 < this.pos.y + 192) {
            c.fillStyle = `rgba(${291 - this.health * 3}, 255, 255, 0.6)`
            c.fillRect(this.pos.x + this.image.width/2 - 128 * this.health / 5 / 2, this.pos.y + this.image.height + 8, 128 * this.health / 5, 16)
        }
    }
}
// creating a class for even smaller fish
class smallFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = lilStill
        this.health = 1
    }
}
// creating a class for a target zone
class strikeArea extends gameObject {
    constructor({pos, speed}) {
        super({pos, speed}, 'strikeSquare')
    }
    draw() {
        // keeping in mind that a salmon is 384px by 192px, drawing a target area
            c.fillStyle = 'blue'
            c.fillRect(this.pos.x, this.pos.y, 384, 192)
            c.fillStyle = 'black'
            c.fillRect(this.pos.x + 3, this.pos.y + 3, 378, 186)
            // loosely centering the target zone above the player
            this.pos.x = player.pos.x - player.pos.x/3
    }
}
// creating a class for player crosshairss
class pointer extends gameObject {
    constructor({pos, speed}) {
        super({pos, speed}, 'crosshairs')
    }
    draw() {
        // drawing the crosshairs with fillStyle
        c.fillStyle = 'blue'
        c.fillRect(this.pos.x + 31, this.pos.y + 16, 3, 32)
        c.fillRect(this.pos.x + 16, this.pos.y + 31, 32, 3)
        c.fillStyle = 'red'
        c.fillRect(this.pos.x + 30, this.pos.y + 30, 6, 6)
        // if the center of the crosshairs touch the left of the target zone
        if (crosshairs.pos.x + 32 < strikeSquare.pos.x) {
            // let the crosshairs be dragged on the target zone
            this.pos.x = strikeSquare.pos.x - 32
            }
        // same for the right
        if (crosshairs.pos.x + 32 > strikeSquare.pos.x + 384) {
            this.pos.x = strikeSquare.pos.x + 384 - 32
        }
        // for the top
        if (crosshairs.pos.y + 32 < strikeSquare.pos.y) {
            crosshairs.pos.y = strikeSquare.pos.y - 32
        }
        // for the bottom
        if (crosshairs.pos.y + 32 > strikeSquare.pos.y + 192) {
            crosshairs.pos.y = strikeSquare.pos.y + 192 - 32
        }
    }
}
// instantiating gameObject to make the player object
const player = new gameObject({
    pos: {
        x: 256,
        // placing the crab on the bottom of the screen
        y: canvas.height - crabStill.height
    },
    speed: {
        x: 0,
        y: 0
    }
})
// setting up an array to contain all the fish
const fishContainer = []
// a function to create x amount of fish
function carpCall(quantity, creature, speed, level) {
    for (let i = 0; i < quantity; i++) {
        // setting a delay between each iteration so that the fish spawn slowly
        setTimeout(()=> {
            fishContainer.push(new creature({
                pos: {
                    x: -128,
                    y: level
                },
                speed: {
                    x: speed,
                    y: 0
                }
            }))
            // multiply the delay by the current iteration so it applies to each loop
        }, 1000 * i)
    }
}
// summon creatures
carpCall(10, uglyFish, 4, -64)
setInterval(()=> {
    carpCall(10, smallFish, 4, -64)
}, 10000)
setInterval(()=> {
    carpCall(10, uglyFish, 4, -196)
}, 20000)
setInterval(()=> {
    carpCall(1, longerFish, 1, -256)
}, 60000)

// instantiating strikeArea to make a target area object
const strikeSquare = new strikeArea({
    // x-position and speed don't matter because this object is attached to the player
    // y: 192 places the box slightly under the player's claws
    pos: {x: 0,y: 224}, speed: {x: 0, y: 0}
})
// instantiating pointer to create a set of crosshairss
const crosshairs = new pointer({
    // setting the crosshairss inside of the striking area
    pos: {x: player.pos.x, y: player.pos.y - crabStill.height + 64}, speed: {x: 0, y: 0}
})
// keeping track of how many salmon are spawned
reaperSpawned = 0
// making a function to redraw each frame
function swim() {
    // this calls 'swim' on the next frame of animation so it's an infinite loop
    window.requestAnimationFrame(swim) 
    // erasing previous animation frames by painting black over them
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // draw target zone if the player hasn't been dragged offscreen
    if (player.bittenByReaper == false) {
    strikeSquare.move()
    }
     // draw longer fish first, draw longer fish health bar
     for (let i = 0; i < fishContainer.length; i++) {
        if (fishContainer[i].image == longFish) {
            fishContainer[i].drawHealth()
            fishContainer[i].move()
        }
    }
    // draw all fish
    for (let i = 0; i < fishContainer.length; i++) {
        if (fishContainer[i].image != longerFish) {
            fishContainer[i].move()
        }
    }
    // draw crosshairs if the player hasn't been dragged offscreen
    if (player.bittenByReaper == false) {
    crosshairs.move()
    // draw the player
    player.move()
    }
    // add brakes to the player's speed
    if (player.speed.x !== 0) {
        if(player.speed.x > 0) {
            player.speed.x -= Math.abs(player.speed.x) * 0.03
        } else if (player.speed.x < 0) {
            player.speed.x += Math.abs(player.speed.x) * 0.03
        }
    }
    // draw the game over screen if the player has been dragged offscreen. strikesquare's position is forced to be offscreen when the player is bitten
    if (strikeSquare.pos.x == canvas.width) {
    c.drawImage(gameOver, 0, 0)
    }
    // update the health and remove small fish when they bite the player
    for (let i = 0; i < fishContainer.length; i++)
    {if (fishContainer[i].biting == true) {
        // grabbing the health <h1> from the DOM
        let health = document.getElementById('health')
        // decrementing it by one heart
        let hearts = health.innerHTML.substring(0, health.innerHTML.length - 1)
        health.innerHTML = hearts
        // decrementing player object hp value
        player.hp -= 1
        // salmon aren't deleted when they impact the player
        if (fishContainer[i].image !== salmonStill) {
            // if the salmon is spawned, fish ignore the player
            if (reaperSpawned != 1) {
            fishContainer.splice(i, 1)}
        }
        // delete the fish if it exits the game area
        if (fishContainer[i].pos.x > canvas.width && fishContainer[i].pos.y > canvas.height) {
            if (fishContainer[i].image == salmonStill)
            fishContainer.splice(i, 1)
        }
        // if the player's health is 0 and they get another bite, spawn a salmon
        // spawn only one salmon
        if (reaperSpawned < 1) {
            if (player.hp < 1) {
                reaperSpawned += 1
                // check that the player hasn't already been dragged off the scren
                if (player.bittenByReaper == false) {
                // make things look scary
                window.flashCanvasOff = setInterval(()=> {
                    document.querySelector('canvas').style.filter = 'invert(0)'
                }, 100)
                // make the game window blink inverted colors
                window.flashCanvasOn = setInterval(()=> 
                {
                    document.querySelector('canvas').style.filter = 'invert(70%)'
                }, 1000)
         
                document.querySelector('ul').style.filter = 'brightness(0)'
                }
                fishContainer.push(salmon = new commonFish({
                    pos: {
                        x: -384,
                        y: 0
                    },
                    speed: {
                        x: 2,
                        y: 0
                    }}))
        // speed up all the fish if the salmon has been spawned
        if (reaperSpawned == 1) {
            // set an interval to apply to fish that will spawn after the event
            setInterval(()=> {
                for (let i = 0; i < fishContainer.length; i++) {
                    // with the exception of the salmon
                    if (fishContainer[i].image != salmonStill) {
                        // speed up the fish
                        fishContainer[i].speed.x = 10
                    }
                }
            }, 100)
            }
        }
        }
    }}
}
swim()
// adding a listener for player mousewheel
document.addEventListener('wheel', (event)=> {
    // tracking the change in Y of the scroll event. scrolling down gives negative changes in px and up gives positive. 
    let scroll = event.deltaY
    // if player is rolling the mousewheel up:
    if (scroll > 0) {
        // scrolling more means more pixels moved. it's negative in one direction, so I'm taking the absolute value of pixels scrolled (ie -40px or +90px) to make the player's speed somewhat proportionate to the mousewheel movement. multiplying by 0.05 gives just a little movement
        player.speed.x = Math.abs(scroll) * -0.05
    }
    // if player is rolling the mousehweel down:
    else if (scroll < 0) {
        // same thing but with a positive * 0.05
        player.speed.x = Math.abs(scroll) * 0.05
    }
});
// adding WASD controls for crosshairs
document.addEventListener('keypress', function(event) {
            if (event.key === 'w') {
                crosshairs.speed.y = -6
            }
            if (event.key === 'a')
            {
                crosshairs.speed.x = -6
            }
            if (event.key === 's') {
                crosshairs.speed.y = 6
            }
            if
            (event.key === 'd') {
                crosshairs.speed.x = 6
            }
});
// adding key release WASD listeners
  document.addEventListener('keyup',function(event) {
    if (event.key === 'w') {
        crosshairs.speed.y = 0;
    }
    if (event.key === 'a')
    {
        crosshairs.speed.x = 0
    } 
    if
    (event.key === 's') {
        crosshairs.speed.y = 0
    }
    if
    (event.key === 'd') {
        crosshairs.speed.x = 0
    }
}) 
// grabbing the <h3> that holds the score from the DOM
let score = document.getElementById('score')
// starting with a score of 0
let counter = 0
// using the fishContainer array to pass any fish object to the click listener
document.addEventListener('click', ()=> {
    if (player.striking == false && player.bittenByReaper == false) {for (let i = 0; i < fishContainer.length; i++) {
    // check that the crosshairs are in within the fish object 
    if (crosshairs.pos.x + 32 >= fishContainer[i].pos.x && crosshairs.pos.x + 32 <= fishContainer[i].pos.x + fishContainer[i].image.width && crosshairs.pos.y + 32 >= fishContainer[i].pos.y && crosshairs.pos.y + 32 < fishContainer[i].pos.y + fishContainer[i].image.height) {
        // check again that the fish is mostly within the box
        if (fishContainer[i].pos.x + fishContainer[i].image.width/2 >= strikeSquare.pos.x && fishContainer[i].pos.x + fishContainer[i].image.width/2 <= strikeSquare.pos.x + 384 && fishContainer[i].pos.y + fishContainer[i].image.height/2 >= strikeSquare.pos.y && fishContainer[i].pos.y + fishContainer[i].image.height/2 < fishContainer[i].pos.y + 192) {
        // flash the game area a random color
        document.querySelector('canvas').style.filter  = `hue-rotate(${Math.random()*360}rad)`
        // make claws change
        player.striking = true
        // track the fish that the player hit. this is important to move the crab into position
        player.unluckyFish = fishContainer[i]
        // remove that fish from the array with a delay. the delay is important to let the crab grab onto the fish
        setTimeout(()=> {
            // if the player isn't grabbing the salmon
            if (fishContainer[i].image != salmonStill) {
                if (fishContainer[i].health > 1) {
                    fishContainer[i].health -= 1
                } else
                // delete that fish
                fishContainer.splice(i, 1)
            }
            player.striking = false
        }, 250)
        // add to the player's score
        counter += 1
        // change the border back to red after 100ms
        setTimeout(()=> {
            document.querySelector('canvas').style.filter  = `hue-rotate(0deg)`
        }, 250)
        // update the score tag
        score.innerHTML = `score: ${counter}`}}
    }
}})





