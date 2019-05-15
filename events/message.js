module.exports = async (bot, message) => {
	const Discord = require('discord.js');
	if (message.content.toLowerCase().includes('yam')||message.content.toLowerCase().includes('174687224988827659')||message.content.toLowerCase().includes('aryn')) {
		if (message.guild.members.get('174687224988827659')) {
			mentionedEmbed = new Discord.RichEmbed()
			.setTitle(message.guild.name + ' - ' + message.channel.name)
			.setAuthor(message.author.username, message.author.avatarURL)
			.setDescription(message.content)
			bot.users.get('174687224988827659').send({embed: mentionedEmbed});
		}
	}
	if (message.channel.type === "dm" && message.author.id == bot.user.id)
		return console.log("[DM] " + bot.user.username + " -> " + message.channel.recipient.username + " | " + message.content);
	else if (message.channel.type === "dm" && message.author.id != bot.user.id){
		console.log("[DM] " + message.channel.recipient.username + " -> " + bot.user.username + " | " + message.content);
		args = message.content.split(/\s+/g);
		mmGuild = bot.guilds.get(args[0]);
		if (!mmGuild) return message.channel.send('Sorry, I\'m not in that server/it doesn\'t exist! Make sure you preface your mod mail message with the server ID!');
		mmGuildB = await bot.getSetting('modMailEnabled', mmGuild);
		if (!mmGuildB) return message.channel.send('Sorry, that server doesn\'t have mod mail enabled!');
		mmGuildC = await bot.getSetting('modMailChannel', mmGuild);
		mmGuildChan = mmGuild.channels.find('name', mmGuildC);
		if (!mmGuildChan) return message.channel.send('Sorry, something is wrong server end! Make sure all the channel settings are set correctly!');
		modMail = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setDescription(args.join(" "))
		mmGuildChan.send(`${message.author.id}`, {embed: modMail});
		message.react('💌');
		return;
	}
	if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
	if (!message.channel.type === "text" || !message.guild) return;
	if (message.author.bot) return;
	secEnabled = await bot.getSetting('securityEnabled', message.guild);
	if (secEnabled) {
		secChanS = await bot.getSetting('securityChannel', message.guild);
		secChan = message.guild.channels.find('name', secChanS);
		if (message.channel == secChan) {
			passPhrase = await bot.getSetting('securityPhrase', message.guild);
			if(message.content.includes(passPhrase)){
				secNick = await bot.getSetting('securityNickCheck', message.guild);
				if (secNick && !message.member.nickname) {
					nickFormat = await bot.getSetting('securityNickFormat', message.guild);
					secChan.send(`This server requires you to have a nickname set to join their server. To join, please set your nickname according to the format ${nickFormat} (by clicking the server name, then change nickname) and then retry the passphrase!`);
				} else {
					memRoleS = await bot.getSetting('securityRole', message.guild);
					memRole = message.guild.roles.find('name', memRoleS);
					if (!memRole) return;
					message.member.addRole(memRole);
            		message.channel.bulkDelete(50);
					welcome = await bot.getSetting('welcomeMessagesEnabled', message.guild);
					welcomePin = await bot.getSetting('securityPinMessage', message.guild);
					welcomePin = welcomePin.replace('{user}', message.author).replace('{guild}', message.guild.name);
					message.channel.send(welcomePin);
					if (welcome) {
						welcomeChanS = await bot.getSetting('welcomeMessagesChannel', message.guild);
						welcomeChan = message.guild.channels.find('name', welcomeChanS);
						welcomeMessage = await bot.getSetting('welcomeMessage', message.guild);
						welcomeMessage = welcomeMessage.replace('{user}', message.author).replace('{guild}', message.guild.name);
						if (!welcomeChan) return;
						welcomeChan.send(welcomeMessage);
					}
				}
			}
		}
	}
	bot.processMessage(message);
};
