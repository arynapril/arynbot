module.exports = (bot, member) => {
    var logs = member.guild.channels.find('name', 'logs');
    if (member.guild.id == '317696745683550208') {
        logs = member.guild.channels.find('name', 'general');
    }
    if (!logs) return;
    logs.send(`${member.user.username} has left the server! :cry:`);
    bot.log("log", `${member.guild.name} lost a member - ${member.user.username} (${member.id})`, 'MEMBR');
};