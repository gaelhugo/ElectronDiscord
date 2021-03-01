class App {
  constructor() {
    console.log("LAUNCHED");
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 6;
    this.mainAngle = 0;
    this.alpha = 0;

    this.position = { x: this.w / 2, y: this.h / 2 };
    this.initListeners();
    setTimeout(() => {
      this.isDelaying = true;
    }, 6000);
    this.draw();
  }

  initListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize(e) {
    this.ctx.lineWidth = 6;
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.position = { x: this.w / 2, y: this.h / 2 };
  }

  draw() {
    // console.log("draw");
    // this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.w, this.h);
    // this.position.x++;
    // if (this.position.x + 100 > this.w) this.position.x = -100;
    for (let i = 0; i < 99; i++) {
      this.ctx.strokeStyle =
        i % 2 == 0
          ? `rgba(37,174,228,${0.01 * i})`
          : i % 3 == 0
          ? `rgba(255,255,255,${0.01 * i})`
          : `rgba(255,0,${0},${0.01 * i})`;
      this.ctx.beginPath();
      // this.ctx.arc(
      //   this.position.x +
      //     Math.cos(((this.mainAngle + i * 5) * Math.PI) / 180) * (50 + i),
      //   this.position.y +
      //     Math.sin(((this.mainAngle + i * 8) * Math.PI) / 180) * (50 + i),
      //   500 - i * 5,
      //   0,
      //   Math.PI * 2,
      //   false
      // );
      this.triangle(
        this.position.x +
          Math.cos(((this.mainAngle + i * 5) * Math.PI) / 180) * (50 + i),
        this.position.y +
          Math.sin(((this.mainAngle + i * 6) * Math.PI) / 180) * (50 + i),
        500 - i * 5,
        (this.alpha * i) / 2
      );

      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
      if (this.isDelaying) this.alpha += 0.0001;
    }
    this.mainAngle++;
    requestAnimationFrame(this.draw.bind(this));
  }

  triangle(x, y, radius, i) {
    this.ctx.moveTo(
      x + Math.cos(((30 + i) * Math.PI) / 180) * radius,
      y + Math.sin(((30 + i) * Math.PI) / 180) * radius
    );
    this.ctx.lineTo(
      x + Math.cos(((150 + i) * Math.PI) / 180) * radius,
      y + Math.sin(((150 + i) * Math.PI) / 180) * radius
    );
    this.ctx.lineTo(
      x + Math.cos(((270 + i) * Math.PI) / 180) * radius,
      y + Math.sin(((270 + i) * Math.PI) / 180) * radius
    );
    this.ctx.lineTo(
      x + Math.cos(((30 + i) * Math.PI) / 180) * radius,
      y + Math.sin(((30 + i) * Math.PI) / 180) * radius
    );
  }
}

window.onload = () => {
  new App();
};
