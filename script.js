/* eslint no-undef: 0 */

let height = 600;
let width = 400;

let paddle = {
  width: 50,
  height: 10,
  x: 0
};

let ball = {
  diameter: 15,
  x: 0
};


function setup() {
  createCanvas(width, height);
}

function draw() {
  paddle.x = constrain(mouseX - paddle.width / 2, 0, width - paddle.width);
  ball.x = paddle.x + paddle.width / 2;
  ball.y = height * 0.9 - ball.diameter / 2;

  clear();

  drawBorders();
  drawPaddle();
  drawBall();
}

function drawBorders() {
  noFill();
  rect(0, 0, width, height);
}

function drawPaddle() {
  fill(50, 50, 255);
  rect(
    paddle.x,
    height * 0.9, paddle.width,
    paddle.height
  );
}

function drawBall() {
  fill(255, 50, 50);
  circle(
    ball.x,
    ball.y,
    ball.diameter
  );
}

