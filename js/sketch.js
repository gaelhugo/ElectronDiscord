const { ipcRenderer } = require("electron");

let speed = 1;
let x = -40;
let y = 0;
function setup() {
  createCanvas(800, 600);
  y = height / 2;
}

ipcRenderer.on("like", (event, message) => {
  speed = message;
});

function draw() {
  background(220);
  x += speed;
  if (x - 40 > width) {
    x = -40;
  }
  ellipse(x, y, 80, 80);
}
