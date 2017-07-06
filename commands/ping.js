exports.run = (bot, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.help = {
  name: 'ping',
  description: 'Simple test to see if I am responding!',
  usage: 'ping'
};