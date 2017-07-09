exports.run = (bot, message, args, level) => {
  if (args == 0 || args == 1 || args > 100){
    message.channel.send("Please set a number between 2 and 100! :heart:")
  } else {
    message.delete();
    message.channel.bulkDelete(args);
    message.channel.send(`${args} messages purged by ${message.author}! :heart:`);
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clear', 'prune'],
    permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Mass clearing of messages',
  usage: 'purge <number of messages to be deleted>'
};