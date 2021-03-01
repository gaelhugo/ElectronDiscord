class Motor {
  constructor(ctx, ancestor = null) {
    this.ctx = ctx;
    this.ancestor = ancestor;
    this.targetx = 0;
    this.targety = 0;
    this.radius = 100;
    this.angle = 0;
    this.speed = 1;
    this.color = "black";
    this.shouldDraw = false;
    this.tint = 50;
    this.points = [];
  }
  update() {
    this.targetx =
      this.ancestor.targetx +
      Math.cos((this.angle * Math.PI) / 180) * this.radius;
    this.targety =
      this.ancestor.targety +
      Math.sin((this.angle * Math.PI) / 180) * this.radius;
    this.angle += this.speed;

    if (this.log) {
      console.log(this.points.length);
    }

    if (this.shouldDraw) {
      this.points.push({ x: this.targetx, y: this.targety });
      //   if (Math.abs(this.angle) >= this.max) {
      if (this.points.length >= 480) {
        this.points.shift();
        // this.angle = 0;
      }
    }
  }
  draw() {
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = this.color;
    this.points.forEach((item, index) => {
      if (index == 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(item.x, item.y);
      } else {
        this.ctx.lineTo(item.x, item.y);
      }
    });
    this.ctx.stroke();
    this.ctx.closePath();

    // extra lines
    if (this.shouldDraw && this.ancestor.shouldDraw) {
      this.ctx.lineWidth = 1;

      this.points.forEach((item, index) => {
        this.ctx.strokeStyle = `hsla(${10 - index}, 100%, ${this.tint}%,0.2)`;
        const _index = Math.floor(
          this.map(index, 0, this.points.length, this.ancestor.points.length, 0)
        );
        if (this.ancestor.points[_index]) {
          this.ctx.beginPath();
          this.ctx.moveTo(item.x, item.y);
          this.ctx.lineTo(
            this.ancestor.points[_index].x,
            this.ancestor.points[_index].y
          );
          this.ctx.stroke();
          this.ctx.closePath();
        }
      });
    }
  }

  map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}

module.exports = { Motor };
