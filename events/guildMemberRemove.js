module.exports = async (bot, member) => {
	bot.log("log", `${member.guild.name} lost a member - ${member.user.username} (${member.id})`, 'MEMBR');
	enabled = await bot.getSetting('leaveMessagesEnabled', member.guild);
	if (enabled == '0') return;
	setting = await bot.getSetting('leaveMessagesChannel', member.guild);
	welcome = member.guild.channels.cache.find(c => c.name == setting);
	if (!welcome) return;
	autodelete = await bot.getSetting('leaveMessagesAutoDelete', member.guild);
	if (autodelete) {
		welcome.send(`${member.displayName} has left the server! :cry:`)
		.then(msg => setTimeout(function() {msg.delete()}, 60000));
	} else {
		welcome.send(`${member.displayName} has left the server! :cry:`);
	}
	
};
