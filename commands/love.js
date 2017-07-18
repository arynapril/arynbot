exports.run = (bot, message, args, level) => {
    var list = Array(
        "I appreciate you.",
        "you are the most perfect you there is.",
        "you are enough.",
        "you're strong.",
        "you deserve good things.",
        "you should be proud of yourself.",
        "you are good enough.",
        "you're making a difference.",
        "colors seem brighter when you're around.",
        "you're one of a kind.",
        "you're inspiring.",
        "the world is better because you're in it.",
        "you're awesome.",
        "you're totally rad.",
        "it's going to be alright.",
        "you're doing great.",
        "you are loved.",
        "it's going to be okay.",
        "no matter how far down you are, it's going to be just fine.",
        "I know life can be hard, but you can get through it.",
        "I have total faith in you.",
        "there are people who care about you.",
        "you're not alone.",
        "you deserve the world.",
        "you deserve love."
    );
    if (!message.mentions.users.array()[0]) {
        message.reply(`${list[Math.floor(Math.random()*list.length)]}`);
    } else {
        let loved = message.mentions.users.array()[0];
        if (loved.username=="arynapril") {
            message.channel.send("Haha nope!");
        } else {
        message.channel.send(`**${loved.username}**, ${list[Math.floor(Math.random()*list.length)]}`);
        };
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
    category: 'Fun',
    description: 'Spread the love!',
    usage: 'love'
};