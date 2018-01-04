module.exports = async (bot, member) => {
	bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
	enabled = await bot.getSetting('welcomeMessagesEnabled', member.guild);
	if (enabled == '0') return;
	channelName = await bot.getSetting('welcomeMessagesChannel', member.guild);
	welcomeMessage = await bot.getSetting('welcomeMessage', member.guild);
	welcome = member.guild.channels.find('name', channelName);
	if (!welcome) return;
	welcomeMessage = welcomeMessage.replace('{user}', member.user).replace('{guild}', member.guild.name);
	welcome.send(welcomeMessage);
};
