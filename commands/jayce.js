exports.run = (bot, message, args, level) => {
        message.guild.members.get("226999841358610432").setNickname("Jax/Jayce");
        message.delete();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['jax'],
    permLevel: 0
};

exports.help = {
    name: 'jayce',
    description:  'Changes Jayces nickname back to Jax/Jayce',
    usage: 'jayce'
};