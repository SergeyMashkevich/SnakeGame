//Import of images

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const menuImg = new Image();
menuImg.src = "BlueBackground.png";

const ground = new Image();
ground.src = "BlueGameGround.png";

const foodImg = new Image();
foodImg.src = "iconfinder_Apple_2137818.png";

let snakeHeadImgUp = new Image();
snakeHeadImgUp.src = "SnakeheadUp.png";

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
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    };
};


function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {



            clearInterval(game);

            //ctx.drawImage(menuImg, 0, 0);

            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("You lost, try to avoid hitting the body with the head!", 2 * box, 10 * box);



            //alert("You lost, try to avoid hitting the body with the head!");
            //document.location.reload();
        }; 
    };
};

function rotateAndPaintImage(ctx, image, angleInDeg, positionX, positionY) {
    ctx.save();
    ctx.translate(positionX + 16, positionY + 16);
    ctx.rotate(angleInDeg * Math.PI / 180);
    ctx.translate(-16, -16);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
};

//Menu
var i = 0;
let game;
document.getElementById("Play").addEventListener("click", function () {
    speedButtons();
    i++;
    game = setInterval(drawGame, intervalSpeed);
}, false);
document.getElementById("Instruct").addEventListener("click", function () { alert("Use the arrow keys to move the \"snake\" around the field.") }, false);
document.getElementById("Credit").addEventListener("click", function () { alert("Made by Sergey." + "\n" + "\"Snake game\", writen in; js, html and css." + "\n"  + "Information about the collecting the game was taken from various auxiliary sites.") }, false);

//Drawing of Game

//
var intervalSpeed = 100;
var speed = 1;
function speedButtons() {

    
    
    var value;
    if (i == 0) {
    value = true
    };

    /*var value = true;*/ //условие появления кнопки, true - появиться, false - нет 
    var btnSpeedUp = document.createElement('button');//создаём нашу кнопку

    var textInbtnSpeedUp = document.createTextNode('speed Up');//создаем текст для кнопки

    btnSpeedUp.appendChild(textInbtnSpeedUp);//добавляем текст в кнопку

    if (value) {//в зависимости от условия добавляем кнопку в документ
        document.body.appendChild(btnSpeedUp);
       
        
    }

    btnSpeedUp.onclick = function () {
        clearInterval(game);
        game = setInterval(drawGame, intervalSpeed -= 10);
        speed += 1;
    };
    
    //
    
    //

    /*var value = true*/ //условие появления кнопки, true - появиться, false - нет 
    var btnSpeedDown = document.createElement('button');//создаём нашу кнопку

    var textInbtnSpeedDown = document.createTextNode('speed Down');//создаем текст для кнопки

    btnSpeedDown.appendChild(textInbtnSpeedDown);//добавляем текст в кнопку

    if (value) {//в зависимости от условия добавляем кнопку в документ
        document.body.appendChild(btnSpeedDown);
    }
    btnSpeedDown.onclick = function () {
        clearInterval(game);
        game = setInterval(drawGame, intervalSpeed += 10)
        speed -= 1;
    };
} 
//


function drawGame() {

    //
    
//


    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {

        if (i == 0) {
            if (dir == "up" || dir == "none") {
                rotateAndPaintImage(ctx, snakeHeadImgUp, 0, snake[i].x, snake[i].y);
                
            }
            else if (dir == "down") {
                rotateAndPaintImage(ctx, snakeHeadImgUp, 180, snake[i].x, snake[i].y);
               
            }

            else if (dir == "left") {
                rotateAndPaintImage(ctx, snakeHeadImgUp, -90, snake[i].x, snake[i].y);
                
            }
            else if (dir == "right") {
                rotateAndPaintImage(ctx, snakeHeadImgUp, 90, snake[i].x, snake[i].y);
                
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
    ctx.fillText('speed ' + '= ' + speed, box * 6, box * 1.6);


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


        clearInterval(game);

        //ctx.drawImage(menuImg, 0, 0);

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("You lost. Try not to hit the walls directly with the head!", 2 * box, 10 * box);
        
      

        //alert("You lost, try not to hit the walls directly with the head!")

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

    snake.unshift(newHead);
};



