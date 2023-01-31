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
    // position and speed are given as an object for legibility during instantiation. I think I'll use the species argument to determine what is drawn over the object. if not I'll extend this class
    constructor({pos, speed}) {
        this.pos = pos
        this.speed = speed
    }
    // drawing the sprite or shapes at the object's position
    draw() {
        c.drawImage(crabStill, this.pos.x, this.pos.y)
    }
    // updating object positions as they move and have to be redrawn. separate from draw() because they should still be drawn while stationary
    move() {
        this.draw()
        // incrementing object position by speed
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y
    }
}
// instantiating gameObject to make the player object
const player = new gameObject({
    pos: {
        x: 256,
        y: 256
    },
    speed: {
        x: 0,
        y: 0
    }
})
// making a function to redraw each frame
function swim() {
    // this calls "swim" on the next frame of animation so it's an infinite loop
    window.requestAnimationFrame(swim) 
    // erasing previous animation frames by painting black over them
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // draw objects on every frame
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
