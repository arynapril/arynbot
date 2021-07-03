module.exports = async (bot, member) => {
	bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
	security = await bot.getSetting('securityEnabled', member.guild);
	welcome = await bot.getSetting('welcomeMessagesEnabled', member.guild);
	if (security) {
		secChanS = await bot.getSetting('securityChannel', member.guild);
		secChan = member.guild.channels.cache.find(c => c.name == secChanS);
		if(!secChan) return;
		secMessage = await bot.getSetting('securityJoinMessage', member.guild);
		secMessage = secMessage.replace('{user}', member.user).replace('{guild}', member.guild.name);
		secChan.send(secMessage);
	} else if (welcome) {
		welcomeChanS = await bot.getSetting('welcomeMessagesChannel', member.guild);
		welcomeChan = member.guild.channels.cache.find(c => c.name == welcomeChanS);
		welcomeMessage = await bot.getSetting('welcomeMessage', member.guild);
		welcomeMessage = welcomeMessage.replace('{user}', member.user).replace('{guild}', member.guild.name);
		if (!welcomeChan) return;
		welcomeChan.send(welcomeMessage);
	}
};
