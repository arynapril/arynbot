exports.run = async (bot, message, args, level) => {
    if (message.author.id !== "174687224988827659") return message.channel.send("This command is under development right now, try again later!")
    list = await bot.getSetting('giveme', message.guild);
    if (args[0] == 'add') {
        roles = args.splice(1).join(' ')
        if (list == "none") {
            bot.setSetting('giveme', roles, message);
        } else {
            list += `|${roles}`
            bot.setSetting('giveme', list, message.guild);
        }
        return message.channel.send("Role added!");
    } else if (list == 'none') {
        return message.channel.send('There are no roles in the settings to self assign! To add a role, use \`giveme add <role name>\`.')
    } else if (!args[0]) {
        return message.channel.send('Please include a role to self-assign, ')
    } else if (args[0] == 'list') {
        str = "";
        givemeList = list.split('|')
        for (i=0; i<givemeList.length; i++){
            str += `${givemeList[i]} \n`
        };
        return message.channel.send(str);
    } else if (args[0] == 'remove') {

    } else if (args[0] == 'delete') {

    } else {

    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'giveme',
	description: 'Self assigns a role, run giveme list to see a set of roles avaliable',
	usage: 'giveme <role name>'
};
