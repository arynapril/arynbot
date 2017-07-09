module.exports = (bot) => {
    bot.permLevel = message => {
        let permlvl = 0;
        if(message.author.id === bot.config.owner) return 10;
        if (!message.guild || !message.member) return 0;
        try {
            let modRole = message.guild.roles.find('name', bot.config.modRoleName);
            if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
        } catch (e) {
            console.warn("modRoleName not found. Skipping Mod (level 2) check"); 
        }
        try {
            let adminRole = message.guild.roles.find('name', bot.config.adminRoleName);
            if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
        } catch (e) {
            console.warn("adminRoleName not found. Skipping Admin (level 3) check");
        }
        if(message.author.id === message.guild.owner.id) permlvl = 4;
        return permlvl;
    };
    bot.log = (type, msg, title) => {
        if(!title) title = "LOG";
        console.log(`${type} | ${title} | ${msg}`);
    };
    bot.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m=>m.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            return collected.first().content;
        } catch(e) {
            return false;
        }
    };
    bot.clean = async (bot, text) => {
      if (text && text.constructor.name == 'Promise')
        text = await text;
      if (typeof evaled !== 'string')
        text = require('util').inspect(text, {depth: 0});
    
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(bot.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
    
    return text;
  };
    global.wait = require('util').promisify(setTimeout);
    global.range = (count, start = 0) => {
        const myArr = [];
        for (var i = 0; i<count; i++) {
            myArr[i] = i+start;
        }
        return myArr;
    };
    process.on('uncaughtException', (err) => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });
};