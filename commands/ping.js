exports.run = async(bot, message, args, level) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! I took ${m.createdTimestamp - message.createdTimestamp} milleseconds to respond! The whole trip took ${Math.round(bot.ping)} milliseconds!`);
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