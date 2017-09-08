const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    settingsArray = ['dadJokes', 'dadJokesJail', 'hallOfFameEnabled', 'hallOfFameEmote', 'hallOfFameLimit', 'hallOfFameChannel', 'welcomeMessagesEnabled', 'welcomeMessagesChannel']
    booleanArray = ['dadJokesEnabled', 'hallOfFameEnabled', 'welcomeMessagesEnabled'];
    channelArray = ['dadJokesJail', 'hallOfFameChannel', 'welcomeMessagesChannel'];
    	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you do not have permission to manage this server's setings!");
        if (settingsArray.indexOf(args[0]) != -1) {
            if (!args[1]) {
                bot.getSetting(args[0], message.guild).then(setting => {
                    message.channel.send(`The current **${args[0]}** setting is **${setting}**`);
                })
            } else {
                if (args[2]) return message.channel.send('Please enter only one value!')
                if (booleanArray.indexOf(args[0]) != -1 && (args[1] !== 1 || args[1] !== 0)) return message.channel.send(`The ${args[0]} value must be be either a 0 or a 1! Please try again!`);
                if (channelArray.indexOf(args[0]) != -1 && !message.mentions.channels.array()[0]) return message.channel.send(`The ${args[0]} value must be a channel mention! Please try again!`);
                if (args[0] == 'hallOfFameLimit' && !isNaN(args[1])) return message.channel.send(`The ${args[0]} value must be a whole number! Please try again!`);
                //add check for the hallOfFameEmoji setting
                bot.setSetting(args[0], args[1], message).then(setting => {
                    message.channel.send(`**${args[0]}** setting successfully changed to **${setting}**`);
                })
            }
        };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'settings',
    description: 'sets settings',
    usage: 'settings <setting> <(optional) what to set it to>'
};