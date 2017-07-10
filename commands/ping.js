exports.run = async(bot, message, args, level) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! I took ${Math.round(bot.ping)} milliseconds to respond! The whole trip took ${m.createdTimestamp - message.createdTimestamp} milliseconds!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Simple test to see if I am responding!',
    usage: 'ping'
};