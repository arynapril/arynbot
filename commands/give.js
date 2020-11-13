exports.run = (bot, message, args, level) => {
    if (!message.mentions.users.array()[0]) return message.channel.send('Please mention a user to give the role to!');
    var user = message.mentions.users.array()[0];
    var roleToGive = args.slice(1).join(' ');
    let role = message.guild.roles.cache.find(r => r.name == roleToGive);
    if (!role) {
        message.channel.send("That role does not exist!");
    } else if (role.comparePositionTo(message.member.roles.highest) < 0) {
        message.guild.members.cache.get(user.id).roles.add(role).then(m => {
            if(m.roles.cache.has(role.id))
                message.channel.send(`Successfully gave **${user.username}** the **${roleToGive}** role!`);
            else
                message.channel.send(`Could not give **${user.username}** the **${roleToGive}** role! Sorry!`);
        }).catch(console.error);
    } else
        message.channel.send("Your highest role is lower than this role, so you cannot give it! Sorry!");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: ['MANAGE_ROLES'],
	memberPerms: ['MANAGE_ROLES']
};

exports.help = {
	name: 'give',
	description: 'gives a mentioned user a role',
	usage: 'give <member mention> <role name>'
};
