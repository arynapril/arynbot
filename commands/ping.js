exports.run = async (bot, message, args, level) => {
	const p = Math.round(bot.ws.ping);
	const m = await message.channel.send("Ping?");
	m.edit(`Pong! I took ${m.createdTimestamp - message.createdTimestamp} milliseconds to respond! Heartbeat is ${p} milliseconds!`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pinh'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'ping',
	description: 'Simple test to see if I am responding!',
	usage: 'ping'
};
