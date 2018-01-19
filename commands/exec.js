exports.run = (bot, message, args, level) => {
    if (message.author.id !== bot.config.owner) return message.channel.send("You do not have permission to run this command!")
    var embed = new Discord.RichEmbed()
        .setFooter(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setTimestamp()
        .addField('Command', "```sh\n" + msg.content + "```")
        require("child_process").exec(msg.content, (err, stdout, stderr) => {
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
                msg.channel.send({ embed: embed })
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
	name: '',
	description: '',
	usage: ''
};
