exports.run = async (bot, message, args, level) => {
	const Discord = require('discord.js')
	x = "";
	settingsArray = ['dadJokesEnabled', 'dadJokesJail', 'hallOfFameEnabled', 'hallOfFameEmote', 'hallOfFameLimit', 'hallOfFameChannel', 'welcomeMessagesEnabled', 'welcomeMessagesChannel', 'prefix']
	booleanArray = ['dadJokesEnabled', 'hallOfFameEnabled', 'welcomeMessagesEnabled'];
	channelArray = ['dadJokesJail', 'hallOfFameChannel', 'welcomeMessagesChannel'];
	if (!args[0]) {
		settingsEmbed = new Discord.RichEmbed()
		.setTitle("Current Settings")
		for(var i = 0; i < settingsArray.length; i++){
			value = await bot.getSetting(settingsArray[i]);
			settingsEmbed.addField(settingsArray[i], value);
		}
		message.channel.send({embed: settingsEmbed});
	} else if (settingsArray.indexOf(args[0]) != -1) {
		if (!args[1]) {
			setting = await bot.getSetting(args[0], message.guild);
			message.channel.send(`The current **${args[0]}** setting is **${setting}**`)
		} else {
			if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you do not have permission to manage this server's setings!");
			if (args[2]) return message.channel.send('Please enter only one value!')
			if (booleanArray.indexOf(args[0]) != -1 && args[1] !== '1' && args[1] !== '0') return message.channel.send(`The ${args[0]} value must be be either a 0 or a 1! Please try again!`);
			if (channelArray.indexOf(args[0]) != -1) {
				channelFound = false;
				chans = message.guild.channels.array();
				for (var i = 0; i < chans.length; i++) {
					if (args[1] == chans[i].name) {
						channelFound = true;
					}
				}
				if (!channelFound && args[1] !== 'none') return message.channel.send(`The ${args[0]} value must be the name of an channel on this server or 'none' to remove the setting! Please try again!`)
			};
			if (args[0] == 'hallOfFameLimit' && isNaN(parseInt(args[1]))) return message.channel.send(`The ${args[0]} value must be a whole number! Please try again!`);
			if (args[0] == 'hallOfFameEmote') {
				found = false;
				emoji = message.guild.emojis.array();
				for (var i = 0; i < emoji.length; i++) {
					if (args[1] == emoji[i].name) {
						found = true;
					};
				};
				if (!found) return message.channel.send(`The ${args[0]} value must be the name of an emoji on this server! Please try again!`)
			}
			setting = await bot.setSetting(args[0], args[1], message);
			message.channel.send(`**${args[0]}** setting successfully changed to **${setting}**`);
		}
	};
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['setting'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'settings',
	description: 'sets settings',
	usage: 'settings <dadJokesEnabled | dadJokesJail | hallOfFameEnabled | hallOfFameEmote | hallOfFameLimit | hallOfFameChannel | welcomeMessagesEnabled> <(optional) what to change the setting to (channel name if a channel setting, emote name if emote setting, 1 or 0 if boolean setting)>'
};
