const discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);

const sql = require("sqlite");

const bot = new discord.Client();
bot.config = require("./config.json");

sql.open("./quotes.sqlite");

require("./modules/functions.js")(bot);

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

(async function() {

    const commandFiles = await readdir('./commands/');
    bot.login("log", `Loading ${commandFiles.length} commands!`);
    commandFiles.forEach(f => {
        try {
            let commandFile = require(`./commands/${f}`);
            bot.log("log", `Loading the ${commandFile.help.name} command!`);
            bot.commands.set(commandFile.help.name, commandFile);
            commandFile.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, commandFile.help.name);
            });    
        } catch (e) {
            bot.log(`Unable to load command ${f}: ${e}`);
        }
    });

    const eventFiles = await readdir('./events/');
    bot.login("log", `Loading ${eventFiles.length} events!`);
    eventFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    bot.login(bot.config.token);

}());

/*

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFuntion = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));   
    });
});

bot.on("ready", () => {
    bot.user.setGame("robots are gay");
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

bot.login(config.token);*/