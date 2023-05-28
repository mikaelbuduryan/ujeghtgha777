const LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        let found = this.chooseCell(0);
        let emptyCell = this.randomNum(found);

        if (emptyCell && this.multiply > 4) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y))
            grassArr.push(new Grass(x+1, y))
            this.multiply = 0;
        }
    }

    show() {
        if (weather.currentCondition === "snowy") {
          fill("white");
        } else {
          fill("green");
        }
        rect(this.x * side, this.y * side, side, side);
      }

}