exports.run = (bot, message, args, level) => {
    var Discord = require('discord.js');
    if (message.author.id !== bot.config.owner) return message.channel.send("You do not have permission to run this command!")
    command = args.join(' ')
    var embed = new Discord.RichEmbed()
        .setFooter(`${message.author.username}`, `${message.author.avatarURL}`)
        .setTimestamp()
        .addField('Command', "```sh\n" + command + "```")
        require("child_process").exec(command, (err, stdout, stderr) => {
            if (err) {
                embed.setColor([255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)])
                    .setTitle("Error")
                    .addField('Error', "```sh\n" + stderr + "```")
                    .addField('Result', "```sh\n" + stdout + "```");
            } else {
                embed.setColor([Math.floor(Math.random() * 256), 255, Math.floor(Math.random() * 256)])
                    .setTitle("Success")
                    .addField('Result', "```sh\n" + stdout + "```");
            }
                message.channel.send({ embed: embed })
        })
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
