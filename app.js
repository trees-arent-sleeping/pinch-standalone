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
// setting up the game area. starts at 0, 0 and is 1024px x 576px
c.fillRect(0, 0, canvas.width, canvas.height)
// creating a class for everything I'm animating
class gameObject {
    // position and speed are given as an object for legibility during instantiation.
    constructor({pos, speed}) {
        this.pos = pos
        this.speed = speed
        this.image = crabStill
    }
    // drawing the sprite or shapes at the object's position
    draw() {
        c.drawImage(this.image, this.pos.x, this.pos.y)
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
    }
}
// creating a class for smaller fish
class uglyFish extends commonFish {
    constructor({pos, speed}) {
        super({pos, speed})
        this.image = carpStill
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
        c.fillRect(this.pos.x + 2, this.pos.y + 2, 380, 188)
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
        c.fillStyle = 'red'
        c.fillRect(this.pos.x + 31, this.pos.y + 16, 2, 32)
        c.fillRect(this.pos.x + 16, this.pos.y + 31, 32, 2)
        c.fillStyle = 'red'
        c.fillRect(this.pos.x + 29, this.pos.y + 29, 6, 6)
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
}, 'crab')
// instantiating commonFish to make a salmon object
// setting up an array to contain all the fish
const fishContainer = []
fishContainer.push(salmon = new commonFish({
    pos: {
        x: 256,
        y: player.pos.y - crabStill.height
    },
    speed: {
        x: 3,
        y: 0
    }
}))
// a function to create x amount of carp
function carpCall(quantity) {
    for (let i = 0; i < quantity; i++) {
        fishContainer.push(new uglyFish({
            pos: {
                x: i * 100,
                y: i * 80
            },
            speed: {
                x: Math.random()*5 + 5,
                y: 0
            }
        }))
    }
}
carpCall(5)
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
// making a function to redraw each frame
function swim() {
    // this calls "swim" on the next frame of animation so it's an infinite loop
    window.requestAnimationFrame(swim) 
    // erasing previous animation frames by painting black over them
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // draw objects on every frame
    strikeSquare.move()
    for (let i = 0; i < fishContainer.length; i++) {
        fishContainer[i].move()
    }
    crosshairs.move()
    player.move()
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
                crosshairs.speed.y = -4
            }
            if (event.key === "a")
            {
                crosshairs.speed.x = -4
            }
            if (event.key === "s") {
                crosshairs.speed.y = 4
            }
            if
            (event.key === "d") {
                crosshairs.speed.x = 4
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
let h1 = document.getElementsByTagName('h1')
let counter = 0
// using the fishContainer array to pass any fish object to the click listener
document.addEventListener("click", ()=> {
    for (let i = 0; i < fishContainer.length; i++) {
    // check that the crosshairs are in within the fish object
    if (crosshairs.pos.x + 32 >= fishContainer[i].pos.x && crosshairs.pos.x + 32 <= fishContainer[i].pos.x + fishContainer[i].image.width && crosshairs.pos.y + 32 >= fishContainer[i].pos.y && crosshairs.pos.y + 32 < fishContainer[i].pos.y + fishContainer[i].image.height) {
        fishContainer.splice(i, 1)
        counter += 1
        h1[0].innerHTML = `Fish: ${counter}`}
    }
})