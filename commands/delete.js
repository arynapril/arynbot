const sql = require("sqlite");
sql.open("./quotes.sqlite");

exports.run = (bot, message, args) => {
if (message.channel.type === "dm") return;

let person = args[0];

sql.run("DELETE FROM quotes WHERE userId = ?", [person]);
message.channel.send(`Quotes successfully deleted!`);
}