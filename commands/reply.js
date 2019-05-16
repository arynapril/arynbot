exports.run = (bot, message, args, level) => {
    const Discord = require("discord.js");
    m = message.guild.members.get(args(0));
    enabled = bot.getSetting('modMailEnabled', message.guild);
    if (!enabled) return message.channel.send('Sorry, mod mail doesn\'t appear to be enabled in this server!')
    chan = bot.getSetting('modMailChannel', message.guild);
    mmChan = message.guild.channels.find('name', chan);
    if (mmChan !== message.channel) return message.channel.send('Sorry, please send replies to mod mail messages in the mod mail channel!')
    if (!m) {
        return message.channel.send('Sorry, that user doesn\'t appear to be in this server! Make sure to start your message with a user ID!')
    } else {
        response = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(args.slice(1).join(' '))
        m.user.send({embed: response});
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
