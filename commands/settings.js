const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    x="";
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
                if (channelArray.indexOf(args[0]) != -1) {
                    channelFound = false;
                    chans = message.guild.channels.array();
                    for (var i = 0; i < chans.length; i++) {
                        if (args[1] == chans[i].name) {
                            channelFound = true;
                        }
                    }
                    if (!channelFound) return message.channel.send(`The ${args[0]} value must be the name of an channel on this server! Please try again!`)
                };
                if (args[0] == 'hallOfFameLimit' && !isNaN(args[1])) return message.channel.send(`The ${args[0]} value must be a whole number! Please try again!`);
                if (args[0] == 'hallOfFameEmote') {
                    found = false;
                    emoji = message.guild.emojis.array();
                    for (var i = 0; i < emoji.length; i++) {
                        if (args[1]==emoji[i].name) {
                            found = true;
                        };
                    };
                    if (!found) return message.channel.send(`The ${args[0]} value must be the name of an emoji on this server! Please try again!`)
                }
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