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
    botPerms: [],
    memberPerms: []
};

exports.help = {
    name: 'pickupline',
    description: 'Generates a random, nonsensical pickup line.',
    usage: 'pickupline <@person being flirted with [optional]>'
};