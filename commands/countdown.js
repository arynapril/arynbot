exports.run = (bot, message, args, level) => {
    var d1 = new Date("2019-01-05T10:00:00.000-05:00");
    var d2 = new Date();
    var t1 = d1.getTime();
    var t2 = d2.getTime();
    var time = t1 - t2;
    var years = parseInt(time / 31536000000);
    var totalDays = parseInt(time / 86400000);
    var days = parseInt((time - (years * 31536000000)) / 86400000);
    var totalHours = parseInt(time / 3600000);
    var hours = parseInt((time - (totalDays * 86400000)) / 3600000);
    var totalMinutes = parseInt(time / 60000);
    var minutes = parseInt((time - (totalHours * 3600000)) / 60000);
    var seconds = parseInt((time - (totalMinutes * 60000)) / 1000);
    message.channel.send('**' + years + ' years, ' + days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds** until kickoff!');
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kickoff'],
    botPerms: [],
    memberPerms: []
};
exports.help = {
    name: 'countdown',
    description: 'Panic! at the Workshop',
    usage: 'countdown (screaming optional)'
};