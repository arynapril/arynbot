const child_process = require('child_process');
exports.run = (bot, msg, args) => {
    if(msg.author.id != require('../config.json').ownerID) return msg.reply("you are not allowed to do this!") 
        msg.channel.send("Updating...").then(e => {
            var update = child_process.execSync('git pull origin').toString()
            e.channel.send("```" + update + "```")
            if (update.indexOf("Already up-to-date.") > -1) {
                e.channel.send("There was nothing to update!");
            } else {
                e.channel.send("New code successfully pulled!\nRestarting...")
                process.exit();
            }
        })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['upd', 'Update'],
    permLevel: 0
};

exports.help = {
    name: 'update',
    usage: 'update',
    description: 'Pulls new changes from Github and restarts.'
};
