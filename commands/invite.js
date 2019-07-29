exports.run = async (bot, message, args, level) => {
	const Discord = require('discord.js')
	link = await bot.generateInvite();
	invite = await bot.channels.get('605453965659996164').createInvite();
	inviteEmbed = new Discord.RichEmbed()
		.setTitle('Arynbot Invites')
		.addField('To invite arynbot to a server', `<${link}>`)
		.addField('To join arynbot\'s development server', `<${invite}>`)
	message.channel.send({embed: inviteEmbed});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'invite',
	description: 'Provides a link to invite arynbot to your server!',
	usage: 'invite'
};
