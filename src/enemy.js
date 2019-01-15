class Enemy {
  constructor(type){
    this.type = type;
    this.x = 500;
    this.y = 500;
    this.lifeTotal = this.getTotalByType(type);
    this.life = this.lifeTotal;
    this.size = this.getSizeByType(type);
    this.strength = this.getStrengthByType(type);
  }

  getTotalByType(type){
    switch(type) {
    case 0:
      return 20;
    default:
      return 0;
    }
  }

  getSizeByType(type){
    switch(type) {
    case 0:
      return [40, 40];
    default:
      return [40, 40];
    }
  }

  getStrengthByType(type) {
    switch(type) {
    case 0:
      return 20;
    default:
      return 20;
    }
  }

}

export { Enemy };
