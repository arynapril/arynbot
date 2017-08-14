exports.run = (bot, message, args, level) => {
const Discord = require('discord.js');
message.channel.fetchMessages({limit: 1, around: args[0]})
    .then(messages=> {
        const msg = messages.first();
        var HallOfFame = msg.guild.channels.find('name', 'hall-of-fame');
        if (!HallOfFame) return;
        if (message.reactions.me) return;
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
            HoF.setImage(pictures[0].url)
        }
        HallOfFame.send({embed: HoF});
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hof', 'halloffame'],
    permLevel: 4
};

exports.help = {
    name: 'HoF',
    description: 'Adds a message to Hall of Fame manually, if it didn\'t get added for whatever reason',
    usage: 'HoF <messageID (found by clicking on the three dots next to the message, with developer mode on)'
};