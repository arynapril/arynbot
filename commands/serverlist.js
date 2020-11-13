exports.run = (bot, message, args, level) => {
    var str = ""; 
    var guilds = bot.guilds.cache.array(); 
    for (var i = 0; i < guilds.length; i++) { 
        str += `${i} - ${guilds[i].name.replace(/@/g, '@ ')}\n`; 
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
