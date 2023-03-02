//If gender = false ,it's a female
//If gender = true ,it's a male

//frameRate(1);
var game = true
function toggleFrameRate() {
    game = !game
    console.log(game)
    if(!game)
        noLoop()
    else
        loop()
  }

const numRows = 10;
const numCols = 10;

const matrix = new Array(numRows).fill(0).map(() => new Array(numCols).fill(0));

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    matrix[i][j] = Math.floor(Math.random() * 7);
  }
}


console.log(matrix);


var side = 120;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let rabbitArr = [];
let dragonArr = [];
let humanArr = [];
let humanMult = 0;
let humanCount = 0


function setup() {
    frameRate(1);
    
    
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                grassArr.push(new Grass(x, y));
            }
            else if (matrix[y][x] === 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] === 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator)
            }
            else if (matrix[y][x] === 4) {
                let rabbit = new Rabbit(x, y);
                rabbitArr.push(rabbit)
            }
            else if (matrix[y][x] === 5) {
                let dragon = new Dragon(x,y);
                dragonArr.push(dragon)
            }
            else if (matrix[y][x] === 6) {
                let human = new Human(x,y);
                if(human.gender)
                    humanMult++
                else
                    humanMult--
                humanCount++
                humanArr.push(human)
            }
        }

    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            else if (matrix[y][x] == 6) {
                fill("tan");
            }

            rect(x * side, y * side, side, side);
        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < rabbitArr.length; i++) {
        rabbitArr[i].eat()
    }
    for (let i = 0; i < dragonArr.length; i++) {
        dragonArr[i].eat()
    }
    for (let i = 0; i < humanArr.length; i++) {
        humanArr[i].move()
        // if(frameCount < 31)
        //     humanArr[i].mul((humanCount-humanMult)/2)

    }
}





