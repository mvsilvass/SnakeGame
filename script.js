const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

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
const apple = document.createElement('img');
apple.src = 'assets/apple.png';

function drawGrades(){
    ctx.fillStyle = "#aaa";
    for (let i = 1; i < division; i++){
        ctx.fillRect(0, i * WidthSquare, canvas.width, 0.8);
        ctx.fillRect(i * HeigthSquare, 0, 0.8, canvas.height);
    }
};

function drawSnake(){
    ctx.fillStyle = "#15750e";
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
    ctx.fillStyle = "#F6ECF4";
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    drawGrades();
    drawSnake();

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
});

function game(){
    moveSnake();
    draw();
};

setInterval(game, 100);
