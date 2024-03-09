//Game constants
let inputDir={x: 0, y: 0};
const foodSound = new Audio('assets/Food.mp3');
const moveSound = new Audio('assets/move.mp3'); 
const gameoverSound = new Audio('assets/Gameover.mp3');
const backgroundMusic = new Audio('assets/backgroundsong2.mp3');
let speed = 5;
let score = 0; 
let lastPaintTime = 0;
let snakeArr = [
    {x:11 , y:13}
];
food={x:6 , y:7};
//Game Functions
function main(currtime){
    window.requestAnimationFrame(main);
    console.log(currtime); 
    if((currtime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=currtime;
    gameEngine();
   
}
function isCollide(snake){
    //when snake collide on it
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }
    //when snake collide on boundary
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
            return true;
        }
       return false;
    }
} 
function gameEngine(){
     // 1.Update the snake array and food 
     if (isCollide(snakeArr)) {
        gameoverSound.play();
        backgroundMusic.pause();
        inputDir={x: 0, y: 0};
        alert("Game is Over.Press any Key to Play again ");
        snakeArr=[{x:11, y:13}];
        backgroundMusic.play();
        score=0;
     }

     //if snake have eaten the food then increment the score and regenerate the food
     if(snakeArr[0].y=== food.y && snakeArr[0].x=== food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x:snakeArr[0].x+ inputDir.x, y:snakeArr[0].y+ inputDir.y})
        let a= 2;
        let b= 16;
        food= {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
     }

     //Moving the snake
     for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; 
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;
     //2. display the snake

     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
        snakeElement =document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
     });
    //3.display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

 












//Game logics
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir= {x:0 , y:1} //start thr game
    moveSound.play(); 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
     
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
                
                
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;


        default:
            break;
    }
});