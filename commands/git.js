exports.run = (bot, message, args) => {
    message.channel.send("Here is my github repository! https://github.com/arynapril/arynbot :heart:").catch(console.error);
}

exports.help = {
  name: 'git',
  description: 'Provides a link to arynbots github repo',
  usage: 'git'
};