var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');

var block = {
  w: 5,
  h: 5
};

var velocity = 5;
// Tails array
var tail = [];

// snake object
var snake = {
  x: canv.width / 2,
  y: canv.height / 2,
  xv: 0.2,
  yv: 0,
  color: '#ffffff'
};

//Add snake tail
for (var i = 0; i < 2; i++) {
  tail.push({
    x: snake.x + block.w + 1,
    y: snake.y + block.h + 1
  });
}

// Apple
// TODO - Add logic to draw apple away from walls
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
    snake.xv = velocity;
    snake.yv = 0;
  } else if (keyCode == 37) {
    snake.xv = -velocity;
    snake.yv = 0;
  } else if (keyCode == 38) {
    snake.yv = -velocity;
    snake.xv = 0;
  } else if (keyCode == 40) {
    snake.yv = velocity;
    snake.xv = 0;
  }
});

/**
 * Draw game objects
 */
function game() {
  // clear canvas
  ctx.clearRect(0, 0, canv.width, canv.height);

  // paint canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // Draw apple
  drawApple();

  // Draw snake
  ctx.fillStyle = snake.color;

  // Check if snake is colliding with walls
  checkSnakePosition();

  // detect collision
  collisionDetection();

  // Draw snake
  for (var i = 0; i < tail.length; i++) {
    ctx.fillRect(tail[i].x,
      tail[i].y,
      block.w,
      block.h);
  }

  tail = updateTail();
  // window.requestAnimationFrame(game);
  window.setTimeout(game, 1000 / 10);
}

updateTail();
game();

/**
 * Checks snakes current position, if it's colliding with walls it 
 * changes it's x and y values;
 */
function checkSnakePosition() {
  if (tail[0].x >= (canv.width + block.w)) {
    tail[0].x = 0;
  } else if (tail[0].x <= -block.w) {
    tail[0].x = canv.width - block.w;
  } else if (tail[0].y >= (canv.height + block.h)) {
    tail[0].y = 0;
  } else if (tail[0].y <= -block.h) {
    tail[0].y = canv.height - block.h;
  }
}

// draw apple at random position
function drawApple() {
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.x,
    apple.y,
    block.w,
    block.h);
}

/**
 * Returns updated positiond for snake
 */
function updateTail() {
  return tail.map((item, i) => {
    if (i == 0) {
      return {
        x: item.x + snake.xv,
        y: item.y + snake.yv
      }
    } else {
      return tail[i - 1];
    }
  });
}

/**
 * Check if snake colliding with apple
 */
function collisionDetection() {
  if (tail[0].x <= apple.x + block.w && tail[0].x >= apple.x &&
    tail[0].y <= apple.y + block.h && tail[0].y >= apple.y) {
    console.log('Collided');
    apple.x = canv.width * Math.random();
    apple.y = canv.height * Math.random();

    tail.push({
      x: snake.x + block.w + 1,
      y: snake.y + block.h + 1
    });
  }
}
