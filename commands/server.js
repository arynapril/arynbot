exports.run = (bot, message, args, level) => {
	const Discord = require('discord.js');
	var server = message.guild;
	var serverEmbed = new Discord.RichEmbed()
		.setTitle(`Server stats for ${server.name}`)
		.setColor([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
		.addField('Name', server.name)
		.addField('Owner', server.owner.displayName)
		.addField('Created', server.createdAt, true)
		.addField('Channels', server.channels.size, true)
		.addField('Members', server.members.size, true)
		.addField('Roles', server.roles.size, true)
		.addField('Server Icon', server.iconURL)
		.setThumbnail(server.iconURL)
		.setFooter(`${server.name} STATS`)
		.setTimestamp()
	message.channel.send({
		embed: serverEmbed
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'server',
	description: 'Displays a few stats about the server!',
	usage: 'server'
};
