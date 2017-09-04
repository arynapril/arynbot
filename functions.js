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
                    ""`
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
	bot.getPrefix = function (msg) {
		return new Promise(
			function (resolve, reject) {
				db.all(`SELECT * FROM servers WHERE id = "${msg.guild.id}"`, function (err, rows) {
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
	bot.permLevel = function (msg) {
		if (msg.author.id == bot.config.owner)
			return 6;
		else if (msg.author.id == msg.guild.owner.id)
			return 5;
		else if (msg.member.hasPermission("MANAGE_GUILD"))
			return 4;
		else if (msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
			return 3;
		else if (msg.member.hasPermission("MANAGE_MESSAGES"))
			return 2;
		else if (!bot.blacklist(msg.author.id))
			return 1;
		else
			return 0;
	};
	bot.processMessage = function (msg) {
		if (channel && msg.channel.id == channel) bot.log(msg.guild.name + " | " + msg.channel.name + " | " + msg.member.displayName + " | " + msg.cleanContent);

		if (msg.author.bot) return;

		var afkJson = fs.readFileSync("./afk.json"),
			afk = JSON.parse(afkJson);
		if (afk.length != 0) {
			for (let i = 0; i < afk.length; i++) {
				if (afk[i].id === msg.author.id) {
					afk.splice(i, 1);
					fs.writeFileSync("./afk.json", JSON.stringify(afk, null, 3));
					msg.channel.send(":ok_hand: Welcome back **" + msg.author.username + "**! I've removed your AFK status!");
				}
				if (msg.mentions.users.size > 0 && afk.length != 0) {
					if (msg.content.indexOf(afk[i].id) != -1 && msg.author.id != afk[i].id) {
						var nick = msg.guild.members.get(afk[i].id).displayName
						msg.channel.send({embed: new Discord.RichEmbed().setDescription(":robot: **" + nick + "** is AFK: **" + afk[i].reason + "**")})
							.then(msg => {
								setTimeout(function () {
									msg.delete()
								}, 20000)
							});
					}
				}
			}
		}

		if (msg.isMentioned(bot.user)) {
			if (msg.content.toLowerCase().includes("what's your prefix") || msg.content.toLowerCase().includes("whats your prefix")) {
				bot.getPrefix(msg).then(prefix => {
					msg.reply("my prefix for this server is `" + prefix + "`!")
				})
			}

			if (msg.content.toLowerCase().includes("resetprefix") && msg.member.hasPermission("ADMINISTRATOR")) {
				bot.setPrefix(config.prefix, msg.guild);
				msg.reply('I have reset this server\'s prefix to ``' + config.prefix + '``!')
			}
		}

		this.getPrefix(msg).then(prefix => {
			if (msg.content.startsWith(prefix)) {
				try {
					msg.args = msg.content.split(/\s+/g)
					msg.content = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length) || null
					var command = msg.args.shift().slice(prefix.length).toLowerCase()
					var cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
					var perms = bot.permLevel(msg)

					if (!cmd) return;
					else if (perms == 0) return msg.reply("you are blacklisted from using the bot!");
					else if (perms < cmd.permission) return msg.reply("you do not have permission to do this!")

					else if (bot.enabled(cmd)) {
						bot.logCommand(command, msg.content, msg.author.username, msg.channel.name, msg.guild.name)
						try {
							cmd.main(bot, msg);
						} catch (err) {
							msg.channel.send("Oh no! We encountered an error:```" + err.stack + "```")
						}
					}
				} catch (err) {
					msg.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```");
					bot.error(err.stack);
				}
			}
		})
	}
    bot.log = (type, msg, title) => {
        if (!title) title = "LOG";
        console.log(`${type} | ${title} | ${msg}`);
    };
    bot.awaitReply = async(msg, question, limit = 60000) => {
        const filter = m => m.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {
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
    global.wait = require('util').promisify(setTimeout);
    global.range = (count, start = 0) => {
        const myArr = [];
        for (var i = 0; i < count; i++) {
            myArr[i] = i + start;
        }
        return myArr;
    };
    process.on('uncaughtException', (err) => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });
};