class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;

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


    chooseCell(character, character1,ch) {
        let found = [];
        this.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character1 || matrix[y][x] === character || matrix[y][x] === ch) {
                    found.push(this.directions[i])
                }

            }
        }
        return found;


    }
    eat() {
        let found = this.chooseCell(1, 2);
        let emptyCell = random(found);
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
            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }

            }
            for (let i in rabbitArr) {
                if (x == rabbitArr[i].x && y == rabbitArr[i].y) {
                    rabbitArr.splice(i, 1);
                    break;
                }

            }
            matrix[y][x] = 3;
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
        let emptyCell = random(found);
        if (emptyCell) {
            this.energy--;
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 3;
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
        for (let i in predatorArr) {
            if (predatorArr[i].x === this.x && predatorArr[i].y === this.y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
    mul() {
        let found = this.chooseCell(0);
        let emptyCell = random(found);
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.energy = 8;
        }
    }



}