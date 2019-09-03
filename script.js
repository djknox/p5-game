/* eslint no-undef: 0 */

const height = 600
const width = 400

function setup() {
  createCanvas(width, height)
}

function draw() {
  clear()    
  square(mouseX, mouseY, 40)
}

