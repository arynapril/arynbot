module.exports = (bot, member) => {
    member.guild.defaultChannel.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
};