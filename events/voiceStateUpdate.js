module.exports = (bot, oldMember, newMember) => {
    let role = newMember.guild.roles.find("name", 'voice');
    if (newMember.voiceChannel) {
        newMember.addRole(role);
    } else {
        newMember.removeRole(role);
    };
};