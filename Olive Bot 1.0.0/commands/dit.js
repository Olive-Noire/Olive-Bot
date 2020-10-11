const Discord = require("discord.js")

module.exports.run = async (bot, message, args, User) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID && !User.mute) {

        message.delete();
        let msg = "";

        for (let i = 0;i < args.length;i++) msg += args[i] + " ";

        message.channel.send(msg);

    } else {

        message.delete();
        message.author.send("VOUS N'AVEZ PAS LES `PERMISSIONS POUR UTILISER CETTE COMMANDE`");

    }

}

module.exports.help = {

    name: "dit"

}