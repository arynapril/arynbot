exports.run = (bot, message, args, level) => {
    sloths = Array('https://static.boredpanda.com/blog/wp-content/uploads/2016/10/Cute-sloths-320-580885a0d0510__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/cute-sloths-101-5807684db1058__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/cute-sloths-57f269182f5ab__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6c174f6e8__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6c0285399__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/cute-sloths-57f26c021e81c__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6a85754a3__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6f1dc9b66__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/Cute-sloths-319-5808848577a9b__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6c1bcf423__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/Cute-sloths-314-580874913a3d1__700.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/cute-sloths-57ee6c077b1d2__700.jpg')
    message.channel.send(sloths[Math.floor(Math.random()*sloths.length)]);  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'sloth',
    description: 'summons a sloth',
    usage: 'sloth'
};