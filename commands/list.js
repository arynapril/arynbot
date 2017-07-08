exports.run = (bot, message, args, level) => {
  const sql = require("sqlite");
  sql.open("./quotes.sqlite");
  if (message.channel.type === "dm") return;
  let person = args[0];
    
  sql.get(`SELECT * FROM quotes WHERE userId = "${person}"`)
  .then (row => {

    if (!row) {
      message.channel.send(`${person} doesn't have any quotes! <3`); 
    } else {
    //sql.run(`UPDATE quotes SET quotes = ${row.quotes + "xxxxx" + phrase} WHERE userId = "${person}"`);
    message.channel.send(`${row.quote}`);
  }
})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['listquotes'],
    permLevel: 0
};

exports.help = {
    name: 'list',
    description:  'Lists all of someones quotes',
    usage: 'list @[person whose list you want to see]'
};