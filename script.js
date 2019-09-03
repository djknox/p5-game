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
  x: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
  onPaddle: true
};


function setup() {
  createCanvas(width, height);
}

function draw() {
  calculatePaddleSpeed();

  if (ball.onPaddle) {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = height * 0.9 - ball.diameter / 2;
  }
  else {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
  }

  clear();

  drawBorders();

  drawPaddle();

  checkForWallCollision();

  drawBall();
}

function calculatePaddleSpeed() {
  let newX = constrain(mouseX - paddle.width / 2, 0, width - paddle.width);
  let newSpeed = newX - paddle.x;
  if (newSpeed === 0) {
    paddle.speedX = paddle.speedX * 0.8;
  }
  else {
    paddle.speedX = newSpeed;
  }
  paddle.x = newX;
}

function checkForWallCollision() {
  if (ball.y < ball.diameter / 2) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x < ball.diameter / 2) {
    ball.speedX = -ball.speedX;
  }

  if (ball.x > width - ball.diameter / 2) {
    ball.speedX = -ball.speedX;
  }

  if (ball.y > height * 2) {
    ball.onPaddle = true;
  }
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

function mouseClicked() {
  if (ball.onPaddle) {
    ball.onPaddle = false;
    ball.speedX = paddle.speedX;
    ball.speedY = -10;
  }
}