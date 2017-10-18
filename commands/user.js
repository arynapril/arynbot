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
    if (!member.hoistRole) {
        var hoist = "None"
    } else {
        var hoist = member.hoistRole.name;
    };
    if (!member.colorRole) {
        var color = "None"
    } else {
        var color = member.colorRole.name;
    };
    var exclusive = member.roles.array()[0].name,
    num = member.roles.array()[0].members.size;
    member.roles.forEach(role => {
        if(role.members.size < num) {
            exclusive = role.name,
            num = role.members.size;
        }
    });
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
    .addField('Hoist Role', hoist, true)
    .addField('Color Role', color, true)
    .addField('Most Exclusive Role', exclusive, true)
    .addField('Color', member.displayHexColor, true)
    .addField('Icon URL', user.avatarURL, true)
    message.channel.send({embed: info})
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info', 'userinfo'],
    botPerms: [],
    memberPerms: []
};
exports.help = {
    name: 'user',
    description: 'Displays assorted user information.',
    usage: 'user @<users whos info you want to see (optional)>'
};