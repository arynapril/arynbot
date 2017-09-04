module.exports = (bot, message) => {
	if (msg.channel.type === "dm" && msg.author.id == bot.user.id)
		console.log("[DM] " + bot.user.username + " -> " + msg.channel.recipient.username + " | " + msg.content)
	else if (msg.channel.type === "dm" && msg.author.id != bot.user.id)
		console.log("[DM] " + msg.channel.recipient.username + " -> " + bot.user.username + " | " + msg.content)
    if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    x = message.content.toLowerCase();
    if (x.startsWith("im ") || x.startsWith("i'm ") || x.startsWith("i am ")) {
        if (message.author.id == '226999841358610432') {
            const args = message.content.split(/\s+/g);
            const cmd = bot.commands.get('love');
            cmd.run(bot, message, args);
        } else {
            if (message.guild.id == '292134570940301312' && message.channel.id !== '296497111090855936') return;
            if (x.startsWith('i am ')) {
                joke1 = message.cleanContent.split(" ").slice(2);
            } else {
                joke1 = message.cleanContent.split(" ").slice(1);
            }
            if (joke1.length > 5) return;
            let joke = joke1.join(" ");
            message.channel.send(`Hi **${joke}**, I'm arynbot! :heart:`);
            bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
        }
    };
	if (!msg.channel.type === "text" || !msg.guild) return;
	bot.processMessage(msg);
};