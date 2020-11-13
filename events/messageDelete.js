module.exports = async (bot, message) => {
	const Discord = require('discord.js');
	if (message.channel.type === "dm") return;
	setting = await bot.getSetting('logsChannel', message.member.guild);
	var logs = message.guild.channels.cache.find(c => c.name == setting);
	if (!logs) return;
	if (!logs.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
	if (message.author.bot) return;
	var dlt = new Discord.MessageEmbed()
		.setTitle('Message Deleted')
	if (message.member.nickname == null) {
		dlt.addField('User', `${message.author.username}`, true)
	} else {
		dlt.addField('User', `${message.member.nickname} (${message.author.username})`, true);
	};
	dlt.addField('Channel', message.channel.name, true)
	if (message.attachments.size == 0) {
		dlt.addField('Message', `${message}`)
	} else {
		pictures = message.attachments.array();
		if (message != "") {
			dlt.addField('Message', `${message}`)
		}
		for (i=0; i<pictures.length; i++) {
			dlt.addField(`Image ${i}`, pictures[i].url)
		}
	}
	dlt.setTimestamp()
		.setColor('#E53935')
	logs.send({
		embed: dlt
	});
};
