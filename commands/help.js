exports.run = (bot, message, params, level) => {
    if (!params[0]) {
        const myCommands = bot.commands.filter(c => c.conf.permlevel <= level);
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.channel.send(`Command List\n\n [Use ${bot.config.prefix}help <commandname> for details on a specific command]\n\n${myCommands.map(c => `${bot.config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {
            code: 'asciidoc'
        });
    } else {
        let command = params[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            message.channel.send(`${command.help.name}\n${command.help.description}\nusage :: ${bot.config.prefix}${command.help.usage}`, {
                code: 'asciidoc'
            });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h', 'halp'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Displays all the commands avaliable for your permission level',
    usage: 'help <command [optional]>'
};