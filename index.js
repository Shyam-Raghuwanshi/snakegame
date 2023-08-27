// game constant 
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3')
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const musicSound = new Audio('../music/music.mp3')
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 3, y: 5 }


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        // console.log('inside lastpaint time '+ lastPaintTime);
        // console.log('this is inside '+(ctime)/1000);
        return;
    }
    // console.log('lastpainttime if ke outside '+lastPaintTime);
    // console.log('this is currinttime ' + ctime);
    lastPaintTime = ctime;
    // console.log('this is outside' + (ctime)/1000);
    gameEngine()
}

function isCollide(snake) {
    // return false
    
    // if you bump in yourself
    for (let i = 1; i < snakeArr.length; i++) {
        // console.log('array lenth is ' + snakeArr.length);
        // console.log('this is i ' + i);
        // console.log('this is for snake[i] '+ snake[i]);
        // console.log('this is outside snake zero '  +snake[0]);
       if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            
            // console.log('first if this is snake 0 x ' + snake[0].x)
            // console.log('first if  this is snake i x ' + snake[i].x)
            // console.log('first if  this is snake i y ' + snake[i].y)
            // console.log('first if this is snake 0 y ' + snake[0].y)
            return true;

        }

    }
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            // console.log('second if this is snake 0 x ' + snake[0].x)
            // console.log('second if this is snake 0 y ' + snake[0].y)
            return true;
        }
        return false;


}


function gameEngine() {
    // Updating the snake array and Food
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        musicSound.pause()
        moveSound.pause()
        a = 0;
        b = 18;
        inputDir = { x: 0, y: 0 }
        alert('Game Over! Press any to restart')
        score = 0;
        scorebox.innerHTML = 'Score: '+ 0
        
        snakeArr = [{ x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }]
        // snakeArr = [{ x: a, y: b }]

        // musicSound.play()
       
    }

    // If you have eaten the food, increment the score and regenrate the food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        let a = 2;
        let b = 16;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        foodSound.play()
        


        // scorebox setting 
        score += 1;

        let scorebox = document.getElementById('scorebox')
        scorebox.innerHTML = 'Score: '+ score

        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
            highscorebox.innerHTML = "HighScore: " + hiscoreval
        }
        
        
       

    }

    // Moving the snake 

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] }

    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // display the snake and Food
    // let board = document.getElementById('board')
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        // console.log(e.y);
        snakeElement.style.gridColumnStart = e.x;
        // console.log(e.x);
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    // Display the food 
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}


// highscorebox setting 
// let highscorebox = document.getElementById('highscorebox')
// let hiscore = localStorage.getItem('hiscore')
// if(hiscore == null){
//     hiscoreval = 0;
//     localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
// }
// else{
//     // localStorage.setItem('highscore', highscore)
//    hiscoreval = JSON.parse(hiscore)
//    console.log('this is highscore'+ hiscore);
//    highscorebox.innerHTML = 'HighScore: ' + hiscore 
    

// }
// harry bhai 
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML = "HiScore: " + hiscore;
}



// maing logic start here 
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play()
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})




// Extra 
// if(score>highscore){
//     highscore = score;
//     localStorage.setItem('hiscore', JSON.stringify(highscorevalue))
//     highscorebox.innerHTML = 'HighScore: '+ highscorevalue

// }
