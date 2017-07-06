const sql = require("sqlite");
sql.open("./quotes.sqlite");

exports.run = (bot, message, args) => {
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