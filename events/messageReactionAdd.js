module.exports = (bot, messageReaction, user) => {
    const Discord = require('discord.js');
    const userbox = '';
    if (messageReaction.me) return;
    if (messageReaction.emoji.name == "gayalliance" && messageReaction.count >= 3) {
        let msg = messageReaction.message;
        msg.react("332135150328479744");
        const HoF = new Discord.RichEmbed();
            HoF.setColor(`${msg.member.displayHexColor}`)
            .setFooter('Hall of Fame 🏆')
            .setTimestamp()
        if (msg.member.nickname == null) {
            HoF.addField('User',`${msg.author.username}`, true)
        } else {
            HoF.addField('User',`${msg.member.nickname} (${msg.author.username})`, true);
        };
        HoF.addField('Channel', `${msg.channel.name}`, true)
        if (msg.attachments.size==0) {
            HoF.addField('Message', `${msg}`)
        } else {
            pictures = msg.attachments.array();
            if (msg != "") {
                HoF.addField('Message', `${msg}`)
            }
            HoF.setImage(pictures[0].url);
        }
        bot.channels.get('336108682842603520').send({embed: HoF});
    };
};