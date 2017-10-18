const Discord = require("discord.js");
exports.run = async(bot, message, args, level) => {
    if(message.author.id != bot.config.owner) return message.channel.send("You do not have permission to do this command!");
    const code = args.join(" ");
    var evalEmbed = new Discord.RichEmbed()
        .setTitle('Evaluated code')
        .setTimestamp()
        .setFooter('EVAL')
        .addField('Input', code)
    try {
        const evaled = eval(code);
        const clean = await bot.clean(bot, evaled);
        evalEmbed.setColor([Math.floor(Math.random()*256),255,Math.floor(Math.random()*256)])
            .addField('OUTPUT', clean)
    } catch (err) {
        evalEmbed.setColor([255,Math.floor(Math.random()*256),Math.floor(Math.random()*256)])
            .addField('ERROR', await bot.clean(bot, err))
    }
    message.channel.send({embed: evalEmbed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    botPerms: [],
    memberPerms: []
};

exports.help = {
    name: 'eval',
    description: 'Evaluates arbitrary javascript.',
    usage: 'eval <code>'
};
