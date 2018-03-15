exports.run = (bot, message, args, level) => {
    const Discord = require("discord.js");
    if (!message.mentions.users.array()[0]) return message.channel.send('Please mention a user to ban!');    
    var banee = message.mentions.users.array()[0];
    var banned = message.guild.members.get(banee.id);
    if (args.length == 1) {
        var reason = "Not specified";
    } else {
        var reason = args.slice(1).join(" ");
    };    
    banned.ban(reason);
    var ban = new Discord.RichEmbed();
        ban.setTitle('User was banned.')
        .addField('User', banee, true)
        .addField('Banned by', message.author, true)
        .addField('Reason', reason)
        .setFooter("BANNED")
        .setTimestamp()
        .setColor('#E53935')
    message.channel.send({embed: ban})
    //var logs = message.guild.channels.find('name', 'mod-logs');
    //logs.send({embed: ban});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: ['BAN_MEMBERS'],
	memberPerms: ['BAN_MEMBERS']
};

exports.help = {
	name: 'ban',
	description: 'Bans a mentioned member',
	usage: 'ban <member mention>'
};
