module.exports = async (bot, message) => {
	if (message.channel.type === "dm" && message.author.id == bot.user.id)
		return console.log("[DM] " + bot.user.username + " -> " + message.channel.recipient.username + " | " + message.content);
	else if (message.channel.type === "dm" && message.author.id != bot.user.id)
		return console.log("[DM] " + message.channel.recipient.username + " -> " + bot.user.username + " | " + message.content);
	if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
	x = message.content.toLowerCase();
	if (x.startsWith("im ") || x.startsWith("i'm ") || x.startsWith("i am ")) {
		bot.getSetting('dadJokesEnabled', message.guild).then(setting => {
			if (setting == '0') return;
			bot.getSetting('dadJokesJail', message.guild).then(chan => {
				jail = message.guild.channels.find('name', chan);
				if (!jail) {
					if (message.author.id == '226999841358610432') {
						const args = message.content.split(/\s+/g);
						const cmd = bot.commands.get('love');
						cmd.run(bot, message, args);
					} else {
						if (x.startsWith('i am ')) {
							joke1 = message.cleanContent.split(" ").slice(2);
						} else {
							joke1 = message.cleanContent.split(" ").slice(1);
						}
						if (joke1.length > 5) return;
						let joke = joke1.join(" ");
						message.channel.send(`Hi **${joke}**, I'm ${message.guild.me.displayName}! :heart:`);
						bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
					};
				} else {
					if (message.channel == jail) {
						if (message.author.id == '226999841358610432') {
							const args = message.content.split(/\s+/g);
							const cmd = bot.commands.get('love');
							cmd.run(bot, message, args);
						} else {
							if (x.startsWith('i am ')) {
								joke1 = message.cleanContent.split(" ").slice(2);
							} else {
								joke1 = message.cleanContent.split(" ").slice(1);
							}
							if (joke1.length > 5) return;
							let joke = joke1.join(" ");
							message.channel.send(`Hi **${joke}**, I'm ${message.guild.me.displayName}! :heart:`);
							bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
						};
					}
				}
			})
		})
	};
	if (!message.channel.type === "text" || !message.guild) return;
	if (message.author.bot) return;
	secEnabled = await bot.getSetting('securityEnabled', member.guild);
	if (secEnable) {
		secChanS = await bot.getSetting('securityChannel', member.guild);
		secChan = message.guild.channels.find('name', secChanS);
		if (message.channel = secChan) {
			passPhrase = await bot.getSetting('securityPhrase', member.guild);
			if(message.content.includes(passPhrase)){
				secNick = await bot.getSetting('securityNickCheck', member.guild);
				if (secNick && !message.member.nickname) {
					nickFormat = await bot.getSetting('securityNickFormat', member.guild);
					secChan.send(`This server requires you to have a nickname set to join their server. To join, please set your nickname according to the format ${nickFormat} (by clicking the server name, then change nickname) and then retry the passphrase!`);
				} else {
					memRoleS = await bot.getSetting('securityRole', member.guild);
					memRole = message.guild.roles.find('name', memRoleS);
					if (!memRole) return;
					message.member.addRole(memRole);
            		message.channel.bulkDelete(50);
					welcome = await bot.getSetting('welcomeMessagesEnabled', member.guild);
					welcomePin = await bot.getSetting('securityPinMessage', member.guild);
					welcomePin = welcomePin.replace('{user}', member.user).replace('{guild}', member.guild.name);
					message.channel.send("Welcome to LGBTQ+ of FIRST! Please read the rules, set your nickname to include your team number and pronouns, and then type **I have read the rules and regulations**. Thank you!");
					if (welcome) {
						welcomeChanS = await bot.getSetting('welcomeMessagesChannel', member.guild);
						welcomeChan = member.guild.channels.find('name', welcomeChanS);
						welcomeMessage = await bot.getSetting('welcomeMessage', member.guild);
						welcomeMessage = welcomeMessage.replace('{user}', member.user).replace('{guild}', member.guild.name);
						if (!welcomeChan) return;
						welcomeChan.send(welcomeMessage);
					}
				}
			}
		}
	}
	bot.processMessage(message);
};
