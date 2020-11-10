exports.run = (bot, message, args, level) => {
	const Discord = require('discord.js');
	var time = args[0];
	var id = message.guild.id;
	if (time >= 60) {
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		var timecode = `${minutes} minutes and ${seconds} seconds`;
	} else {
		var timecode = `${time} seconds`;
	}
	if (!isNaN(time)) {
		var embed1 = new Discord.MessageEmbed();
		embed1.setTitle("This channel has been timed out.")
			.addField("Length", timecode)
			.addField("Initiated by:", message.author)
			.setFooter("TIMEOUT")
			.setTimestamp()
			.setColor([255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
		message.channel.overwritePermissions(id, {
				SEND_MESSAGES: false
			})
			.then(
				message.channel.send({
					embed: embed1
				})
				.then(message => {
					setTimeout(() => {
						var embed2 = new Discord.MessageEmbed();
						embed2.setTitle("The timeout period has elapsed.")
							.setFooter("TIMEOUT")
							.setTimestamp()
							.setColor([Math.floor(Math.random() * 256), 255, Math.floor(Math.random() * 256)])
						message.edit({
							embed: embed2
						});
						message.channel.overwritePermissions(id, {
							SEND_MESSAGES: true
						});
					}, time * 1000);
				})
			);
	};
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['chill'],
	botPerms: ['MANAGE_ROLES'],
	memberPerms: ['MANAGE_ROLES']
};

exports.help = {
	name: 'timeout',
	description: 'Timeouts a channel for a period of time',
	usage: 'timeout <length of time>'
};
