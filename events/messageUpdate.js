module.exports = (bot, oldMessage, newMessage) => {
    const Discord = require('discord.js');
    var logs = oldMessage.guild.channels.find('name', 'logs');
    if (!logs) return;
    if (!oldMessage || !newMessage) return;
    if (oldMessage == newMessage) return;
    if (oldMessage.author.bot) return;
    var update = new Discord.RichEmbed()
        .setTitle('Message Updated')
        if (oldMessage.member.nickname == null) {
            update.addField('User',`${oldMessage.author.username}`, true)
        } else {
            update.addField('User',`${oldMessage.member.nickname} (${oldMessage.author.username})`, true);
        };
        update.addField('Channel', oldMessage.channel.name, true)
        if (oldMessage.attachments.size==0) {
            update.addField('Old Message', `${oldMessage}`)
        } else {
            var pictures = oldMessage.attachments.array();
            if (oldMessage != "") {
                update.addField('Old Message', `${oldMessage}`)
            }
            update.addField('Old Image', pictures[0].url);
        };
        if (newMessage.attachments.size==0) {
            update.addField('New Message', `${newMessage}`)
        } else {
            var newPictures = newMessage.attachments.array();
            if (newMessage != "") {
                update.addField('New Message', `${newMessage}`)
            }
            update.addField('New Image', newPictures[0].url);
        };
        update.setTimestamp()
        .setColor([255,Math.floor(Math.random()*256),Math.floor(Math.random()*256)])
    logs.send({embed: update});
};