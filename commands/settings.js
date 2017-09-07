const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    settingsArray = ['dadJokes', 'dadJokesJail', 'hallOfFameEnabled', 'hallOfFameEmote', 'hallOfFameLimit', 'hallOfFameChannel']
    	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you do not have permission to manage this server's setings!");
        if (args[0].indexOf(settingsArray) != 0) {
            if (!args[1]) {
                bot.getSetting(args[0], message).then(setting => {
                    message.channel.send(`The current **${args[0]}** setting is **${setting}`);
                })
            } else {
                bot.setSetting(args[0], args[1], message).then(setting => {
                    message.channel.send(`**${args[0]}** setting successfully changed to ${setting}`);
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