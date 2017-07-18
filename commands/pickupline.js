exports.run = (bot, message, args, level) => {
const MarkovChain = require('markovchain');
const fs = require('fs');
const pickuplines = new MarkovChain(fs.readFileSync('./pickuplines.txt', 'utf8'));
message.channel.send(`${pickuplines.start("Hey").end("Zach").process()}`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'pickupline',
    category: 'Fun',
    description: 'Generates a random, nonsensical pickup line.',
    usage: 'pickupline <@person being flirted with [optional]>'
};