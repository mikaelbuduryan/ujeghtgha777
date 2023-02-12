var matrix = [
    [0, 0, 1, 5],
    [1, 0, 2, 0],
    [4, 1, 0, 3],
    [0, 3, 1, 0]
];


var side = 120;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let rabbitArr = [];
let dragonArr = [];




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
}
