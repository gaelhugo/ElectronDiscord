const { Client, MessageEmbed } = require("discord.js");
const { Notification } = require("electron");
const { Board, Led } = require("johnny-five");

class DiscordBotArduino {
  constructor(
    token = "ODAyOTM0Mjc2ODQ4MjIyMjQ4.YA2c0Q.mcqsAjhjm3TiC7WK79s2QrD8Otg"
  ) {
    this.token = token;
    this.client = new Client();

    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);

    this.board = new Board();
    this.board.on("ready", this.onBoardReady.bind(this));
  }

  onBoardReady() {
    // Create an Led on pin 13
    const led = new Led(9);
    // Blink every half second
    led.blink(500);
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

    if (message.content.includes("🤖")) {
    }
  }
}

module.exports = { DiscordBotArduino };
