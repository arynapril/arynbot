exports.run = (bot, message, args, level) => {
    const Discord = require("discord.js");
    if (!message.mentions.users.array()[0]) return;
    var banee = message.mentions.users.array()[0];
    var kicked = message.guild.members.get(banee.id);
    var user = bot.users.get(banee.id);
    if (args.length == 1) {
        var reason = "Not specified";
    } else {
        var reason = args.slice(1).join(" ");
    }; 
    kicked.kick(reason);
    var kick = new Discord.RichEmbed();
        kick.setTitle('User was kicked.')
        .addField('User', banee, true)
        .addField('Kicked by', message.author, true)
        .addField('Reason', reason)
        .setFooter("KICKED")
        .setTimestamp()
        .setColor('#E53935')
    message.channel.send({embed: kick})
    //var logs = message.guild.channels.find('name', 'mod-logs');
    //logs.send({embed: kick});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: ['KICK_MEMBERS'],
	memberPerms: ['KICK_MEMBERS']
};

exports.help = {
	name: 'kick',
	description: 'kicks a mentioned member from the server, with optional reason',
	usage: 'kick <member mention> <optional reason>'
};
