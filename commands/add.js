const sql = require("sqlite");
sql.open("./quotes.sqlite");

exports.run = (bot, message, args) => {
if (message.channel.type === "dm") return;

let person = args[0];
let phrase = args.slice(1).join(" ");

sql.get(`SELECT * FROM quotes WHERE userId = "${person}"`)
.then (row => {

  if (!row) {
    sql.run("INSERT INTO quotes (userId, quote) VALUES (?, ?)", [person, phrase]);
  } else {
    let oldQuote = row.quote;
    let seperator = 'xxxxx';
    let newQuote = row.quote + seperator + phrase;
    sql.run(`UPDATE quotes SET quote = ${newQuote} WHERE userId = "${person}"`);
    console.log(row.quote, oldQuote, phrase);
  }

}).catch(() => {

  console.error;
    sql.run("CREATE TABLE IF NOT EXISTS quotes (userId TEXT, quote TEXT)").then(() => {
    sql.run("INSERT INTO quotes (userId, quote) VALUES (?, ?)", [person, phrase]);
  });

});

message.channel.send(`Quote was successfully recorded! **${person}**: ${phrase}`);
};
