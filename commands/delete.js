exports.run = (bot, message, args, level) => {

const sql = require("sqlite");
sql.open("./quotes.sqlite");

if (message.channel.type === "dm") return;

let person = args[0];

sql.run("DELETE FROM quotes WHERE userId = ?", [person]);
message.channel.send(`Quotes successfully deleted!`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dlt', 'deletequote'],
    permLevel: 2
};

exports.help = {
    name: 'delete',
    description:  'Deletes all of a persons quotes from their quote list',
    usage: 'delete @[person whose list you want to delete]'
};