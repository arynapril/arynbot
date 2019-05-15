exports.run = async (bot, message, args, level) => {
	const Discord = require('discord.js')
	x = '';
	phrase = '';
	settingsArray = ['dadJokesEnabled', 'dadJokesJail', 'hallOfFameEnabled', 'hallOfFameEmote', 'hallOfFameLimit', 'hallOfFameChannel', 'welcomeMessagesEnabled', 'welcomeMessagesChannel', 'leaveMessagesEnabled', 'leaveMessagesChannel', 'logsChannel', 'prefix', 'welcomeMessage', 'securityEnabled', 'securityChannel', 'securityPhrase', 'securityNickCheck', 'securityNickFormat', 'securityJoinMessage', 'securityRole', 'securityPinMessage', 'leaveMessagesAutoDelete', 'hallOfFameOverrideEnabled', 'hallOfFameOverrideEmote', 'hallOfFameAuthorNeeded', 'hallOfFameModNeeded', 'modMailEnabled', 'modMailChannel'];
	booleanArray = ['dadJokesEnabled', 'hallOfFameEnabled', 'welcomeMessagesEnabled', 'leaveMessagesEnabled', 'securityEnabled', 'securityNickCheck', 'leaveMessagesAutoDelete', 'hallOfFameOverrideEnabled', 'hallOfFameModNeeded', 'hallOfFameAuthorNeeded', 'modMailEnabled'];
	channelArray = ['dadJokesJail', 'hallOfFameChannel', 'welcomeMessagesChannel', 'leaveMessagesChannel', 'securityChannel', 'logsChannel', 'modMailChannel'];
	phraseArray = ['welcomeMessage', 'securityPhrase', 'securityNickFormat', 'securityJoinMessage', 'securityPinMessage'];
	roleArray = ['securityRole'];
	numberArray = ['hallOfFameLimit'];
	emoteArray = ['hallOfFameEmote', 'hallOfFameOverrideEmote'];
	if (!args[0]) {
		for (i=0; i<=Math.floor(bot.commands.size/24); i++) {
			settingsbox = new Discord.RichEmbed()
			.setTitle("Current Settings")
			.setColor('RANDOM')
			.setFooter(`Current settings for ${message.guild.name}`)
			if (i==Math.floor(settingsArray.length/24)){
				x = settingsArray.length%24;
			} else {
				x = 20;
			}
			for (y=0; y<x; y++) {
				value = await bot.getSetting(settingsArray[i], message.guild);
				settingsbox.addField(settingsArray[i*24+y], value, true);
			}
			message.channel.send({embed: helpbox})
		}
	} else if (settingsArray.indexOf(args[0]) != -1) {
		if (!args[1]) {
			setting = await bot.getSetting(args[0], message.guild);
			message.channel.send(`The current **${args[0]}** setting is **${setting}**`)
		} else {
			if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("you do not have permission to manage this server's setings!");
			if (phraseArray.indexOf(args[0]) != -1) {
				value = args.slice(1).join(' ');
			} else if (roleArray.indexOf(args[0]) != -1) {
				value = args.slice(1).join(' ');
				role = message.guild.roles.find('name', value);
				if (!role) return message.channel.send(`The ${args[0]} value must be the name of a valid role in this server! Please try again!`);
			} else if (booleanArray.indexOf(args[0]) != -1) {
				value = args[1];
				if (value !== '1' && value !== '0') return message.channel.send(`The ${args[0]} value must be be either a 0 or a 1! Please try again!`);
			} else if (channelArray.indexOf(args[0]) != -1) {
				value = args[1];
				chan = message.guild.channels.find('name', value);
				if (!chan && args[1] !== 'none') return message.channel.send(`The ${args[0]} value must be the name of an channel on this server or 'none' to remove the setting! Please try again!`)
			} else if (numberArray.indexOf(args[0]) != -1) {
				value = args[1];
				if (isNaN(parseInt(value))) return message.channel.send(`The ${args[0]} value must be a whole number! Please try again!`);
			} else if (emoteArray.indexOf(args[0]) != -1) {
				value = args[1];
				emote = message.guild.emojis.find('name', value);
				if (!emote) return message.channel.send(`The ${args[0]} value must be the name of a custom emoji on this server! Please try again!`)
			};
			setting = await bot.setSetting(args[0], value, message);
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
	usage: 'settings <dadJokesEnabled | dadJokesJail | hallOfFameEnabled | hallOfFameEmote | hallOfFameLimit | hallOfFameChannel | welcomeMessagesEnabled | welcomeMessage> <(optional) what to change the setting to (channel name if a channel setting, emote name if emote setting, 1 or 0 if boolean setting)>'
};
