exports.run = async (bot, message, args, level) => {
    const Discord = require('discord.js');
    list = await bot.getSetting('giveme', message.guild);
    givemeList = list.split('|');
    if (args[0] == 'add') {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don't have the perms required to add roles to the giveme! Sorry!")
        role = args.splice(1).join(' ')
        if (!message.guild.roles.find(r => r.name == role)) return message.channel.send('That role was not found in this server! Sorry!')
        if (givemeList.indexOf(role)>-1) return message.channel.send('That role is already in the list!')
        if (list == "none") {
            bot.setSetting('giveme', role, message);
        } else {
            list += `|${role}`
            bot.setSetting('giveme', list, message);
        }
        return message.channel.send(`Added the \`${role}\` to the giveme list!`);
    } else if (list == 'none') {
        return message.channel.send('There are no roles to self assign! To add a role, use \`giveme add <role name>\`.')
    } else if (!args[0]) {
        return message.channel.send('Please include a role to self-assign!')
    } else if (args[0] == 'list') {
        str = "";
        for (i=0; i<givemeList.length; i++){
            str += `${givemeList[i]} \n`
        };
        listEmbed = new Discord.RichEmbed()
                .setTitle("Roles avaliable to self assign")
                .setColor("RANDOM")
                .setDescription(str)
                .setFooter("Run !giveme <role name> to self assign any of these roles!")
                .setTimestamp()
        return message.channel.send({embed: listEmbed});
    } else if (args[0] == 'delete') {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("You don't have the perms required to delete roles from the giveme! Sorry!")
        role = args.splice(1).join(' ')
        deleteList = list.split('|');
        if (deleteList.indexOf(role) > -1) {
            deleteList.splice(deleteList.indexOf(role), 1);
            list = deleteList.join('|');
            bot.setSetting('giveme', list, message);
            return message.channel.send(`Removed the \`${role}\` role from the giveme list!`);
        } else {
            return message.channel.send("That role was not found in the list!")
        }
    } else if (args[0] == 'remove') {
        removeRoles = args.splice(1).join(" ").split(', ');
        roles = list.split('|');
        didntHave = 0;
        didntHaveNames = "";
        removed = 0;
        removedNames = "";
        couldnt = 0;
        for (i=0; i<removeRoles.length; i++){
            if (roles.indexOf(removeRoles[i])>-1){
                if (!message.member.roles.find(r => r.name == removeRoles[i])) {
                    didntHave += 1;
                    didntHaveNames += `${removeRoles[i]}\n`
                } else {
                    message.member.removeRole(message.guild.roles.find(r => r.name == removeRoles[i]))
                    removed += 1;
                    removedNames += `${removeRoles[i]}\n`
                }
            } else {
                couldnt += 1;
            }
        }
        removeEmbed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTimestamp()
        if (removed > 0) removeEmbed.addField(`Removed ${removed} roles!`, removedNames);
        if (didntHave >0) removeEmbed.addField(`You didn't have ${didntHave} roles!`, didntHaveNames);
        if (couldnt > 0) removeEmbed.addField(`Couldn't remove ${couldnt} roles!`, 'The roles requested either don\'t exist or aren\'t part of the roles able to be removed with the bot. To show a list of the roles able to be removed, run \`!giveme list\`');
        return message.channel.send({embed: removeEmbed});
    } else {
        addRoles = args.join(" ").split(', ');
        roles = list.split('|');
        alreadyHad = 0;
        alreadyHadNames = "";
        added = 0;
        addedNames = "";
        couldnt = 0;
        for (i=0; i<addRoles.length; i++){
            if (roles.indexOf(addRoles[i])>-1) {
                //checks if its in the role list
                if (!message.guild.roles.find(r => r.name == addRoles[i])){
                    //checks if the role exists
                    couldnt += 1;
                } else if (message.guild.roles.find(r => r.name == addRoles[i]).comparePositionTo(message.guild.me.highestRole) < 0){
                    //checks if its above the bots highest role 
                    if (message.member.roles.find(r => r.name == addRoles[i])) {
                        //checks if they have it
                        alreadyHad += 1;
                        alreadyHadNames += `${addRoles[i]}\n`
                    } else {
                        message.member.addRole(message.guild.roles.find(r => r.name == addRoles[i]))
                        added += 1;
                        addedNames += `${addRoles[i]}\n`
                    }
                } else {
                    //if its above the bots highest role
                    couldnt += 1;
                }
            } else {
                //if it isnt in the role list
                couldnt += 1;
            }
        }
        addEmbed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTimestamp()
        if (added > 0) addEmbed.addField(`Added ${added} roles!`, addedNames);
        if (alreadyHad >0) addEmbed.addField(`You already had ${alreadyHad} roles!`, alreadyHadNames);
        if (couldnt > 0) addEmbed.addField(`Couldn't add ${couldnt} roles!`, 'The roles requested either don\'t exist, aren\'t part of the roles able to be added with the bot, or I don\'t have adequate perms. To show a list of the roles able to be added, run \`!giveme list\`');
        return message.channel.send({embed: addEmbed});
    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['gibme', 'optin'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'giveme',
	description: 'Self assigns a role, run giveme list to see a set of roles avaliable',
	usage: 'giveme <role name>'
};