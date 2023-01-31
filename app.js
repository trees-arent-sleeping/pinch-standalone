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
    // position and speed are given as an object for legibility during instantiation
    constructor({pos, speed}) {
        this.pos = pos
        this.speed = speed
    }
}

