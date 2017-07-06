exports.run = (bot, message, args) => {
    if (!args[0]) {
        const commandList = bot.commands;
        message.channel.send(
            `**:heart: Command List :heart:**\n\n [Use !help <command name for details!] \n\n ${commandList}`)
    }
}

//note: this command is broken af and i gotta fix it