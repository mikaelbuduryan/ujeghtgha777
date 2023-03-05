//If gender = false ,it's a female
//If gender = true ,it's a male
//Only humans have genders


const weather = new Weather();
var game = false
var winter = false
var matrix=[] ;
var numRows = 10;
var numCols = 10;


var side = 120;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var rabbitArr = [];
var dragonArr = [];
var humanArr = [];
var humanMult = 0;
var humanCount = 0;



function toggleFrameRate() {
    game = !game
    if(!game){
        noLoop()
    }
    else {
        loop()
    }
}

function WeatherChange() {
   weather.change();
}

function setup() {
    frameRate(1);
    
    toggleFrameRate()

    for (let i = 0; i < numRows; i++) {
        var row=[];
        for (let j = 0; j < numCols; j++) {
          row.push(Math.floor(Math.random() * 7)) 
        }

        matrix.push(row)
      }
    createCanvas(matrix.length * side, matrix[0].length * side);
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
    if (frameCount % 12 == 0){
        data = {
            "frameCount":Math.round(frameCount/60),
            "grass": grassArr.length,
            "grassEater": grassEaterArr.length,
            "predator": predatorArr.length,
            "rabbit": rabbitArr.length,
            "dragon": dragonArr.length,
            "human": humanArr.length
        }
        socket.emit('send data',(data));
    }
   

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weather.currentCondition == 'sunny')
                    fill("green");
                else
                    fill('white')
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

            if (round(random(5)) < 1) {      
                {
                    matrix[y][x] = 7;
                    rect(x * side, y * side, side, side);
                    
                }
            


            


            }
        }
    }


  

    for (let i = 0; i < grassArr.length; i++) {
        if(weather.currentCondition === "snowy"){
            if(frameCount % 2 == 0)
            grassArr[i].mul()

        }
        else if (frameCount % 2 == 0){
            grassArr[i].mul()
        }
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
    }

}


