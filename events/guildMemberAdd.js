module.exports = (bot, member) => {
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
    var logs = member.guild.channels.find('name', 'logs');
    if (member.guild.id == '317696745683550208') {
        logs = member.guild.channels.find('name', 'general');
    }
    if (!logs) return;
    if (!bot.user.hasPermission("SEND_MESSAGES")) return;
    logs.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
};