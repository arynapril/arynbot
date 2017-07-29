exports.run = (bot, message, args, level) => {
    bot.generateInvite()
    .then(link => {
    message.channel.send(`Invite me to your server using the following link! :heart: <${link}>`);
  });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'invite',
    description: 'Provides a link to invite arynbot to your server!',
    usage: 'invite'
};