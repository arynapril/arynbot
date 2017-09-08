module.exports = (bot, member) => {
    bot.log("log", `${member.guild.name} got a new member - ${member.user.username} (${member.id})`, 'MEMBR');
   // bot.getSetting('welcomeMessagesEnabled', member.guild).then(setting => {
   //     if(!setting) return;
        //member.guild.channels.get(setting.mentions.channels.array[0].id).send('test');
   // })
    //logs.send(`Hi ${member}! Welcome to ${member.guild.name}! :smile:`);
};