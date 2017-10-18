exports.run = (bot, message, args, level) => {
    let command;
    if (bot.commands.has(args[0])) {
        command = bot.commands.get(args[0]);
    } else if (bot.aliases.has(args[0])) {
        command = bot.commands.get(bot.aliases.get(args[0]));
    }
    if(!command) return message.reply(`The command \`${args[0]}\` doesn't seem to exist, nor is it an alias. Try again!`);
    command = command.help.name;

    delete require.cache[require.resolve(`./${command}.js`)];
    let cmd = require(`./${command}`);
    bot.commands.delete(command);
    bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
    });
    bot.commands.set(command,cmd);
    cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
    });
    message.reply(`The command \`${command}\` has been reloaded!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['refresh'],
    botPerms: [],
    memberPerms: []
};

exports.help = {
    name: 'reload',
    description: 'Reloads a command that\'s been modified',
    usage: 'purge <command>'
};
