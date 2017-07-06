exports.run = (bot, message, args) => {
    let huggee = args.join(" and ");
    message.channel.send(`*hugs ${huggee}*`);
}

exports.help = {
  name: 'hug',
  description: 'Spread the love!',
  usage: 'hug [command]'
};