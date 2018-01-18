exports.run = (bot, message, args, level) => {
    var str = ""; 
    var guilds = bot.guilds.array(); 
    for (var i = 0; i < guilds.length; i++) { 
        str += `${i} - ${guilds[i].name.replace('@', '@ ')}\n`; 
    } 
    message.channel.send(str);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['guildlist'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'serverlist',
	description: 'Displays a list of servers arynbot is in',
	usage: ''
};
