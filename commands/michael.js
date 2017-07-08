exports.run = (bot, message, args, level) => {
        message.guild.members.get("243174457336791041").setNickname("Michael");
        message.delete();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'michael',
    description:  'Changes Michaels nickname back to Michael',
    usage: 'michael'
};