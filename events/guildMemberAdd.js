module.exports = (bot, member) => {
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
    if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    var logs = member.guild.channels.find('name', 'logs');
    if (member.guild.id == '317696745683550208') {
        logs = member.guild.channels.find('name', 'general');
    }
    if (!logs) return;
    logs.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
};