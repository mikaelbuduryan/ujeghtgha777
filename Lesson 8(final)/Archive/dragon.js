const LivingCreature = require('./LivingCreature')

module.exports = class Dragon extends LivingCreature {
    constructor(x,y) {
        super(x,y);
        this.energy= 5;
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


    eat(){
        let found = this.chooseCell(2) || this.chooseCell(3);
        let emptyCell = this.randomNum(found);
        if (emptyCell) {
            this.energy += 2;
            let x = emptyCell[0];
            let y = emptyCell[1];

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
            for (let i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }

            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        
            
    }
    else{
        this.move();
    }
}

    move(){
        let found = this.chooseCell(0);
        let emptyCell = this.randomNum(found);
        if (emptyCell) {
            this.energy--;
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 5;
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


    
    die(){
        for (let i in dragonArr) {
            if (dragonArr[i].x === this.x && dragonArr[i].y === this.y) {
                dragonArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}