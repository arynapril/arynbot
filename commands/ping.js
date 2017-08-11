exports.run = async(bot, message, args, level) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! I took ${m.createdTimestamp - message.createdTimestamp} milliseconds to respond! Heartbeat is ${Math.round(bot.ping)} milliseconds!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pinh'],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Simple test to see if I am responding!',
    usage: 'ping'
};