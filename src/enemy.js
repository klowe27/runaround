class Enemy {
  constructor(type){
    this.type = type;
    this.x = 500;
    this.y = 500;
    this.life = 0;
    this.lifeTotal = this.getTotalByType(type);
    this.size = this.getSizeByType(type);
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
}

export { Enemy };
