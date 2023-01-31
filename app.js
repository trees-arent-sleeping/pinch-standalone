// grab canvas tag from DOM
const canvas = document.querySelector('canvas')
// make a variable for drawing over the 2d canvas
const c = canvas.getContext('2d')
// setting up canvas here so that I don't have to do math on or remember the dimensions
canvas.width = 1024
canvas.height = 576
// loading crab and salmon images
let crabStill = new Image()
crabStill.src = 'fishpics/crabStill.png'
let salmonStill = new Image()
salmonStill.src = 'fishpics/salmonStill.png'
// setting up the game area. starts at 0, 0 and is 1024px x 576px
c.fillRect(0, 0, canvas.width, canvas.height)
// creating a class for everything I'm animating
class gameObject {
    // position and speed are given as an object for legibility during instantiation. the species argument is used to determine which image is drawn
    constructor({pos, speed}, species) {
        this.pos = pos
        this.speed = speed
        this.species = species
    }
    // drawing the sprite or shapes at the object's position
    draw() {
        c.drawImage(crabStill, this.pos.x, this.pos.y)
    }
    // updating object positions as they move and have to be redrawn. separate from draw() because they should still be drawn while stationary
    // making fish wrap back into the screen if they leave
    wrap() {
        // if objects exit on the right side
        if (this.pos.x > canvas.width) {
            // load the sprite in left minus its pixel width for a smooth transition
            if (this.species == 'crab') {
                this.pos.x = -crabStill.width
            }
            if (this.species == 'salmon') {
                this.pos.x = -salmonStill.width
            }
        }
        // and for the left side
        if (this.species == 'crab') {
            if (this.pos.x < -crabStill.width) {
                this.pos.x = canvas.width
            }
        }
        if (this.species == 'salmon') {
            if (this.pos.x < -salmonStill.width) {
                this.pos.x = canvas.width
            }
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
        // 'salmon' species 
        super({pos, speed}, 'salmon');
    }
    draw() {
        // drawing my salmon sprite instead of the crab one
        c.drawImage(salmonStill, this.pos.x, this.pos.y)
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
// creating a class for player crosshairs
class pointer extends gameObject {
    constructor({pos, speed}) {
        super({pos, speed}, 'crosshairs')
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.pos.x + 31, this.pos.y, 2, 64)
        c.fillRect(this.pos.x, this.pos.y + 31, 64, 2)
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
const salmon = new commonFish({
    pos: {
        x: 256,
        y: player.pos.y - crabStill.height
    },
    speed: {
        x: 10,
        y: 0
    }
})
// instantiating strikeArea to make a target area object
const strikeSquare = new strikeArea({
    // x-position and speed don't matter because this object is attached to the player
    pos: {x: 0,y: player.pos.y - crabStill.height}, speed: {x: 0, y: 0}
})
// instantiating pointer to create a set of crosshairs
const crosshairs = new pointer({
    // setting the crosshairs inside of the striking area
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
    player.move()
    salmon.move()
    crosshairs.move()

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
