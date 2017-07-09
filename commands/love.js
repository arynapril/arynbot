exports.run = (bot, message, args, level) => {
    var list = Array(
        "I appreciate you.",
        "You are the most perfect you there is.",
        "You are enough.",
        "You're strong.",
        "You deserve good things.",
        "You should be proud of yourself.",
        "You are good enough.",
        "You're making a difference.",
        "Colors seem brighter when you're around.",
        "You're one of a kind.",
        "You're inspiring.",
        "The world is better because you're in it.",
        "You're awesome.",
        "You're totally rad.",
        "It's going to be alright.",
        "You're doing great.",
        "You are loved.",
        "It's going to be okay.",
        "No matter how far down you are, it's going to be just fine.",
        "I know life can be hard, but you can get through it.",
        "I have total faith in you.",
        "There are people who care about you.",
        "You're not alone.",
        "You deserve the world.",
        "You deserve love."
    );
    if (!message.mentions.users.array()[0]) {
    message.reply(`${list[Math.floor(Math.random()*list.length)]}`);
} else {
    let loved = message.mentions.users.array()[0];
    message.channel.send(`**${loved.username}**, ${list[Math.floor(Math.random()*list.length)]}`)
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'love',
    description:  'Spread the love!',
    usage: 'love'
};