module.exports = async bot => {
	await wait(1000);
	bot.syncServers();
	bot.log("log", `Ready to love ${bot.users.cache.size} users in ${bot.guilds.cache.size} servers!`, "READY");
	bot.user.setPresence({ game: { name: `in ${bot.guilds.cache.size} servers! ❤️` }, status: 'online' })
}
