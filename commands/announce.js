exports.run = (bot, message, args, level) => {
    parts = args.join(' ').split('|');
    if (message.guild.channels.get(parts[0])){
        chan = message.guild.channels.get(parts[0]);
        parts = parts.splice(1); 
    } else {
        chan = message.channel
    };
    role = message.guild.roles.find(r => r.name == parts[0]);
    if (!role) {
        return message.channel.send("That role was not found! Sorry!")
    }
    parts = parts.splice(1);
    announcement = parts[0];
    if (role.comparePositionTo(message.member.highestRole) < 0 || role.comparePositionTo(message.guild.me.highestRole) < 0){
        bool = role.mentionable;
        role.setMentionable(true, "Announce Command");
    } else {
        return message.channel.send("That role is above your and/or my highest role, so you cant use this command to ping it!")
    } 
    message.delete();
    chan.send(`From ${message.author}:\n<@&${role.id}>\n${announcement}`);
    role.setMentionable(bool, "Announce Command");
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: ["MANAGE_MESSAGES", "MANAGE_ROLES"],
	memberPerms: ["MANAGE_ROLES"]
};

exports.help = {
	name: 'announce',
	description: 'make an announcement in a channel',
	usage: 'announce <optional channel id> | <role name to ping> | announcement'
};
