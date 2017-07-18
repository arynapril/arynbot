exports.run = (bot, message, args) => {
    if (args == "") {
        var roll = Math.floor(Math.random() * 6) + 1;
        message.reply("You rolled a **" + roll + "**!");
    } else if (args > 9999) {
        message.reply("Choose a lower number! :stuck_out_tongue_winking_eye: ")
    } else {
        var roll = Math.floor(Math.random() * args) + 1;
        message.reply("You rolled a **" + roll + "**!");
    }
};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['diceroll', 'dice'],
    permLevel: 0
};

exports.help = {
    name: 'roll',
    category: 'Fun',
    description: 'Rolls a die of a side number up to 9999',
    usage: 'roll <number of sides, if not included, rolls for a six sided die>'
};