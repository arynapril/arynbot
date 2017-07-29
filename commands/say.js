exports.run = (bot, message, args, level) => {
    message.delete();
    message.channel.send(args.join(" "));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: 'say',
    description: 'Says something',
    usage: 'say <what you want her to say'
};