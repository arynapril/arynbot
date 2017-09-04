const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');
exports.run = (bot, message, args, level) => {
    	if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!");
        if (args[0] == 'dadjokes') {
            db.all(`SELECT * FROM servers WHERE id = "${message.guild.id}"`, function (err, rows) {
				if (err || !rows[0])
					return;
				else
					dadJokesEnabled = rows[0].dadJokes;
			});
            if (!args[1]) return message.channel.send(`dadjokes current setting: ${dadJokesEnabled}`)
        }
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