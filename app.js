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
let strikeLeft = new Image()
strikeLeft.src = 'fishpics/strikeLeft.png'
let strikeRight = new Image()
strikeRight.src = 'fishpics/strikeRight.png'
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
    }
    // method to delay the player withdrawing their claw
        letGo() {
            setTimeout(()=> {
             this.striking = false}, 500
         )
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
            c.drawImage(strikeLeft, this.unluckyFish.pos.x + this.unluckyFish.image.width/2 + 5, this.unluckyFish.pos.y + this.unluckyFish.image.height/2)
            this.letGo()
            // only draw one of two sprites. no crab rave
            return
            // if the fish was hit on the right side
        } else if (this.unluckyFish.pos.x > strikeSquare.pos.x +92) {
            c.drawImage(strikeRight, this.unluckyFish.pos.x - 78, this.unluckyFish.pos.y + this.unluckyFish.image.height/2)
            this.letGo()
            return
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
    // modifying wrap() to make fish move vertically towards the player. t
    wrap() {
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
        if (this.image == salmonStill) {player.pos.x = this.pos.x + 1}
        this.biting = true
    }
        }
}
// creating a class for smaller fish
class uglyFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = carpStill
    }
}
// creating a class for even smaller fish
class smallFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = lilStill
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
// a function to create x amount of carp
function carpCall(x) {
    for (let i = 0; i < x; i++) {
        // setting a delay between each iteration so that the fish spawn slowly
        setTimeout(()=> {
            fishContainer.push(new smallFish({
                pos: {
                    x: -128,
                    y: -64
                },
                speed: {
                    x: 4,
                    y: 0
                }
            }))
            // multiply the delay by the current iteration so it applies to each loop
        }, 1000 * i)
    }
}
carpCall(10)
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
    // this calls "swim" on the next frame of animation so it's an infinite loop
    window.requestAnimationFrame(swim) 
    // erasing previous animation frames by painting black over them
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // draw target zone
    strikeSquare.move()
    // draw all fish
    for (let i = 0; i < fishContainer.length; i++) {
        fishContainer[i].move()
    }
    // draw crosshairs
    crosshairs.move()
    // draw the player
    player.move()
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
            fishContainer.splice(i, 1)
        }
        // if the player's health is 0 and they get another bite, spawn a salmon
        // spawn only one salmon
        if (reaperSpawned < 1) {
            if (player.hp < 1) {
                reaperSpawned += 1
                // make things look scary
                setInterval(()=> {
                    document.querySelector('canvas').style.filter = 'invert(0)'
                }, 100)
                // make the game window blink inverted colors
                setInterval(()=> {
                    document.querySelector('canvas').style.filter = 'invert(70%)'
                }, 1000)
                document.querySelector('ul').style.filter = 'brightness(0)'


                fishContainer.push(salmon = new commonFish({
                    pos: {
                        x: -384,
                        y: 0
                    },
                    speed: {
                        x: 2,
                        y: 0
                    }}))
        }
        }
    }}
}
swim()
// adding a listener for player mousewheel
document.addEventListener('wheel', (event)=> {
    // tracking the change in Y of the scroll event. scrolling down gives negative changes in px and up gives positive. 
    let scroll = event.deltaY
    console.log(scroll)

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
document.addEventListener("keypress", function(event) {
            if (event.key === "w") {
                crosshairs.speed.y = -5
            }
            if (event.key === "a")
            {
                crosshairs.speed.x = -5
            }
            if (event.key === "s") {
                crosshairs.speed.y = 5
            }
            if
            (event.key === "d") {
                crosshairs.speed.x = 5
            }
});
// adding key release WASD listeners
  document.addEventListener("keyup",function(event) {
    if (event.key === "w") {
        crosshairs.speed.y = 0;
    }
    if (event.key === "a")
    {
        crosshairs.speed.x = 0
    } 
    if
    (event.key === "s") {
        crosshairs.speed.y = 0
    }
    if
    (event.key === "d") {
        crosshairs.speed.x = 0
    }
}) 
// grabbing the <h3> that holds the score from the DOM
let score = document.getElementById('score')
// starting with a score of 0
let counter = 0
// using the fishContainer array to pass any fish object to the click listener
document.addEventListener("click", ()=> {
    for (let i = 0; i < fishContainer.length; i++) {
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
            fishContainer.splice(i, 1)
        }, 300)
        // add to the player's score
        counter += 1
        // change the border back to red after 100ms
        setTimeout(()=> {
            document.querySelector('canvas').style.filter  = `hue-rotate(0deg)`
        }, 300)
        // update the score tag
        score.innerHTML = `score: ${counter}`}}
    }
})


