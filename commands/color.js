exports.run = (bot, message, args, level) => {
	const Discord = require('discord.js');
	var color = new Discord.RichEmbed()
		.setColor('RANDOM')
	if ((typeof args[0] === "string") && args[0].length === 6 && !isNaN(parseInt(args[0], 16))) {
		hexColor = args[0].toLowerCase();
		var hex = parseInt(args[0], 16);
		var r = (hex >> 16) & 255;
		var g = (hex >> 8) & 255;
		var b = hex & 255;
		rgb = r + ", " + g + ", " + b;
		color.setColor(hexColor)
		//if its a hex code, set the color stuff to that
	} else if (!args[0]) {
		hexColor = parseInt(color.color).toString(16).toLowerCase();
		var hex = parseInt(color.color, 16);
		var r = (hex >> 16) & 255;
		var g = (hex >> 8) & 255;
		var b = hex & 255;
		rgb = r + ", " + g + ", " + b;
		//processes the random color assigned
	} else { //if theres not a valid hex input OR no input
		message.channel.send('Invalid input! Run the command with no arguements for a random color, or a valid hex code (without the # at the front!')
	}
	color.addField('Hex', `#${hexColor}`)
		.addField('RGB', rgb)
		.addField('Decimal', color.color)
		.addField('More Information', `[Here](http://www.colorhexa.com/${hexColor})`)
		.setThumbnail(`http://www.colorhexa.com/${hexColor}.png`)
	message.channel.send({
		embed: color
	})
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['colour'],
	botPerms: [],
	memberPerms: []
};

exports.help = {
	name: 'color',
	description: 'shows color information/generates a random color',
	usage: 'color <optional hex (------)>'
};
