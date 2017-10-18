const child_process = require('child_process');
const Discord = require("discord.js");
exports.run = (bot, message, args) => {
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var updateEmbed = new Discord.RichEmbed()
        .setColor([r, g, b])
        .setDescription("Updating...")
        .setTimestamp()
        .setFooter('UPDATE')
    message.channel.send({embed: updateEmbed}).then(e => {
        var update = child_process.execSync('git pull origin').toString();
        if (update.indexOf("Already up-to-date.") > -1) {
            var updateEmbed3 = new Discord.RichEmbed()
                .setColor([r, g, b])
                .setTitle("Updated!")
                .setDescription("There was nothing to update!")
                .setTimestamp()
                .setFooter('Code is up to date!')
            e.edit({embed: updateEmbed3});
        } else {
            var updateEmbed2 = new Discord.RichEmbed()
                .setColor([r, g, b])
                .setTitle("Updated!")
                .setDescription(update)
                .setTimestamp()
                .setFooter(`Took ${e.createdTimestamp - message.createdTimestamp} ms to update!`)
            e.edit({embed: updateEmbed2});
        }
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['upd', 'Update', 'upd8'],
    botPerms: [],
    memberPerms: []
};

exports.help = {
    name: 'update',
    usage: 'update',
    description: 'Pulls new changes from Github and restarts.'
};
