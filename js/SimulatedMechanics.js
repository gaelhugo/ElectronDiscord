const { ipcRenderer } = require("electron");
const Motor = require("./js/Motor.js").Motor;

class SimulatedMechanics {
  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.initListeners();
    this.buildMotors();
    this.draw();
  }

  initListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
    // ELECTRON MAIN THREAD MESSAGE
    ipcRenderer.on("robot", (event, message) => {});

    ipcRenderer.on("like", (event, message) => {
      //   this.reset();
      this.secondMotor.speed = -1 * Math.min(message / 5, 10);
    });

    ipcRenderer.on("clap", (event, message) => {
      //   change properties from motor 2:
      this.thirdMotor.radius = message * 60;
      this.thirdMotor.speed = Math.min(message / 10, 1);
      this.thirdMotor.tint = 50 + message * 4;
    });
  }

  onResize(e) {
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    // update mainmotor
    this.mainMotor.ancestor = {
      targetx: this.w / 2,
      targety: this.h / 2,
    };
  }

  buildMotors() {
    this.mainMotor = new Motor(this.ctx, {
      targetx: this.w / 2,
      targety: this.h / 2,
    });

    this.secondMotor = new Motor(this.ctx, this.mainMotor);
    this.secondMotor.color = "rgba(255,255,255,.05)";
    this.secondMotor.radius = 150;
    this.secondMotor.shouldDraw = true;
    this.secondMotor.speed = -1 / 5;
    // this.secondMotor.log = true;

    this.thirdMotor = new Motor(this.ctx, this.secondMotor);
    this.thirdMotor.color = "rgba(255,255,255,.1)";
    this.thirdMotor.radius = 60;
    this.thirdMotor.tint = 54;
    this.thirdMotor.shouldDraw = true;
    // this.thirdMotor.log = true;
    this.thirdMotor.speed = 0.1;
  }

  reset() {
    this.mainMotor.angle = 0;
    this.secondMotor.angle = 0;
    this.secondMotor.points = [];
    this.thirdMotor.angle = 0;
    this.thirdMotor.points = [];
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.mainMotor.update();
    this.secondMotor.update();
    this.secondMotor.draw();
    this.thirdMotor.update();
    this.thirdMotor.draw();
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  new SimulatedMechanics();
};
