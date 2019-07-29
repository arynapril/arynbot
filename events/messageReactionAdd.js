module.exports = async (bot, messageReaction, user) => {
	const Discord = require('discord.js');
	let msg = messageReaction.message;
	if(msg.channel.type === "dm") return;
	setting = await bot.getSetting('hallOfFameEnabled', msg.guild);
	if (setting == '0') return;
	overrideBool = await bot.getSetting('hallOfFameOverrideEnabled', msg.guild);
	if (overrideBool) {
		overrideEmote = await bot.getSetting('hallOfFameOverrideEmote', msg.guild);
		overrideEmoji = msg.guild.emojis.find(e => e.name == overrideEmote);
		if(overrideEmoji) {
			msg.reactions.forEach(rct => {
				if (rct.emoji.id == overrideEmoji.id) {
					rct.users.forEach(u => {
						if (u==msg.author) return;
						m=msg.guild.members.get(u.id);
						if(m.hasPermission("MANAGE_MESSAGES")) return;
					})
				}
			})
		}
	}
	chan = await bot.getSetting('hallOfFameChannel', msg.guild)
	var HallOfFame = msg.guild.channels.find(c => c.name == chan);
	if (!HallOfFame) return;
	if (!HallOfFame.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;
	if (messageReaction.me) return;
	emote = await bot.getSetting('hallOfFameEmote', msg.guild);
	emoji = msg.guild.emojis.find(e => e.name == emote);
	if (!emoji) return;
	modNeeded = await bot.getSetting('hallOfFameModNeeded', msg.guild);
	if (modNeeded) {
		mCheckB=0;
		msg.reactions.forEach(mCheck => {
			if (mCheck.emoji.id == emoji.id) {
				mCheck.users.forEach(mCheckU => {
					mCheckM=msg.guild.members.get(mCheckU.id);
					if(mCheckM.hasPermission("MANAGE_MESSAGES")) mCheckB=1;
				})
			}
		})
		if (mCheckB==0)	return;	
	}
	authorNeeded = await bot.getSetting('hallOfFameAuthorNeeded', msg.guild);
	if (authorNeeded) {
		aCheckB=0
		msg.reactions.forEach(aCheck => {
			if (aCheck.emoji.id == emoji.id) {
				aCheck.users.forEach(aCheckU => {
					if(aCheckU == msg.author) aCheckB=1;
				})
			}
		})
		if (aCheckB==0) return;		
	}
	limit = await bot.getSetting('hallOfFameLimit', msg.guild)
	if (limit == 0) return;
	if (messageReaction.emoji.id == emoji.id && messageReaction.count >= limit) {
		msg.react(emoji.id);
		const HoF = new Discord.RichEmbed();
		HoF.setColor(`${msg.member.displayHexColor}`)
			.setTitle('Hall of Fame 🏆')
			.setURL(`http://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`)
			.setFooter('Hall of Fame 🏆')
			.setTimestamp()
		if (msg.member.nickname == null) {
			HoF.addField('User', `${msg.author}`, true)
		} else {
			HoF.addField('User', `${msg.author} (${msg.author.username})`, true);
		};
		HoF.addField('Channel', `${msg.channel}`, true)
		if (msg.attachments.size == 0) {
			HoF.addField('Message', `${msg}`)
		} else {
			pictures = msg.attachments.array();
			if (msg != "") {
				HoF.addField('Message', `${msg}`)
			}
			HoF.setImage(pictures[0].url)
		}
		HallOfFame.send({
			embed: HoF
		});
	};
};
