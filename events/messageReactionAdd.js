module.exports = (bot, messageReaction, user) => {
    const Discord = require('discord.js');
    if (messageReaction.me) return;
    if (messageReaction.emoji.name == "gayalliance" && messageReaction.count >= 3) {
        let msg = messageReaction.message;
        msg.react("332135150328479744");
        if (message.member.nickname == null) {
            let userbox = `${msg.author.username}`;
        } else {
            let userbox = `${msg.member.nickname} (${msg.author.username})`;
        };
        const embed = new Discord.RichEmbed()
            .setColor(`${msg.member.displayHexColor}`)
            .setFooter('Hall of Fame 🏆')
            .setTimestamp()
            .addField('User', `${userbox}`, true)
            .addField('Channel', `${msg.channel.name}`, true)
            .addField('Message', `${msg}`)
        bot.channels.get('336108682842603520').send('', {embed});
    };
};