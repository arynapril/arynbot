const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./servers.sqlite');
const fs = require("fs");
var afkJson = fs.readFileSync("./afk.json"),
	afk = JSON.parse(afkJson)
module.exports = (bot) => {
	bot.syncServers = function() {
		db.serialize(function() {
			db.run(`CREATE TABLE IF NOT EXISTS servers (
				id VARCHAR(25) PRIMARY KEY, 
				name VARCHAR(100), 
				prefix VARCHAR(10),
				welcomeMessagesEnabled BOOLEAN,
				welcomeMessagesChannel VARCHAR(25), 
				dadJokesEnabled BOOLEAN,
				dadJokesJail VARCHAR(25),
				hallOfFameEnabled BOOLEAN,
				hallOfFameEmote VARCHAR(25),
				hallOfFameLimit VARCHAR(2),
				hallOfFameChannel VARCHAR(25), 
				giveMeRoles BLOB,
				welcomeMessage VARCHAR(300),
				leaveMessage VARHCHAR(300))`);
			bot.guilds.forEach(guild => {
				db.run(`INSERT OR IGNORE INTO servers VALUES (
					"${guild.id}", 
					"${guild.name}", 
					"${bot.config.prefix}",
					0,
					"none",
					1,
					"none",
					0,
					"none",
					"3",
					"none",
					"none",
					"Hello {user}! Welcome to {guild}!",
					"{user} has left the server! :cry:")`
				);
			});
		});
		bot.log("log", "Servers synced.", 'BOT  ')
	};
	bot.removeServer = function(guild) {
		db.run(`DELETE FROM servers WHERE id = ${guild.id}`);
		bot.log('log', guild.name + " successfully removed from the database!", 'BOT  ');
	};
	bot.addServer = function(guild) {
		db.run(`INSERT OR IGNORE INTO servers VALUES (
			"${guild.id}", 
			"${guild.name}", 
			"${bot.config.prefix}", 
			0,
			"none",
			1,
			"none",
			0,
			"none",
			"3",
			"none",
			"none",
			"Hello {user}! Welcome to {guild}!",
			"{user} has left the server! :cry:")`);
		bot.log('log', guild.name + " successfully inserted into the database!");
	};
	bot.setGivemeRoles = function(roles, guild) {
		roles = roles.join(',');
		db.run(`UPDATE servers SET givemeRoles = "${roles}" WHERE id = ${guild.id}`);
		return roles;
	};
	bot.setSetting = function(setting, newSetting, message) {
		return new Promise(
			function(resolve, reject) {
				db.run(`UPDATE servers SET ${setting} = "${newSetting}" WHERE id = "${message.guild.id}"`), resolve(newSetting);
			});
	};
	bot.processMessage = function(message) {
		if (message.author.bot) return;
		if (message.isMentioned(bot.user)) {
			if (message.content.toLowerCase().includes("what's your prefix") || message.content.toLowerCase().includes("whats your prefix")) {
				this.getSetting('prefix', message.guild).then(prefix => {
					message.reply("my prefix for this server is `" + prefix + "`!")
				})
			}
			if (message.content.toLowerCase().includes("resetprefix") && message.member.hasPermission("ADMINISTRATOR")) {
				bot.setPrefix(config.prefix, message.guild);
				message.reply('I have reset this server\'s prefix to ``' + config.prefix + '``!')
			}
			if (message.content.toLowerCase().includes("what are your pronouns?") || message.content.toLowerCase().includes("what prounons do you use?")) {
				this.getSetting('prefix', message.guild).then(prefix => {
					message.channel.send(`My creator calls me by she/her pronouns, but you can call me by whatever pronouns you like! However, I tend to only respond to valid commands starting with my prefix, \`${prefix}!\``)
				})
			}
		}
		this.getSetting('prefix', message.guild).then(prefix => {
			if (message.content.startsWith(prefix)) {
				try {
					args = message.content.split(/\s+/g)
					message.content = message.content.substring(message.content.indexOf(" ") + 1, message.content.length) || null
					var command = args.shift().slice(prefix.length).toLowerCase()
					var cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
					if (!cmd) return;
					else if (!message.guild.me.hasPermission(cmd.conf.botPerms)) return message.channel.send(`Sorry, I don't have a permission I need to run that command!\n Required Permissions: ${cmd.conf.botPerms}`)
					else if (!message.member.hasPermission(cmd.conf.memberPerms)) return message.channel.send(`You do not have the permissions to run this command!\nRequired Permissions: ${cmd.conf.memberPerms}`)
					else if (cmd.conf.enabled) {
						bot.log('log', `${message.guild.name} #${message.channel.name} - ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD  ')
						try {
							cmd.run(bot, message, args);
						} catch (err) {
							message.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```")
						}
					}
				} catch (err) {
					message.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```");
					bot.error(err.stack);
				}
			}
		})
	}
	bot.getSetting = function(input, g) {
		return new Promise(
			function(resolve, reject) {
				db.all(`SELECT * FROM servers WHERE id = "${g.id}"`, function(err, rows) {
					if (err || !rows[0])
						reject(err);
					else
						resolve(rows[0][input])
				});
			}
		)
	};
	bot.log = (type, message, title) => {
		if (!title) title = "LOG";
		console.log(`${type} | ${title} | ${message}`);
	};
	bot.awaitReply = async (message, question, limit = 60000) => {
		const filter = m => m.author.id;
		await message.channel.send(question);
		try {
			const collected = await message.channel.awaitMessages(filter, {
				max: 1,
				time: limit,
				errors: ['time']
			});
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};
	bot.clean = async (bot, text) => {
		if (text && text.constructor.name == 'Promise') text = await text;
		if (typeof evaled !== 'string') text = require('util').inspect(text, {
			depth: 0
		});
		text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(bot.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
		return text;
	};
	bot.enabled = function(command, guild) {
		return true;
	};
	bot.pointsMonitor = (bot, message) => {
		const score = bot.points.get(message.author.id) || {
			cookies: 0
		};
		const total = bot.points.get(bot.user.id) || {
			cookies: 0
		}
		score.cookies++
			total.cookies++
			bot.points.set(message.author.id, score);
		bot.points.set(bot.user.id, total)
	};
	global.wait = require('util').promisify(setTimeout);
	global.range = (count, start = 0) => {
		const myArr = [];
		for (var i = 0; i < count; i++) {
			myArr[i] = i + start;
		}
		return myArr;
	};
	process.on('uncaughtException', (err) => {
		let errorMessage = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
		console.error("Uncaught Exception: ", errorMessage);
	});
	process.on("unhandledRejection", err => {
		console.error("Uncaught Promise Error: ", err);
	});
};
