module.exports = (bot, messageReaction, user) => {
    const Discord = require('discord.js');
    if (messageReaction.emoji.name == "gayalliance" && messageReaction.count == 3) {
        let msg = messageReaction.message;
        const embed = new Discord.RichEmbed()
            .setColor(`${msg.member.displayHexColor}`)
            .setTimestamp()
            .addField('User', `${msg.author.username}`, true)
            .addField('Channel', `${msg.channel.name}`, true)
            .addField('Message', `${msg}`)
            .setFooter('');
        bot.channels.get('336108682842603520').send('', {embed});
    };
};