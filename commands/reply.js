exports.run = async (bot, message, args, level) => {
    const Discord = require("discord.js");
    m = message.guild.members.get(args[0]);
    enabled = await bot.getSetting('modMailEnabled', message.guild);
    if (!enabled) return message.channel.send('Sorry, mod mail doesn\'t appear to be enabled in this server!')
    chan = await bot.getSetting('modMailChannel', message.guild);
    mmChan = message.guild.channels.find('name', chan);
    if (mmChan.id !== message.channel.id) return message.channel.send('Sorry, please send replies to mod mail messages in the mod mail channel!')
    if (!m) {
        return message.channel.send('Sorry, that user doesn\'t appear to be in this server! Make sure to start your message with a user ID!')
    } else {
        response = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(args.slice(1).join(' '))
        .setFooter('To respond, send any message that begins with the ID at the top of this message!')
		if (message.attachments.size !== 0) {
			pictures = message.attachments.array();
			response.setImage(pictures[0].url)
		}
        m.user.send(`${message.guild.id}`,{embed: response});
        message.react('💌');
    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'reply',
	description: 'used to reply to modMail',
	usage: 'reply [user ID] reply'
};
