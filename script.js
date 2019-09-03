/* eslint no-undef: 0 */

let height = 400
let width = 300

let paddle = {
  width: 50,
  height: 10,
  speedX: 0,
  x: 0,
  y: height * 0.9
}

let ball = {
  diameter: 15,
  x: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
  onPaddle: true
}

let bricks = []

function setup() {
  createCanvas(width, height)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      bricks.push({
        x: 50 + i * 50 + 25 * (j % 2),
        y: 50 + j * 20,
        width: 50,
        height: 15
      })
    }
  }
}

function draw() {
  calculatePaddleSpeed()
  
  if (ball.onPaddle) {
    ball.x = paddle.x + paddle.width / 2
    ball.y = height * 0.9 - ball.diameter / 2
  } else {
    ball.x = ball.x + ball.speedX
    ball.y = ball.y + ball.speedY
  }
  
  clear()
  
  drawBorders()
  drawPaddle()
  
  checkForWallCollision()
  checkForPaddleCollision()
  checkForBrickCollision()
  drawBall()
  
  drawBricks()
  
  if (bricks.length === 0) {
    noLoop()
  }
}

function drawBricks() {
  for (let brick of bricks) {
    fill(50, 255, 50)
    rect(brick.x, brick.y, brick.width, brick.height)
  }
}

function calculatePaddleSpeed() {
  let newX = constrain(mouseX - paddle.width / 2, 0, width - paddle.width)
  let newSpeed = newX - paddle.x
  if (newSpeed === 0) {
    paddle.speedX = paddle.speedX * 0.8
  } else {
    paddle.speedX = newSpeed
  }
  
  paddle.x = newX
}

function checkForWallCollision () {
  if (ball.y < ball.diameter / 2) {
    ball.speedY = -ball.speedY
  }
  
  if (ball.x < ball.diameter / 2) {
    ball.speedX = -ball.speedX
  }
  
  if (ball.x > width - ball.diameter / 2) {
    ball.speedX = -ball.speedX
  }
  
  if (ball.y > height * 2) {
    ball.onPaddle = true
  }
}

function checkForPaddleCollision () {
  if (!ball.onPaddle && collideRectCircle(
    paddle.x,
    paddle.y,
    paddle.width,
    paddle.height,
    ball.x,
    ball.y,
    ball.diameter
  )) {
    ball.speedY = -ball.speedY
  }
}

function checkForBrickCollision () {
  for (let brick of bricks) {
    if (collideRectCircle(
      brick.x, brick.y, brick.width, brick.height,
      ball.x, ball.y, ball.diameter)) {
      ball.speedY = -ball.speedY
      // remove the brick that has been hit
      bricks = bricks.filter(item => item !== brick)
      break;
    }
  }
}

function drawBorders () {
  noFill()
  rect(0, 0, width, height)
}

function drawPaddle () {
  fill(50, 50, 255)  
  rect(
    paddle.x, 
    height * 0.9, 
    paddle.width, 
    paddle.height
  )    
}

function drawBall () {
  fill(255, 50, 50)
  circle(
    ball.x, 
    ball.y,
    ball.diameter
  )  
}

function mouseClicked () {
  if (ball.onPaddle) {
    ball.onPaddle = false
    ball.speedX = paddle.speedX
    ball.speedY = -10
  }
}

