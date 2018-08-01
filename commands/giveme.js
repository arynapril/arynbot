exports.run = async (bot, message, args, level) => {
    if (message.author.id !== "174687224988827659") return message.channel.send("This command is under development right now, try again later!")
    list = await bot.getSetting('giveme', message.guild);
    if (args[0] == 'add') {
        role = args.splice(1).join(' ')
        if (!message.guild.roles.find('name', role)) return message.channel.send('That role was not found in this server! Sorry!')
        if (list == "none") {
            bot.setSetting('giveme', role, message);
        } else {
            list += `|${role}`
            bot.setSetting('giveme', list, message);
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
    } else if (args[0] == 'delete') {
        role = args.splice(1).join(' ')
        deleteList = list.split('|');
        if (deleteList.indexOf(role) > -1) {
            deleteList.splice(deleteList.indexOf(role), 1);
            list = deleteList.join('|');
            bot.setSetting('giveme', list, message);
            return message.channel.send("Role removed!")
        } else {
            return message.channel.send("That role was not found in the list!")
        }
    } else if (args[0] == 'remove') {
        removeRoles = args.splice(1).join(" ").split(', ');
        roles = list.split('|');
        didntHave = 0;
        removed = 0;
        removedNames = "";
        couldnt = 0;
        for (i=0; i<removeRoles.length; i++){
            if (roles.indexOf(removeRoles[i])>-1){
                if (!message.member.roles.find('name', removeRoles[i])) {
                    didntHave += 1;
                } else {
                    message.member.removeRole(message.guild.roles.find('name', removeRoles[i]))
                    removed += 1;
                    removedNames += `${removeRoles[i]}`
                }
            } else {
                couldnt += 1;
            }
        }
        return message.channel.send(`Removed ${removed} roles, you didn't have ${didntHave} roles, and couldn't remove ${couldnt} role, as they aren't on the list of allowed roles!`);
    } else {
        addRoles = args.splice(1).join(" ").split(', ');
        roles = list.split('|');
        alreadyHad = 0;
        added = 0;
        addedNames = "";
        couldnt = 0;
        for (i=0; i<addRoles.length; i++){
            if (roles.indexOf(addRoles[i])>-1){
                if (message.member.roles.find('name', addRoles[i])) {
                    alreadyHad += 1;
                } else {
                    message.member.addRole(message.guild.roles.find('name', addRoles[i]))
                    added += 1;
                    addedNames += `${removeRoles[i]}`
                }
            } else {
                couldnt += 1;
            }
        }
        return message.channel.send(`Added ${removed} roles, you already had ${alreadyHad} roles, and couldn't add ${couldnt} role, as they aren't on the list of allowed roles!`);
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
