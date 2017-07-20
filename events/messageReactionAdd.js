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
            .addField('Message', `${msg}`)
        bot.channels.get('336108682842603520').send({embed: HoF});
    };
};