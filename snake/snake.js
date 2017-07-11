var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');

var block = {
  w: 10,
  h: 10
};

xv = yv = 0;

var snake = {
  x: canv.width / 2,
  y: canv.height / 2,
  xv: 0.2,
  yv: 0,
  length: 1,
  color: '#ffffff'
};

var apple = {
  color: '#ff0000',
  x: canv.width * Math.random(),
  y: canv.height * Math.random()
};

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    });
}

if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.clearTimeout);
}

//Add event listener for keyboard events
document.addEventListener('keydown', function (event) {
  const keyCode = event.keyCode;

  if (keyCode == 39) {
    snake.xv = 0.5;
    snake.yv = 0;
  } else if (keyCode == 37) {
    snake.xv = -0.5;
    snake.yv = 0;
  } else if (keyCode == 38) {
    snake.yv = -0.5;
    snake.xv = 0;
  } else if (keyCode == 40) {
    snake.yv = 0.5;
    snake.xv = 0;
  }
});

function game() {

  ctx.clearRect(0, 0, canv.width, canv.height);
  // paint canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // draw apple at random position
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x,
    apple.y,
    block.w,
    block.h);

  // Draw snake
  ctx.fillStyle = snake.color;

  // Check if snake is colliding with walls
  checkSnakePosition();

  for (var i = 0; i < snake.length; i++) {
    // snake.x + (i * 11)
    ctx.fillRect(snake.x,
      snake.y,
      block.w,
      block.h);
  }

  snake.x += snake.xv;
  snake.y += snake.yv;

  window.requestAnimationFrame(game);
}

game();

/**
 * Checks snakes current position, if it's colliding with walls it 
 * changes it's x and y values;
 */
function checkSnakePosition() {
  if (snake.x >= (canv.width + block.w)) {
    snake.x = 0;
  } else if (snake.x <= -block.w) {
    snake.x = canv.width - block.w;
  } else if (snake.y >= (canv.height + block.h)) {
    snake.y = 0;
  } else if (snake.y <= -block.h) {
    snake.y = canv.height - block.h;
  }
}