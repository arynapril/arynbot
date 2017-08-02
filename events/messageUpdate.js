module.exports = (bot, oldMessage, newMessage) => {
    const Discord = require('discord.js');
    var logs = oldMessage.guild.channels.find('name', 'logs');
    if (!logs) return;
    if (!oldMessage || !newMessage) return;
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
            pictures = oldMessage.attachments.array();
            if (oldMessage != "") {
                update.addField('Message', `${oldMessage}`)
            }
            for(i=0; oldMessage.attachments.array().length; i++) {
            update.addField('Old pictures', pictures[i].url);
            }
        }
        if (newMessage.attachments.size==0) {
            update.addField('New Message', `${newMessage}`)
        } else {
            newPictures = newMessage.attachments.array();
            if (newMessage != "") {
                update.addField('Message', `${newMessage}`)
            }
            for(i=0; newMessage.attachments.array().length; i++) {
            update.addField('New pictures', newPictures[i].url)
            }
        }
        update.setTimestamp()
        .setColor([255,Math.floor(Math.random()*256),Math.floor(Math.random()*256)])
    logs.send({embed: update});
};