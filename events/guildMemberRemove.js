module.exports = (bot, member) => {
    bot.log("log", `${member.guild.name} lost a member - ${member.user.username} (${member.id})`, 'MEMBR');
    bot.getSetting('welcomeMessagesEnabled', member.guild).then(enabled => {
        if (enabled == '0') return;
        bot.getSetting('welcomeMessagesChannel', member.guild).then(setting => {
            welcome = member.guild.channels.find('name', setting);
            if (!welcome) return;
            welcome.send(`${member.user.username} has left the server! :cry:`);
        })
    })
};