exports.run = (bot, message, args, level) => {
    var num = parseInt(args[0]);
    num += 1;
	if (!isNaN(num)) {
        message.channel.bulkDelete(num);
        message.channel.send(`${args[0]} messages purged by ${message.author}! :heart:`)
			.then(msg => setTimeout(function() {msg.delete()}, 5000));
	} else {
		message.channel.sendMessage("Please specify a number!");
	}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clear', 'prune'],
    permLevel: 2
};

exports.help = {
    name: 'purge',
    description: 'Mass clearing of messages',
    usage: 'purge <number of messages to be deleted, between 2 and 100>'
};