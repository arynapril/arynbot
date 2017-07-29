exports.run = (bot, message, args, level) => {
    const Discord = require('discord.js');
    var time = args[0];
    var id = message.guild.id;
    if (time >= 60) { 
        var minutes = Math.floor(time/60);
        var seconds = time%60;
        var timecode = `${minutes} minutes and ${seconds} seconds`;
    } else {
        var timecode = `${time} seconds`;
    }
    var colors = Array("#FF80AB","#FF4081","#F50057","#EF5350","#E53935","#C62828","#FFAB40","#FF9100","#FF6D00","#FFD740","#FFC400","#FFAB00","#81C784","#4CAF50","#388E3C","#2196F3","#1976D2","#0D47A1","#7986CB","#3F51B5","#303F9F","#B39DDB","#7E57C2","#5E35B1");
    if(!isNaN(time)) {
        var embed1 = new Discord.RichEmbed();
        embed1.setTitle("This channel has been timed out.")
        .addField("Length", timecode)
        .addField("Initiated by:", message.author)
        .setFooter("TIMEOUT")
        .setTimestamp()
        .setColor(colors[Math.floor(Math.random()*colors.length)])
        message.channel.overwritePermissions(id, {SEND_MESSAGES: false})
        .then(
            message.channel.send({embed: embed1})
            .then(message => {
                setTimeout(() => {
                    var embed2 = new Discord.RichEmbed();
                    embed2.setTitle("The timeout period has elapsed.")
                    .setFooter("TIMEOUT")
                    .setTimestamp()
                    .setColor(colors[Math.floor(Math.random()*colors.length)])
                    message.edit({embed: embed2});
                    message.channel.overwritePermissions(id, {SEND_MESSAGES: true});
                }, time * 1000);
            })
        );
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['chill'],
    permLevel: 10
};

exports.help = {
    name: 'timeout',
    description: 'Timeouts a channel for a period of time',
    usage: 'timeout <length of time>'
};