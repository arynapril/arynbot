module.exports = async(bot, member) => {
    bot.log("log", `${member.guild.name} lost a member - ${member.user.username} (${member.id})`, 'MEMBR');
    enabled = await bot.getSetting('welcomeMessagesEnabled', member.guild);
    if (enabled == '0') return;
    setting = await bot.getSetting('welcomeMessagesChannel', member.guild);
    welcome = member.guild.channels.find('name', setting);
    if (!welcome) return;
    welcome.send(`${member.user.username} has left the server! :cry:`);
};