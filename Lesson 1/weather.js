class Weather {
    constructor() {
      this.conditions = ["sunny", "snowy"];
      this.currentCondition = this.conditions[0];
    }
  
    change() {
      const randomIndex = Math.floor(Math.random() * this.conditions.length);
      this.currentCondition = this.conditions[randomIndex];
    }
  }
  