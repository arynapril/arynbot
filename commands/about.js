exports.run = (bot, message, args) => {
	const Discord = require('discord.js');
	uptime = bot.uptime;
	time = Math.floor(uptime / 1000);
	if (time >= 3600) {
		var hours = Math.floor(time / 3600);
		var minutes = Math.floor((time % 3600) / 60);
		var seconds = time % 60 % 60;
		var timecode = `${hours} hours, ${minutes} minutes, and ${seconds} seconds.`
	} else if (time >= 60) {
		var minutes = Math.floor(time / 60);
		var seconds = time % 60;
		var timecode = `${minutes} minutes and ${seconds} seconds`;
	} else {
		var timecode = `${time} seconds`;
	}
	about = new Discord.RichEmbed()
		.setTitle("About Arynbot")
		.setDescription("Just a simple bot who is full of love!")
		.setColor([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
		.addField('Botmom', 'arynapril#4982')
		.addField('Users', bot.users.size, true)
		.addField('Servers', bot.guilds.size, true)
		.addField('Channels', bot.channels.size, true)
		.addField('Uptime', timecode, true)
		.setThumbnail(bot.user.avatarURL)
	message.channel.send({
		embed: about
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['stats'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'about',
	description: 'display a few statistics for the bot',
	usage: 'about'
};
