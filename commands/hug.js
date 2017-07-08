exports.run = (bot, message, args, level) => {
    let huggee = args.join(" and ");
    message.channel.send(`*hugs ${huggee}*`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
  name: 'hug',
  description: 'Spread the love!',
  usage: 'hug @[person needing some love]'
};