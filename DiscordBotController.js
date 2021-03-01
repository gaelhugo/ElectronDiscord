const { Client, MessageEmbed } = require("discord.js");
const { Notification } = require("electron");
const robot = require("robotjs");
// http://robotjs.io/

class DiscordBotController {
  constructor(
    token = "ODAyOTM0Mjc2ODQ4MjIyMjQ4.YA2c0Q.mcqsAjhjm3TiC7WK79s2QrD8Otg"
  ) {
    this.token = token;
    this.client = new Client();

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
  }

  onReady() {
    console.log("I am ready!");
  }

  showNotification(message = "Notification from the Main process") {
    const notification = {
      title: "Basic Notification",
      body: message,
    };
    new Notification(notification).show();
  }

  onMessage(message) {
    /**
     * EXEMPLE
     */

    if (message.content.includes("💻")) {
      this.showNotification("Wait for 2 circles with your mouse");
      // Speed up the mouse.
      robot.setMouseDelay(2);

      const twoPI = Math.PI * 2.0;
      const screenSize = robot.getScreenSize();
      const height = screenSize.height / 2 - 10;
      const width = screenSize.width;
      let angle = 0;
      let counter = 0;

      // for (let x = 0; x < width; x++) {
      //   const y = height * Math.sin((twoPI * x) / width) + height;
      //   robot.moveMouse(x, y);
      // }
      while (counter < 2) {
        angle += 0.2;
        const x = width / 2 + Math.cos((angle * Math.PI) / 180) * height;
        const y =
          screenSize.height / 2 + Math.sin((angle * Math.PI) / 180) * height;
        robot.moveMouse(x, y);
        if (angle >= 360) {
          counter++;
          angle = 0;
        }
      }
    }
  }
}

module.exports = { DiscordBotController };
