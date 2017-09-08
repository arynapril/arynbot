module.exports = (bot, member) => {
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
    bot.getSetting('welcomeMessagesEnabled', member.guild).then(enabled => {
        if (enabled == '0') return;
        bot.getSetting('welcomeMessagesChannel', member.guild).then(setting => {
            welcome = member.guild.channels.find('name', setting);
            welcome.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
        })
    })
};