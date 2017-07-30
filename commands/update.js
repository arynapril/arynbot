const child_process = require('child_process');
exports.run = (bot, message, args) => {
    message.channel.send("Updating...").then(e => {
        var update = child_process.execSync('git pull origin');
        e.edit("```" + update + "```");
        if (update.indexOf("Already up-to-date.") > -1) {
            e.edit("There was nothing to update!");
        } else {
            process.exit();
            e.channel.send("New code successfully pulled!\nRestarting...");
        }
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['upd', 'Update', 'upd8'],
    permLevel: 10
};

exports.help = {
    name: 'update',
    usage: 'update',
    description: 'Pulls new changes from Github and restarts.'
};
