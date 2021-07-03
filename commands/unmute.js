exports.run = (bot, message, args, level) => {
	const Discord = require("discord.js");
	var mutee = message.mentions.users.array();
	for (var k = 0; k < mutee.length; k++) {
		var member = message.guild.members.cache.get(mutee[k].id);
		var user = bot.users.cache.get(mutee[k].id);
		var guild = message.guild;
		var channels = message.guild.channels.array();
		for (var i = 0; i < channels.length; i++) {
			if (channels[i].type == 'text')
				channels[i].overwritePermissions(member, {
					SEND_MESSAGES: null,
					ADD_REACTIONS: null
				})
		};
		var unmute = new Discord.MessageEmbed();
		unmute.setTitle('User was unmuted.')
			.addField('User', user)
			.addField('Unmuted by', message.author)
			.setFooter("UNMUTED")
			.setTimestamp()
			.setColor([Math.floor(Math.random() * 256), 255, Math.floor(Math.random() * 256)])
		message.channel.send({
			embed: unmute
		})
	};
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['unshush'],
	botPerms: ['MANAGE_ROLES'],
	memberPerms: ['MANAGE_ROLES']
};

exports.help = {
	name: 'unmute',
	description: 'Unmutes a member that has been muted',
	usage: 'unmute @<member>'
};
