exports.run = (bot, message, args, level) => {
    message.channel.send("Here is my github repository! https://github.com/arynapril/arynbot :heart:").catch(console.error);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['github', 'gh'],
    permLevel: 0
};

exports.help = {
    name: 'git',
    category: 'Utilities',
    description: 'Provides a link to arynbots github repository!',
    usage: 'git'
};