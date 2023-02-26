class Human {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 10;
        this.directions = [];
        this.getNewCoordinates();
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

    chooseCell(index) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (matrix[y][x] == index) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

   
 
    mul() {
        this.multiply++;
        let found = this.chooseCell(6);
        if (found) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 1;
            humanArr.push(new Human(x, y));
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

    }
}

setTimeout(() => {
      mull();  
}, 1000);