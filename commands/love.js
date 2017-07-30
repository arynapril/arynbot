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
        "you deserve love.",
        "you matter even if you are at your lowest",
        "you are irreplacable",
        "you mean the world to someone. Don't take that away from them."
    );
    if (!message.mentions.users.array()[0]) {
        message.reply(`${list[Math.floor(Math.random()*list.length)]}`, {
            file: "https://cdn.discordapp.com/attachments/263501441690238976/337810432108658691/089811d7a2e619cb735aa37a52b19262.gif"
        });
    } else {
        let loved = message.mentions.users.array()[0];
        message.channel.send(`**${loved.username}**, ${list[Math.floor(Math.random()*list.length)]}`, {
            file: "https://cdn.discordapp.com/attachments/263501441690238976/337810432108658691/089811d7a2e619cb735aa37a52b19262.gif"
        });
    };
};

message.channel.send(`**${loved.username}**, ${list[Math.floor(Math.random()*list.length)]}`, {    
            file: "https://cdn.discordapp.com/attachments/263501441690238976/337810432108658691/089811d7a2e619cb735aa37a52b19262.gif" // Or replace with FileOptions object
        });

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'love',
    description: 'Spread the love!',
    usage: 'love @<optional mention>'
};
