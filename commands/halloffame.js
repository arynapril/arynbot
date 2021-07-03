exports.run = async (bot, message, args, level) => {
	const Discord = require('discord.js');
	if (args[1]){
		chanarg = message.guild.channels.cache.get(args[1]);
		if (!chanarg) return message.channel.send("Invalid channel input detected. Make sure the message ID is the first arguement, and the channel ID is the second arguement!")
	} else {
		chanarg = message.channel;
	}
	messages = await chanarg.messages.fetch({
		limit: 1,
		around: args[0]
	});
	const msg = messages.first();
	if (!msg) return message.channel.send('Message not found! Make sure the arguements for the message ID/channel ID are correct!');
	chan = await bot.getSetting('hallOfFameChannel', message.guild);
	HallOfFame = msg.guild.channels.cache.find(c => c.name == chan);
	if (!HallOfFame) return;
	if (!HallOfFame.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;
	emote = await bot.getSetting('hallOfFameEmote', msg.guild);
	emoji = msg.guild.emojis.cache.find(e => e.name == emote);
	if (!emoji) return;
	//msg.react(emoji.id);
	const HoF = new Discord.MessageEmbed();
	HoF.setColor(`${msg.member.displayHexColor}`)
		.setTitle('Hall of Fame 🏆')
		.setURL(`http://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
		.setFooter('Hall of Fame 🏆')
		.setTimestamp()
	if (msg.member.nickname == null) {
		HoF.addField('User', `${msg.author}`, true)
	} else {
		HoF.addField('User', `${msg.author} (${msg.author.username})`, true);
	};
	HoF.addField('Channel', `${msg.channel}`, true)
	if (msg.attachments.size == 0) {
		HoF.addField('Message', `${msg}`)
	} else {
		pictures = msg.attachments.array();
		if (msg != "") {
			HoF.addField('Message', `${msg}`)
		}
		HoF.setImage(pictures[0].url)
	};
	x = await message.channel.send("You're about to add this post to this servers hall of fame! Press Y if that's your intent, or N to cancel!", {embed: HoF});
	var collector = message.channel.createMessageCollector( 
		m => m.content.toLowerCase() == 'y' || m.content.toLowerCase() == 'n',
        { time: 30000 }
    );
	collector.on('collect', m => {
		if (m.content.toLowerCase() == 'y' && m.author.id == message.author.id) {
			msg.react(emoji.id);
			HallOfFame.send({embed: HoF});
			message.channel.send("Message successfully added to the hall of fame!");
			collector.stop();
		} else if (m.content.toLowerCase() == 'n' && m.author.id == message.author.id) {
			message.channel.send("Manual addition to hall of fame canceled! If that was the wrong post, make sure you're running the command in the channel the original post was in!");
			collector.stop();
		};
	});
	collector.on('end', collected => {
        if (collected.size == 0) {
            message.channel.send('No messages found within 30 seconds! Try again!');
        }
    });
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hof', 'HoF'],
	botPerms: ['ADD_REACTIONS'],
	memberPerms: ['MANAGE_MESSAGES']
};
exports.help = {
	name: 'halloffame',
	description: 'Adds a message to Hall of Fame manually, if it didn\'t get added for whatever reason',
	usage: 'HoF <messageID> <channelID (optional, command could also be run in the channel the original post was in>'
};
