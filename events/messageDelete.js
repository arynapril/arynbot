module.exports = (bot, message) => {
    const Discord = require('discord.js');
    var logs = message.guild.channels.find('name', 'logs');
    if (!logs) return;
    var dlt = new Discord.RichEmbed()
        .setTitle('Message Deleted')
        if (message.member.nickname == null) {
            dlt.addField('User',`${message.author.username}`, true)
        } else {
            dlt.addField('User',`${message.member.nickname} (${message.author.username})`, true);
        };
        dlt.addField('Channel', message.channel.name, true)
        if (msg.attachments.size==0) {
            dlt.addField('Message', `${message}`)
        } else {
            pictures = message.attachments.array();
            if (message != "") {
                dlt.addField('Message', `${message}`)
            }
            dlt.setImage(pictures[0].url)
        }
        dlt.setTimestamp()
        .setColor([255,Math.floor(Math.random()*256),Math.floor(Math.random()*256)])
    logs.send({embed: dlt});
};