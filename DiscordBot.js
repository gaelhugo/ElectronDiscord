const { Client, MessageEmbed } = require("discord.js");
const { Notification, ipcMain } = require("electron");

const TOKEN = "***";

class DiscordBot {
  constructor(win, token = TOKEN) {
    this.win = win;
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
    if (message.content.includes("🍩")) {
      this.showNotification("donuts have been sent from discord");
      const donuts = message.content.split("🍩");
      console.log(donuts);
      const count = donuts.length;
      // We can create embeds using the MessageEmbed constructor
      // Read more about all that you can do with the constructor
      // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
      const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("YOU SEEM TO LIKE DONUTS !")
        // Set the color of the embed
        .setColor(0xffffff)
        // Set the main content of the embed
        .setDescription("I've counted, " + (count - 1) + " 🍩. Bon appetit");
      // Send the embed to the same channel as the message
      message.channel.send(embed);
    }

    if (message.content.includes("🤖")) {
      this.showNotification("Robot rocks!");
      this.win.webContents.send("robot", "whoooooooh!");
    }

    if (message.content.includes("👍")) {
      this.showNotification("Like from discord");
      const likes = message.content.split("👍");
      const count = likes.length;
      this.win.webContents.send("like", count - 1);
    }
    if (message.content.includes("👏")) {
      this.showNotification("Clap from discord");
      const claps = message.content.split("👏");
      const count = claps.length;
      this.win.webContents.send("clap", count - 1);
    }
  }
}

module.exports = { DiscordBot };
