const LivingCreature = require('./LivingCreature')

module.exports = class Rabbit extends LivingCreature {
    constructor(x,y) {
        super(x,y);
        this.energy = 12;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character) {
        let found = [];
        this.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
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
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        } else {
            this.move();

        }

    }

    move() {
        let found = this.chooseCell(0);
        let emptyCell = this.randomNum(found);
        this.energy--;
        if (emptyCell && this.energy > 0) {
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        else {
            this.die();
        }

    }

    die() {
        for (let i in rabbitArr) {
            if (rabbitArr[i].x === this.x && rabbitArr[i].y === this.y) {
                rabbitArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

