exports.run = (bot, message, args) => {
    const Discord = require('discord.js');
    if (!message.mentions.users.array()[0]) {
        user = message.author;
        member = message.member;
    } else {
        user = message.mentions.users.array()[0];
        member = message.mentions.members.array()[0];
    }
    var info = new Discord.RichEmbed();
    if (!user.presence.game) {
        var game = "None"
    } else {
        var game = user.presence.game.name;
    };
    info.setTitle(`Info on ${user.username}:`)
    .setThumbnail(user.avatarURL)
    .setColor(member.displayHexColor)
    .setTimestamp()
    .addField('Username', user.username, true)
    .addField('Display Name', member.displayName, true)  
    .addField('Account Created', user.createdAt, true)
    .addField('Join Date', member.joinedAt, true)
    .addField('Status', user.presence.status, true)
    .addField('Game', game, true)
    .addField('Bot', user.bot, true)
    .addField('Roles', member.roles.array().length-1, true)
    .addField('Highest Role', member.highestRole.name, true)
    .addField('Hoist Role', member.hoistRole.name, true)
    .addField('Color Role', member.colorRole.name, true)
    .addField('Color', member.displayHexColor, true)
    message.channel.send({embed: info})
};
exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['info'],
    permLevel: 0
};
exports.help = {
    name: 'user',
    description: 'Displays assorted user information.',
    usage: 'user @<users whos info you want to see (optional)>'
};