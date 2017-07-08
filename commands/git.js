exports.run = (bot, message, args, level) => {
    message.channel.send("Here is my github repository! https://github.com/arynapril/arynbot :heart:").catch(console.error);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['github'],
    permLevel: 0
};

exports.help = {
  name: 'git',
  description: 'Provides a link to arynbots github repo',
  usage: 'git'
};