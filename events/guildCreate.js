module.exports = (bot, guild) => {
	bot.log('log', `I joined ${guild.name}`, 'GUILD');
    bot.addServer(guild);
}