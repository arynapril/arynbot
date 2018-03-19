exports.run = async (bot, message, args, level) => {
	const Discord = require('discord.js');
	messages = await message.channel.fetchMessages({
		limit: 1,
		around: args[0]
	});
	const msg = messages.first();
	chan = await bot.getSetting('hallOfFameChannel', message.guild);
	HallOfFame = msg.guild.channels.find('name', chan);
	if (!HallOfFame) return;
	if (!HallOfFame.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;
	emote = await bot.getSetting('hallOfFameEmote', msg.guild);
	emoji = msg.guild.emojis.find('name', emote);
	if (!emoji) return;
	//msg.react(emoji.id);
	const HoF = new Discord.RichEmbed();
	HoF.setColor(`${msg.member.displayHexColor}`)
		.setFooter('Hall of Fame 🏆')
		.setTimestamp()
	if (msg.member.nickname == null) {
		HoF.addField('User', `${msg.author.username}`, true)
	} else {
		HoF.addField('User', `${msg.member.nickname} (${msg.author.username})`, true);
	};
	HoF.addField('Channel', `${msg.channel.name}`, true)
	if (msg.attachments.size == 0) {
		HoF.addField('Message', `${msg}`)
	} else {
		pictures = msg.attachments.array();
		if (msg != "") {
			HoF.addField('Message', `${msg}`)
		}
		HoF.setImage(pictures[0].url)
	}
	x = await message.channel.send("You're about to add this post to this servers hall of fame! Press Y if that's your intent, or N to cancel!")
	y = await message.channel.send({embed: Hof});
	var collector = msg.channel.createCollector( 
		m => m.content.toLowerCase() == 'y' || m.content.toLowerCase() == 'n',
        { time: 30000 }
    );
	collector.on('collect', m => {
		if (m.content.toLowerCase() == 'y' && m.author.id == message.author.id) {
			x.delete();
			y.delete();
			message.react(emoji.id);
			HallOfFame.send({embed: HoF});
			message.channel.send("Message successfully added to the hall of fame!");
			collector.stop();
		} else if (m.content.toLowerCase() == 'n' && m.author.id == message.author.id) {
			x.delete();
			y.delete();
			message.channel.send("Manual addition to hall of fame canceled! If that was the wrong post, make sure you're running the command in the channel the original post was in!");
			collector.stop();
		};
	});
	collector.on('end', collected => {
        if (collected.size == 0) {
			x.delete();
			y.delete();
            msg.channel.send('No messages found! Try again!');
        }
    });
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hof', 'halloffame'],
	botPerms: ['ADD_REACTIONS'],
	memberPerms: ['MANAGE_MESSAGES']
};
exports.help = {
	name: 'HoF',
	description: 'Adds a message to Hall of Fame manually, if it didn\'t get added for whatever reason',
	usage: 'HoF <messageID (found by clicking on the three dots next to the message, with developer mode on)'
};
