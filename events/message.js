module.exports = (bot, message) => {
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
    bot.processMessage(message);
};