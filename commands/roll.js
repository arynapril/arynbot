exports.run = (bot, message, args) => {
    if (args == ""){
        var roll = Math.floor(Math.random() * 6) +1;
        message.reply("You rolled a **" + roll + "**!");
    } 
    if (args > 9999){
        message.reply("Choose a lower number! :stuck_out_tongue_winking_eye: ")
    }
    else {
        var roll = Math.floor(Math.random() * args) +1;
        message.reply("You rolled a **" + roll + "**!");
    }
    //var roll = Math.floor(Math.random() * side) +1;
    

}