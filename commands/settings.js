const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    	if (!message.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!");
        if (args[0] == 'prefix') {
            bot.getSetting(prefix, message).then(prefix => {
                message.channel.send(prefix)
            })
            //if (!args[1]) return 
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
    description: '',
    usage: ''
};