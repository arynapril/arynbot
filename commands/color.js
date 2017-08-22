exports.run = (bot, message, args, level) => {
    const Discord = require('discord.js');
    var color = new Discord.RichEmbed()
        .setColor('RANDOM')
    if ((typeof args[0] === "string") && args[0].length === 6 && !isNaN(parseInt(args[0], 16))) {
        hexColor = `#${args[0]}`;
        var hex = parseInt(args[0], 16);
        var r = (hex >> 16) & 255;
        var g = (hex >> 8) & 255;
        var b = hex & 255;
        rgb = r + ", " + g + ", " + b;
        color.setColor(hexColor) 
    } else if (args[0] < 256 && args [1] < 256 && args[2] < 256 && !args[3]) {
        rgb = args.join(', ');
        var rgbCode = args[2] | (args[1] << 8) | (args[0] << 16);
        hexColor = '#' + (0x1000000 + rgbCode).toString(16).slice(1);
        color.setColor(hexColor) 
    } else if (!args[0]) {
        hexColor = '#' + parseInt(color.color).toString(16);
        var hex = parseInt(color.color, 16);
        var r = (hex >> 16) & 255;
        var g = (hex >> 8) & 255;
        var b = hex & 255;
        rgb = r + ", " + g + ", " + b;
    }
    color.addField('Hex', hexColor)
         .addField('RGB', rgb)
         .addField('Decimal', color.color)
    message.channel.send({embed: color})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'color',
    description: 'shows color information/generates a random color',
    usage: 'color <optional hex (#------) or rgb (--- --- ---)'
};