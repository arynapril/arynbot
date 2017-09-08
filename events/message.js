module.exports = (bot, message) => {
	if (message.channel.type === "dm" && message.author.id == bot.user.id)
		console.log("[DM] " + bot.user.username + " -> " + message.channel.recipient.username + " | " + message.content)
	else if (message.channel.type === "dm" && message.author.id != bot.user.id)
		console.log("[DM] " + message.channel.recipient.username + " -> " + bot.user.username + " | " + message.content)
    if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    x = message.content.toLowerCase();
    if (x.startsWith("im ") || x.startsWith("i'm ") || x.startsWith("i am ")) {
        bot.getSetting('dadJokesEnabled', message.guild).then(setting => {
            if (setting == '0') return;
            bot.getSetting('dadJokesJail', message.guild).then(chan => {
                jail = message.guild.channels.find('name', chan);
                if (!jail) {
                    bot.dadjoke(message)
                } else {
                    if (message.channel == jail) {
                        bot.dadjoke(message)
                    }
                }
            })
        })
        
    };
	if (!message.channel.type === "text" || !message.guild) return;
	bot.processMessage(message);
};