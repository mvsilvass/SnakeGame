const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameOver = false;
let gameStarted = false;

//GRADES
const division = 20;
const WidthSquare = canvas.width / division;
const HeigthSquare = canvas.height / division;

//SNAKE 
let snake = [
    {   
        x: WidthSquare * Math.floor(division / 2),
        y: HeigthSquare * Math.floor(division / 2)
    },
      {
        x: WidthSquare * Math.floor(division / 2),
        y: HeigthSquare * Math.floor(division / 2) - HeigthSquare 
      }
];

// MOVES SNAKE
let direction = "";
let lastDirection = "";

//Apple 
const applePosition = {
    x: Math.floor(Math.random() * division) * WidthSquare,
    y: Math.floor(Math.random() * division) * HeigthSquare
};

const apple = document.createElement('img');
apple.src = 'assets/apple.png';

function drawSnake(){
    ctx.fillStyle = "#561f5c";
    for (let i = 0; i < snake.length; i++) {
        const { x, y } = snake[i];
        drawRoundedSquare(x, y);
    }
};

function drawRoundedSquare(x, y) {
    const cornerRadius = 10; 
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + WidthSquare, y, x + WidthSquare, y + HeigthSquare, cornerRadius);
    ctx.arcTo(x + WidthSquare, y + HeigthSquare, x, y + HeigthSquare, cornerRadius);
    ctx.arcTo(x, y + HeigthSquare, x, y, cornerRadius);
    ctx.arcTo(x, y, x + WidthSquare, y, cornerRadius);
    ctx.closePath();
    ctx.fill();
};

function draw(){
  ctx.fillStyle = "#BE78C8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    ctx.fillStyle = "#BE78C8";
    ctx.fillStyle = "black";
    ctx.font = "bold 45px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press Arrow Keys to Play", canvas.width / 2, canvas.height / 2);
    ctx.fillText(" ⬅ ⬆ ⬇ ⮕", canvas.width / 2, canvas.height / 2+50);
} else {
    drawSnake();
    ctx.drawImage(apple, applePosition.x, applePosition.y);
}
  if (gameOver) {
    ctx.fillStyle = "#BE78C8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);  
    
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
    restartButton.style.left = `${canvas.offsetLeft + canvas.width / 2 - 30}px`;
    restartButton.style.top = `${canvas.offsetTop + canvas.height / 2 + 40}px`; 
  } else {
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
  }
  requestAnimationFrame(draw);
};

function changeY(y) {
    const newHead = { x: snake[0].x, y: snake[0].y + y };
    snake.unshift(newHead);
    snake.pop();
}

function changeX(x) {
    const newHead = { x: snake[0].x + x, y: snake[0].y };
    snake.unshift(newHead);
    snake.pop();
}

function moveSnake() {
    if (direction && direction !== lastDirection) {
        lastDirection = direction;
    }

    switch (lastDirection) {
        case "up":
            changeY(-WidthSquare);
            break;
        case "down":
            changeY(WidthSquare);
            break;
        case "right":
            changeX(HeigthSquare);
            break;
        case "left":
            changeX(-HeigthSquare);
            break;
        default:
            break;
    }
}

document.addEventListener("keydown", (e) =>{
    switch (e.key){
        case "ArrowUp":
            if (lastDirection !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (lastDirection !== "up") {
                direction = "down";
            }
            break;

        case "ArrowRight":
            if (lastDirection !== "left") {
                direction = "right";
            }
            break;

        case "ArrowLeft":
            if (lastDirection !== "right") {
                    direction = "left";}
            break;

        default:
            break;
    }

    if (!gameStarted && ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
      gameStarted = true;
  }

});
 
restartButton.addEventListener('click', () => {
  location.reload(); 
});

function checkCollision() {
  for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(gameInterval);
        gameOver = true;
    }
  }

  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
) {
    gameOver = true;
    clearInterval(gameInterval);
  }
}

function changeFruitPosition() {
  const max = division - 1;
  applePosition.x = Math.floor(Math.random() * max) * WidthSquare;
  applePosition.y = Math.floor(Math.random() * max) * HeigthSquare;
  
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x == applePosition.x && snake[i].y == applePosition.y) {
      changeFruitPosition();
    }
  }
}

function eat() {
    if (snake[0].x == applePosition.x && snake[0].y == applePosition.y) {
      switch (direction) {
        case "up":
          snake.push({
            y: snake[snake.length - 1].y,
            x: snake[snake.length - 1].x,
          });
          break;
  
        case "down":
          snake.push({
            y: snake[snake.length - 1].y,
            x: snake[snake.length - 1].x,
          });
          break;
  
        case "left":
          snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
          });
          break;
  
        case "right":
          snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
          });
          break;
  
        default:
          break;
      }
      changeFruitPosition();
    }
  }

function gameLoop() {
  if (!gameOver) {
    moveSnake();
    checkCollision(); 
    eat();
    draw();
  }
};

const gameInterval = setInterval(gameLoop, 100);
draw();