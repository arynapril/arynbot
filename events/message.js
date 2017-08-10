module.exports = (bot, message) => {
    if (message.author.bot) return;
    if (!message.guild) {
        bot.log("log", `${message.author.username} (${message.author.id}) sent \`${message}\``, 'DM   ' )
    };
    if (message.content.startsWith("im ") || message.content.startsWith("i'm ") || message.content.startsWith("I'm ") || message.content.startsWith("IM ") || message.content.startsWith("IM ") || message.content.startsWith("I am ")) {
        if (message.author.id == '226999841358610432') {
        const args = message.content.split(/\s+/g);
        const cmd = bot.commands.get('love');
        cmd.run(bot, message, args);
        } else {
        let args = message.cleanContent.split(" ").slice(1);
        let joke = args.join(" ");
        message.channel.send(`Hi **${joke}**, I'm arynbot! :heart:`);
        bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
        }
    };
    if (message.content.indexOf(bot.config.prefix) !== 0) return;
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(bot.config.prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    let perms = bot.permLevel(message);
    if (cmd && perms >= cmd.conf.permLevel) {
        bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD  ");
        cmd.run(bot, message, args, perms);
    };
};