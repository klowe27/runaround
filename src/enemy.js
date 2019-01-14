class Enemy {
  constructor(type){
    this.type = type;
    this.x = 0;
    this.y = 0;
    this.life = 0;
    this.lifeTotal = this.getTotalByType(type);
  }

  getTotalByType(type){
    switch(type) {
    case 0:
      return 20;
    default:
      return 0;
    }
  }
}

export { Enemy };
