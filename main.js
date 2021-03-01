const { app, BrowserWindow } = require("electron");

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
  win.setFullScreen(true);
  // win.maximize();
}

function initBot() {
  // bot integration
  const DiscordBot = require("./DiscordBot").DiscordBot;
  const Bot = new DiscordBot(win);

  // const DiscordBotController = require("./DiscordBotController")
  //   .DiscordBotController;
  // const Bot = new DiscordBotController(
  //   "ODEyNDU3Mjk2NTU0MzYwODMy.YDBB0g.RdNLbCWOzkKaTQvojc1P9QuZcFQ"
  // );
  // const DiscordBotArduino = require("./DiscordBotArduino").DiscordBotArduino;
  // const Bot = new DiscordBotArduino(
  //   "ODEyNDU3Mjk2NTU0MzYwODMy.YDBB0g.RdNLbCWOzkKaTQvojc1P9QuZcFQ"
  // );
}

app.whenReady().then(createWindow).then(initBot);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
