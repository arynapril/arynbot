const Discord = require("discord.js");
exports.run = async(bot, message, args, level) => {
    message.delete();
    const code = args.join(" ");
    var eval = new Discord.RichEmbed()
        .setTitle('Evaluating code...')
        .setTimestamp()
        .setFooter('EVAL')
        .addField('Input', code)
    try {
        const evaled = eval(code);
        const clean = await bot.clean(bot, evaled);
        eval.setColor([Math.floor(Math.random()*256),255,Math.floor(Math.random()*256)])
            .addField('OUTPUT', clean)
    } catch (err) {
        eval.setColor([255,Math.floor(Math.random()*256),Math.floor(Math.random()*256)])
            .addField('ERROR', await bot.clean(bot, err))
    }
    message.channel.send({embed: eval});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: 'eval',
    description: 'Evaluates arbitrary javascript.',
    usage: 'eval <code>'
};