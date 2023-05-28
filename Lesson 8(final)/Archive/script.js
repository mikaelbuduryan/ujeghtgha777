//If gender = false ,it's a female
//If gender = true ,it's a male
//Only humans have genders


// var game = false
// var winter = false

isButtonClicked = false;

//also add the opposite condition
document.getElementById("myButton").addEventListener("click", function() {
    if(isButtonClicked){
    isButtonClicked = false;
    }
    else{
        isButtonClicked = true
    }

  });

let socket = io()
side = 120;
let mt = [];

// function toggleFrameRate() {
//     game = !game
//     if(!game){
//         noLoop()
//     }
//     else {
//         loop()
//     }
// }





function setup() {
    // frameRate(1)
    // toggleFrameRate()
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

function drawing(matrix) {
       

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(isButtonClicked)
                    fill('white');
                else
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

            if (round(random(5)) < 1) {      
                {
                    matrix[y][x] = 7;
                    rect(x * side, y * side, side, side);
                }
            }
        }
    }
}

var matrixJSON = JSON.stringify(mt);
socket.emit('sendMatrix', matrixJSON);


socket.on("matrix", function(matrix){
    mt = matrix
    drawing(matrix)
})


function fetchData() {

    fetch('data.json')
      .then(response => response.json())
      .then(data => {

        const container = document.getElementById('data-container');
  
  
        container.innerHTML = '';
  

        for (let key in data) {
          if (data.hasOwnProperty(key)) {

            const paragraph = document.createElement('p');
  

            paragraph.textContent = `${key}: ${data[key]}`;
  
 
            container.appendChild(paragraph);
          }
        }
      })
      .catch(error => console.error(error));
  }
  

  fetchData();
  

  setInterval(fetchData, 1000);
  