const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{

    message.delete();
    message.channel.send("salut **" + message.author.username + "** !");

}

module.exports.help = {

    name: "salut"

}