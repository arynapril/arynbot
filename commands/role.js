exports.run = (bot, message, args, level) => {
    const Discord = require('discord.js');
    var role = message.guild.roles.find(r => r.name == args.join(' '));
    if (!role) return message.channel.send("Couldn't find that role in this server, sorry!")
    var roleEmbed = new Discord.RichEmbed()
		.setTitle(`Stats for ${role.name}`)
		.setColor(role.color)
		.addField('Name', role.name)
        .addField('Creation Date', role.createdAt)
        .addField('Color', role.hexColor)
        .addField('Hoisted?', role.hoist)
        .addField('ID', role.id)
        .addField('Managed?', role.managed)
        .addField('Members', role.members.size)
        .addField('Mentionable?', role.mentionable)
        .addField('Position', role.position)
		.setFooter(`${role.name} STATS`)
		.setTimestamp()
	message.channel.send({
		embed: roleEmbed
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['roleinfo'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'role',
	description: 'shows information about a role',
	usage: '!role <role name>'
};
