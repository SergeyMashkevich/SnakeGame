//Import of images

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

var mouseX;
var mouseY;

const menuImg = new Image();
menuImg.src = "BlueBackground.png";

const ground = new Image();
ground.src = "BlueGameGround.png";

const foodImg = new Image();
foodImg.src = "iconfinder_Apple_2137818.png";

//SnakeHead

let snakeHeadImgUp = new Image();
snakeHeadImgUp.src = "SnakeheadUp.png";

let snakeHeadImgDown = new Image();
snakeHeadImgDown.src = "SnakeheadDown.png";

let snakeHeadImgRight = new Image();
snakeHeadImgRight.src = "SnakeheadRight.png";

let snakeHeadImgLeft = new Image();
snakeHeadImgLeft.src = "SnakeheadLeft.png";





//Buttons
const snakeGameButtonImg = new Image();
snakeGameButtonImg.src = "SnakeGame.png";

const playButtonImg = new Image();
playButtonImg.src = "Play.png";

const instructionsButtonImg = new Image();
instructionsButtonImg.src = "Instructions.png";


const creditsButtonImg = new Image();
creditsButtonImg.src = "Credits.png";




//Game

let box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir = "none";


    function direction(event) {
        if (event.keyCode == 37 && dir != "right")
            dir = "left";
        else if (event.keyCode == 38 && dir != "down")
            dir = "up";
        else if (event.keyCode == 39 && dir != "left")
            dir = "right";
        else if (event.keyCode == 40 && dir != "up")
            dir = "down";
    }


function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(menu);
    };
};

//function rotateAndPaintImage(ctx, image, angleInDeg, positionX, positionY) {
//    ctx.save();
//    ctx.translate(positionX + 16, positionY + 16);
//    ctx.rotate(angleInDeg * Math.PI / 180);
//    ctx.translate(-16, -16);
//    ctx.drawImage(image, 0, 0);
//    ctx.restore();
//};


//Drawing of menu

let mode;
mode = 0;

function clear() {
    ctx.clearRect(0, 0, 608, 608);
}

function drawMenu() {
    clear();
    if (mode == 0) {
        //ctx.drawImage(menuImg, 0, 0);
        //ctx.drawImage(snakeGameButtonImg, 152, 60);
        //ctx.drawImage(playButtonImg, 152, 120);
        //ctx.drawImage(instructionsButtonImg, 152, 180);
        //ctx.drawImage(creditsButtonImg, 152, 240);

        //ctx.fillStyle = "white";
        //ctx.font = "32px Arial";
        //ctx.fillText("Press Enter", 200, 140);

    } else {
        drawGame()
    }
}

//playButtonImg.addEventListener("click", handle, false);

//function handle(event) {
//    if (event.click === ctx.playButtonImg) {
//        alert("Enter was pressed was presses");
//        mode++
//    }
//}

var imgPlay = document.getElementById("Play");
ctx.drawImage(Play, 0, 0);
document.getElementById("Play").addEventListener("click", function () { mode = 1 }, false);



let menu = setInterval(drawMenu, 100)







//Drawing of Game

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {

        if (i == 0) {
            if (dir == "up" || dir == "none") {
                //rotateAndPaintImage(ctx, snakeHeadImgUp, 0, snake[i].x, snake[i].y);
                ctx.drawImage(snakeHeadImgUp, snake[i].x, snake[i].y)
            }
            else if (dir == "down") {
                //rotateAndPaintImage(ctx, snakeHeadImgUp, 180, snake[i].x, snake[i].y);
                ctx.drawImage(snakeHeadImgDown, snake[i].x, snake[i].y)
            }

            else if (dir == "left") {
                //rotateAndPaintImage(ctx, snakeHeadImgUp, -90, snake[i].x, snake[i].y);
                ctx.drawImage(snakeHeadImgLeft, snake[i].x, snake[i].y)
            }
            else if (dir == "right") {
                //rotateAndPaintImage(ctx, snakeHeadImgUp, 90, snake[i].x, snake[i].y);
                ctx.drawImage(snakeHeadImgRight, snake[i].x, snake[i].y)
            }

        }
        else {
            ctx.fillStyle = "blue";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        };
    };

    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText('food ' + '= ' + score, box * 2, box * 1.6);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++
        
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
    } else {
        snake.pop();
    };

    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17) {
        //document.location.reload()
        //alert("You lose")
        clearInterval(menu)

    }




    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead)
};



