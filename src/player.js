class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.directionX = 1;
    this.directionY = 0;
    this.bullets = 0;
    this.score = 0;
    this.lifeTotal = 100;
    this.life = this.lifeTotal;
    this.size = [40, 60];
  }
}

export { Player };
