module.exports = (bot, message) => {
    if (message.author.bot) return;
    if (!message.guild) {
        bot.log("log", `${message.author.username} (${message.author.id}) sent \`${message}\``, 'DM   ' )
        return;
    };
    if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    x = message.content.toLowerCase();
    if (x.startsWith("im ") || x.startsWith("i'm ") || x.startsWith("i am ")) {
        if (message.author.id == '226999841358610432') {
            const args = message.content.split(/\s+/g);
            const cmd = bot.commands.get('love');
            cmd.run(bot, message, args);
        } else {
            if (message.guild.id == '292134570940301312' && message.channel.id !== '296497111090855936') return;
            if (message.content.toLowerCase.startsWith('i am ')) {
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
    if (message.content.indexOf(bot.config.prefix) !== 0) return;
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(bot.config.prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    let perms = bot.permLevel(message);
    if (cmd && perms >= cmd.conf.permLevel) {
        bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) ran command ${cmd.help.name} | ${args}`, "CMD  ");
        cmd.run(bot, message, args, perms);
    };
};