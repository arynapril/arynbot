exports.run = (bot, message, args, level) => {
    var bodypart = Array("ankle", "arch", "arm", "armpit", "beard", "calf", "cheek", "chest", "chin", "earlobe", "elbow", "eyebrow", "eyelash", "eyelid", "face", "finger", "forearm", "forehead", "feet", "legs", "gum", "heel", "hip", "index finger", "jaw", "knee", "knuckle", "leg", "lip", "mouth", "mustache");
    var ingverb = Array("learning", "thinking", "running", "jogging", "sitting", "walking", "eating", "gardening", "building", "flying", "jumping", "ending", "examining", "stacking", "gaming", "spelling", "collecting", "coloring", "playing");
    var noun = Array("table", "truck", "house", "book", "pencil", "envy", "love", "city", "boots", "lion", "mother", "wolf", "continent", "zoo", "head", "park", "airship", "field", "workshop", "Minute Maid Park");
    var pastverb = Array("cost", "paid", "chose", "built", "began", " dug", "ate", "fell", "fought", "found", "went", "heard", "help", "hurt", "lost", "read", "died", "ran", "slept");
    var adj = Array("salty", "hot", "warm", "moist", "smelly", "stupid", "depressed", "blue", "soft", "cute", "furry", "sleepy");
    if (!message.mentions.users.array()[0]) {
        person = "girl";
    } else {
        x = message.mentions.users.array()[0];
        person = `**${x.username}**`;

    };
    i = Math.floor(Math.random()*3);
    if (i==0) {
        message.channel.send(`Hey ${person}, your ${bodypart[Math.floor(Math.random()*bodypart.length)]} must be real tired, because you've been ${ingverb[Math.floor(Math.random()*ingverb.length)]} through my ${noun[Math.floor(Math.random()*noun.length)]} all night long.`)
    } else if (i==1) {
        message.channel.send(`Hey ${person}, is it ${adj[Math.floor(Math.random()*adj.length)]} in here, or is it just you?`)
    } else if (i==2) {
        message.channel.send(`Hey ${person}, do you have a Band-Aid? Because I skinned my ${bodypart[Math.floor(Math.random()*bodypart.length)]} when I ${pastverb[Math.floor(Math.random()*pastverb.length)]} for you.`)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'pickupline',
    description: 'Generates a random, nonsensical pickup line.',
    usage: 'pickupline <@person being flirted with [optional]>'
};