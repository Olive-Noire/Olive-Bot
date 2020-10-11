const Discord = require("discord.js");

module.exports.run = async (bot, message, args, User) =>{

    message.channel.send("**" + User.name + "** : " + User.xp);

}

module.exports.help = {

    name: "xp"

}