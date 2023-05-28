let timeout = 2000

let count = 0;
let data = {}


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs')





app.use(express.static("."));
fs.writeFileSync('data.json', '')
app.get('/', function (req, res) {
    res.redirect('index.html');
});


server.listen(3000);

let Grass = require("./grass")
let GrassEater = require("./grasseater")
let Predator = require("./predator")
let Rabbit = require("./rabbit")
let Human = require("./human")
let Dragon = require("./dragon")




matrix = [];

var numRows = 20;
var numCols = 20;
grassArr = [];
grassEaterArr = [];
predatorArr = [];
rabbitArr = [];
dragonArr = [];
humanArr = [];
humanMult = 0;
humanCount = 0;

function createCanvas() {
    for (let i = 0; i < numRows; i++) {
        var row = [];
        for (let j = 0; j < numCols; j++) {
            row.push(Math.floor((Math.random() * 6) + 1))
        }

        matrix.push(row)
    }

    for (let i = 0; i < numRows; i += 3) {
        var row = [];
        for (let j = 0; j < numCols; j += 2) {
            row.push(Math.floor(1))
        }

        matrix.push(row)
    }

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
                let dragon = new Dragon(x, y);
                dragonArr.push(dragon)
            }
            else if (matrix[y][x] === 6) {
                let human = new Human(x, y);
                if (human.gender)
                    humanMult++
                else
                    humanMult--
                humanCount++
                humanArr.push(human)
            }
        }

    }
}


function drawGame () {
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

    
    io.emit('matrix', matrix)
    return matrix
}


createCanvas()

setInterval(function () { 
    count += 1;

    data = {
    "frameCount":count,
    "grass": grassArr.length,
    "grassEater": grassEaterArr.length,
    "predator": predatorArr.length,
    "rabbit": rabbitArr.length,
    "dragon": dragonArr.length,
    "human": humanArr.length
}
io.emit('send data',(data));
fs.writeFileSync("data.json", JSON.stringify(data));
}, 1000);


setInterval(drawGame, timeout)

  
  io.on('connection', (socket) => {
    socket.on('sendMatrix', (matrixJSON) => {
        var matrix = JSON.parse(matrixJSON);
      });
    socket.emit('matrix', matrix) 
    socket.on('send data', (data) => {
        console.log(data);
        fs.appendFileSync('data.json', JSON.stringify(data) + endl);
        io.sockets.emit('show data', data)
    })
})
