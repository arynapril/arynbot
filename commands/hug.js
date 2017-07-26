exports.run = (bot, message, args, level) => {
    if (!message.mentions.users.array()[0]) {
        message.channel.send(`*hugs* ***${message.author.username}***`)
    } else {
        let huggee = message.mentions.users.array()[0];
        message.channel.send(`*hugs* ***${huggee.username}***`);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hugs', 'hugz'],
    permLevel: 0
};

exports.help = {
    name: 'hug',
    description: 'Everyone needs a hug sometimes.',
    usage: 'hug <@person needing a hug [optional]>'
};