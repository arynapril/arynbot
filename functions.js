const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./servers.sqlite');
const fs = require("fs");
var afkJson = fs.readFileSync("./afk.json"),
	afk = JSON.parse(afkJson),
	channel = null,
	stdin = process.openStdin();
module.exports = (bot) => {
bot.syncServers = function () {
		db.serialize(function () {
			db.run(`CREATE TABLE IF NOT EXISTS servers (
				id VARCHAR(25) PRIMARY KEY, 
				name VARCHAR(100), 
				prefix VARCHAR(10), 
                dadJokes BOOLEAN,
                dadJokesJail VARCHAR(25),
                messageLogging BOOLEAN,
                hallOfFameEnabled BOOLEAN,
                hallOfFameEmote VARCHAR(25),
                hallOfFameLimit VARCHAR(2), 
				giveMeRoles BLOB)`
			);
			bot.guilds.forEach(guild => {
				db.run(`INSERT OR IGNORE INTO servers VALUES (
					"${guild.id}", 
					"${guild.name}", 
					"${bot.config.prefix}", 
					1,
                    "",
                    1,
                    0,
                    "",
                    "3",
                    "")`
				);
			});
		});
		bot.log("log","Servers synced.", 'BOT  ')
	};
	bot.removeServer = function (guild) {
		db.run(`DELETE FROM servers WHERE id = ${guild.id}`);
		bot.log('log', guild.name + " successfully removed from the database!", 'BOT  ');
	};
	bot.addServer = function (guild) {
				db.run(`INSERT OR IGNORE INTO servers VALUES (
					"${guild.id}", 
					"${guild.name}", 
					"${bot.config.prefix}", 
					1,
                    "",
                    1,
                    0,
                    "",
                    "3",
                    ""`
		);
		bot.log('log', guild.name + " successfully inserted into the database!");
	};
    	bot.setGivemeRoles = function (roles, guild) {
		roles = roles.join(',');
		db.run(`UPDATE servers SET givemeRoles = "${roles}" WHERE id = ${guild.id}`);
		return roles;
	}
	bot.getGivemeRoles = function (guild) {
		return new Promise(
			function (resolve, reject) {
				db.all(`SELECT * FROM servers WHERE id = "${guild.id}"`, function (err, rows) {
					if (err || !rows[0])
						reject(err);
					else
						resolve(rows[0].givemeRoles)
				});
			}
		)
	};
	bot.getPrefix = function (message) {
		return new Promise(
			function (resolve, reject) {
				db.all(`SELECT * FROM servers WHERE id = "${message.guild.id}"`, function (err, rows) {
					if (err || !rows[0])
						reject(err);
					else
						resolve(rows[0].prefix)
				});
			}
		)
	};
	bot.setPrefix = function (prefix, guild) {
		db.run("UPDATE servers SET prefix = \"" + prefix + "\" WHERE id = " + guild.id);
		return prefix;
	};
	bot.permLevel = function (message) {
		if (message.author.id == bot.config.owner)
			return 6;
		else if (message.author.id == message.guild.owner.id)
			return 5;
		else if (message.member.hasPermission("MANAGE_GUILD"))
			return 4;
		else if (message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
			return 3;
		else if (message.member.hasPermission("MANAGE_MESSAGES"))
			return 2;
		else 
			return 1;
	};
	bot.processMessage = function (message) {
		if (message.author.bot) return;
		var afkJson = fs.readFileSync("./afk.json"),
			afk = JSON.parse(afkJson);
		if (afk.length != 0) {
			for (let i = 0; i < afk.length; i++) {
				if (afk[i].id === message.author.id) {
					afk.splice(i, 1);
					fs.writeFileSync("./afk.json", JSON.stringify(afk, null, 3));
					message.channel.send(":ok_hand: Welcome back **" + message.author.username + "**! I've removed your AFK status!");
				}
				if (message.mentions.users.size > 0 && afk.length != 0) {
					if (message.content.indexOf(afk[i].id) != -1 && message.author.id != afk[i].id) {
						var nick = message.guild.members.get(afk[i].id).displayName
						message.channel.send({embed: new Discord.RichEmbed().setDescription(":robot: **" + nick + "** is AFK: **" + afk[i].reason + "**")})
							.then(message => {
								setTimeout(function () {
									message.delete()
								}, 20000)
							});
					}
				}
			}
		}
		if (message.isMentioned(bot.user)) {
			if (message.content.toLowerCase().includes("what's your prefix") || message.content.toLowerCase().includes("whats your prefix")) {
				bot.getPrefix(message).then(prefix => {
					message.reply("my prefix for this server is `" + prefix + "`!")
				})
			}

			if (message.content.toLowerCase().includes("resetprefix") && message.member.hasPermission("ADMINISTRATOR")) {
				bot.setPrefix(config.prefix, message.guild);
				message.reply('I have reset this server\'s prefix to ``' + config.prefix + '``!')
			}
		}
		this.getPrefix(message).then(prefix => {
			if (message.content.startsWith(prefix)) {
				try {
					args = message.content.split(/\s+/g)
					message.content = message.content.substring(message.content.indexOf(" ") + 1, message.content.length) || null
					var command = args.shift().slice(prefix.length).toLowerCase()
					var cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
					var perms = bot.permLevel(message)

					if (!cmd) return;
					else if (perms == 0) return message.reply("you are blacklisted from using the bot!");
					else if (perms < cmd.permission) return message.reply("you do not have permission to do this!")

					else if (bot.enabled(cmd)) {
						bot.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, 'CMD  ')
						try {
							cmd.run(bot, message, args, perms);
						} catch (err) {
							message.channel.send("Oh no! We encountered an error:```" + err.stack + "```")
						}
					}
				} catch (err) {
					message.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```");
					bot.error(err.stack);
				}
			}
		})
	}
	bot.getSetting = function (input, message) {
		db.get(`SELECT ${input} ${input} FROM servers WHERE id = "${message.guild.id}"`, 1, (err, row) => {
			if (err) {
				bot.log('log', err, 'ERROR');
        	} else {
				return row.input
			};
		});
	}
    bot.log = (type, message, title) => {
        if (!title) title = "LOG";
        console.log(`${type} | ${title} | ${message}`);
    };
    bot.awaitReply = async(message, question, limit = 60000) => {
        const filter = m => m.author.id;
        await message.channel.send(question);
        try {
            const collected = await message.channel.awaitMessages(filter, {
                max: 1
                , time: limit
                , errors: ['time']
            });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };
    bot.clean = async(bot, text) => {
        if (text && text.constructor.name == 'Promise') text = await text;
        if (typeof evaled !== 'string') text = require('util').inspect(text, {
            depth: 0
        });
        text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(bot.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
        return text;
    };
	bot.enabled = function (command, guild) {
		return true;
	}
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