const LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x,y) {
        super(x,y);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],     
            [this.x, this.y + 1]
        ];
    }


    eat() {
        let found = this.chooseCell(1);
        let emptyCell = this.randomNum(found);

        if (emptyCell) {
            this.energy += 2;
            let x = emptyCell[0];
            let y = emptyCell[1];

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }

            }
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy > 12) {
                this.mul();
            }
        }
        else {
            this.move();
        }

    }
    move() {
        let found = this.chooseCell(0);
        let emptyCell = this.randomNum(found);
        if (emptyCell) {
            this.energy--;
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy < 0) {
                this.die();
            }
        }
        
        else {
            this.energy--;
            this.die();
        }

    }
    die() {
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
    mul() {
        let found = this.chooseCell(0);
        let emptyCell = this.randomNum(found);
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 2;
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            this.energy = 8;
        }
    }



}
