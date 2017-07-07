exports.run = (bot, message, args) => {
  if (message.member.permissions.has("MANAGE_MESSAGES")){
    if (args == 0 || args == 1 || args > 100){
      message.channel.send("Please set a number between 2 and 100! :heart:")
    } else {
    message.delete();
    message.channel.bulkDelete(args);
    message.channel.send(`${args} messages purged by ${message.author}! :heart:`)
    };
  } else {
     message.channel.send("Sorry, you don't have the perms to run this command! :heart:")
  };
  }


exports.help = {
  name: 'purge',
  description: 'Mass clearing of messages',
  usage: 'purge <number of messages to be deleted>'
};