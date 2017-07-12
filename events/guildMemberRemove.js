module.exports = (bot, member) => {
    member.guild.defaultChannel.send(`${member.user.username} has left the server! :cry:`);
    bot.log("log", `${member.guild.name} lost a member - ${member.user.username} (${member.id})`);
};