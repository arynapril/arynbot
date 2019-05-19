exports.run = (bot, message, args, level) => {
    if (!message.mentions.users.array()[0]) return message.channel.send('Please mention a user to remove the role from!');
    var user = message.mentions.users.array()[0];
    var roleToTake = args.slice(1).join(' ');
    let role = message.guild.roles.find(r => r.name == roleToTake);
    if (!role) {
        message.channel.send("That role does not exist!");
    } else if (role.comparePositionTo(message.member.highestRole) < 0) {
        message.guild.members.get(user.id).removeRole(role).then(m => {
            if(!m.roles.has(role.id))
                message.channel.send(`Successfully took the **${roleToTake}** from **${user.username}**!`);
            else
                message.channel.send(`Could not take the **${roleToTake}** from **${user.username}**! Sorry!`);
        }).catch(console.error);
    } else
        message.channel.send("Your highest role is lower than this role, so you cannot remove it! Sorry!");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: ['MANAGE_ROLES'],
	memberPerms: ['MANAGE_ROLES']
};

exports.help = {
	name: 'take',
	description: 'takes a role from a mentioned user',
	usage: 'take <member mention> <role name>'
};
