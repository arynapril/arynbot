module.exports = (bot, messageReaction, user) => {
    const Discord = require('discord.js');
    let msg = messageReaction.message;
    bot.getSetting('hallOfFameEnabled', msg.guild).then(setting => {
        if (setting == '0') return;
        bot.getSetting('hallOfFameChannel', msg.guild).then(chan => {
            var HallOfFame = msg.guild.channels.find('name', chan);
            if (!HallOfFame) return;
            if (!HallOfFame.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;
            if (messageReaction.me) return;
            bot.getSetting('hallOfFameEmote', msg.guild).then(emote => {
                emoji = msg.guild.emojis.find('name', emote);
                if (!emoji) return;
                bot.getSetting('hallOfFameLimit', msg.guild).then(limit => {
                    if (limit == 0) return;
                    if (messageReaction.emoji.id == emoji.id && messageReaction.count >= limit) {
                        msg.react(emoji.id);
                        const HoF = new Discord.RichEmbed();
                        HoF.setColor(`${msg.member.displayHexColor}`)
                            .setFooter('Hall of Fame 🏆')
                            .setTimestamp()
                        if (msg.member.nickname == null) {
                            HoF.addField('User', `${msg.author.username}`, true)
                        } else {
                            HoF.addField('User', `${msg.member.nickname} (${msg.author.username})`, true);
                        };
                        HoF.addField('Channel', `${msg.channel.name}`, true)
                        if (msg.attachments.size == 0) {
                            HoF.addField('Message', `${msg}`)
                        } else {
                            pictures = msg.attachments.array();
                            if (msg != "") {
                                HoF.addField('Message', `${msg}`)
                            }
                            HoF.setImage(pictures[0].url)
                        }
                        HallOfFame.send({
                            embed: HoF
                        });
                    };
                })
            })
        })
    })
};