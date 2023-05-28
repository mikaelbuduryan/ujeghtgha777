module.exports = class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 2;
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

    chooseCell(ch) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i])

                }
            }
        }
        return found;
    }
    randomNum(arr) {
        let result = Math.floor(Math.random() * arr.length)
        return arr[result];
    }
}

