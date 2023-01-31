// grab canvas tag from DOM
const canvas = document.querySelector('canvas')
// make a variable for drawing over the 2d canvas
const c = canvas.getContext('2d')
// setting up canvas here so that I don't have to do math on or remember the dimensions
canvas.width = 1024
canvas.height = 576
// loading crab and salmon images
let crabStill = new Image()
crabStill.src = "fishpics/crabStill.png"
let salmonStill = new Image()
salmonStill.src = "fishpics/salmonStill.png"
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
    player.draw()
}
swim()
