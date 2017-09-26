module.exports = async (bot, member) => {
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
    enabled = await bot.getSetting('welcomeMessagesEnabled', member.guild);
    if (enabled == '0')
    chan = await bot.getSetting('welcomeMessagesChannel', member.guild);
    welcome = member.guild.channels.find('name', chan);
    if (!welcome) return;
    welcome.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
};