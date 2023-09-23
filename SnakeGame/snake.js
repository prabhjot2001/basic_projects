const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX =0 , velocityY = 0;
let gameOver = false ;
let setIntervalId;
let score = 0 ;
// getting high score from the local storage 
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Hi score: ${highScore}`;

const changeFoodPosition = () => {
    //passing a random 0-30 value as food position
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1;
}

const handleGameOver = () =>{
    //clearing the interval and reloading the page on game over
    clearInterval(setIntervalId)
    alert("Game Over! Press ok to replay...");
    location.reload();
}
const changeDirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}
const initGame = () =>{
    if(gameOver == true){
        return handleGameOver();
    }
    let htmlMarkup = `<div class ="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    
    //checking if the snake hits the food 
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        highScore = score>=highScore?score: highScore;
        localStorage.setItem("high-score", highScore);
        score++; //incremented score by one
        scoreElement.innerText = `score : ${score}`
        highScoreElement.innerText = `High score : ${highScore}`
    }
     for (let i = snakeBody.length - 1; i > 0; i--) {
        // shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i-1];
        
     }
    //setting first element of snake body to current snake position
    snakeBody[0] = [snakeX, snakeY];


    //updating snake head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
//checking if snake hits the wall
    if(snakeX <= 0 || snakeX > 30 || snakeY<=0 || snakeY > 30){
        gameOver = true;
    }

    for(let i =0; i<snakeBody.length; i++){
        //adding a div for each part of the snake's body
            htmlMarkup += `<div class ="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
            // checking if snake hits his ows body
            if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                gameOver = true;
            }
    }

    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
// now head will move after every 125 miliseconds (speed of snake)
setIntervalId = setInterval(initGame, 285);

document.addEventListener("keydown", changeDirection);