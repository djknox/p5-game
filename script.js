/* eslint no-undef: 0 */

let height = 600;
let width = 400;
let paddleWidth = 50;
let paddleHeight = 10;

function setup() {
  createCanvas(width, height);
}

function draw() {
  clear();
  rect(0, 0, width, height);

  let paddleX = constrain(mouseX - paddleWidth / 2, 0, width - paddleWidth);

  rect(
    paddleX,
    height * 0.9, paddleWidth,
    paddleHeight
  );
}

