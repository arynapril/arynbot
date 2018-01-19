exports.run = (bot, message, args, level) => {
    var Discord = require('discord.js');
    const child_process = require('child_process');
    if (message.author.id !== bot.config.owner) return message.channel.send("You do not have permission to run this command!")
    command = args.join(' ')
    var embed = new Discord.RichEmbed()
        .setFooter(`${message.author.username}`, `${message.author.avatarURL}`)
        .setTimestamp()
        .addField('Command', "```sh\n" + command + "```")
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
        if (error) {
            embed.setColor([255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
            .addField('Error:', error)
            .addField(' - ', stderr)
        } else {
            embed.setColor([Math.floor(Math.random() * 256), 255, Math.floor(Math.random() * 256)])
            .addField('Output: ', stdout)
        }
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
	name: 'exec',
	description: 'executes shell commands',
	usage: ''
};
