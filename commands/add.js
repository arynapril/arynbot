exports.run = (bot, message, args, level) => {

const sql = require("sqlite");
sql.open("./quotes.sqlite");

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

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addquote'],
    permLevel: 0
};

exports.help = {
    name: 'add',
    description:  'Adds a quote to someones quote list!',
    usage: 'add @[person being quoted] [quote]'
};