exports.run = (bot, message, args, level) => {
    nickname = args.join(' ');
    trunc = "";
    if (message.guild.me.roles.highest.comparePositionTo(message.member.roles.highest) <= 0) return message.channel.send('Sorry, your highest role is higher than mine, so I cannot change your nickname!') 
    if (nickname.length > 32) {
        nickname = nickname.slice(0, 32)
        trunc = " Your nickname was truncated to fit in 32 characters."
    };
    message.member.setNickname(nickname);
    message.channel.send('Nickname successfully changed!' + trunc)  
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['nickname', 'hammes', 'setnick'],
	botPerms: ['MANAGE_NICKNAMES'],
	memberPerms: ['CHANGE_NICKNAME']
};

exports.help = {
	name: 'nick',
	description: 'changes a users nickname',
	usage: ''
};