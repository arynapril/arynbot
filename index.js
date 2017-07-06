const discord = require('discord.js');
const bot = new discord.Client();
const sql = require("sqlite");
const fs = require("fs");
const config = require("./config.json");

sql.open("./quotes.sqlite");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFuntion = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));   
    });
});

bot.on("ready", () => {
    bot.user.setGame("💖");
    console.log("I am ready! <3");
});

bot.on("message", (message) => {
  if (message.content.startsWith("im") || message.content.startsWith("i'm") || message.content.startsWith("I'm")) {
      let args = message.content.split(" ").slice(1);
      let joke = args.join(" ");
      message.channel.send(`Hi **${joke}**, I'm arynbot! :heart:`);
  }

  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  //if (message.author.id==243174457336791041) return;

  const args = message.content.split(" ");
  const command = args.shift().slice(config.prefix.length);

  try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(bot, message, args);
  }
  catch (err) {
      console.error(err);
      message.channel.send("Command does not exist! :heart:")
  }

});

bot.login(config.token);