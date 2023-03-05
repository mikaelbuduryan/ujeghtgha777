class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;

        this.directions = [

            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],     
            [this.x, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],     
            [this.x, this.y + 1]
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
        return found

    }
    eat() {
        let found = this.chooseCell(1);
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
        let emptyCell = random(found);
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
        let emptyCell = random(found);
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
