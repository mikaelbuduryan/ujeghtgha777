const LivingCreature = require('./LivingCreature')

module.exports = class Human extends LivingCreature {
    constructor(x,y) {
        super(x,y);
        this.multiply = 0;
        this.energy = 2;
        this.gender = this.getGender();
    }

    getGender(){
        let gender = Math.floor(Math.random()*2)
        if(gender)
            return true
        else
            return false
    }

    getNewCoordinates() {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let x = this.x + i;
                let y = this.y + j;
                if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                    this.directions.push([x, y]);
                }
            }
        }
    }

 
    mul(number) {
        this.multiply++;

        let found = this.randomNum(this.chooseCell(6));
        if (found) {
            let x = found[0];
            let y = found[1];
            matrix[y][x] = 1;
            var newHuman = new Human(x, y)
            humanArr.push(newHuman);
            if(newHuman.gender){
            humanMult++
            }
            else{
            humanMult--
            }
            this.multiply = 0;
            this.energy++;
            let human = new Human(x, y);
            humanArr.push(human);
            this.energy = 10;
        }
        else {
            this.move();
        }
    }


    move() {
        let found = this.chooseCell(0);
        let emptyCell = found[Math.floor(Math.random() * found.length)];
        if (emptyCell) {
            this.energy--;
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
           
        }
        else {
            this.energy--;
            this.die();
        }

    }


    die(){
        for (let i in humanArr) {
            if (humanArr[i].x === this.x && humanArr[i].y === this.y) {
                humanArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }

}


