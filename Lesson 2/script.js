class Creature{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  eat(){
    console.log("Eat")
  }
  die(){
    console.log("Die")
  }
}

class GrassEater extends Creature{
  mul(){
    console.log("mul")
  }
  move(){
    console.log("move")
  }
}

class Predator extends Creature{
  constructor(x,y,energy){
    super(x,y)
    this.energy = energy
  }
  chooseCell(){
    console.log("Random cell")
  }
}

var lion = new Predator(10,20,45)