const Discord = require("discord.js");
const fs = require("fs");
const UserFunction = require("../Scripts/Fonctions/User.js");

module.exports.run = async (bot, message, args, User) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID || !message.member.hasPermission("BAN_MEMBERS")) {
    
        if (args[0] != null) {

            var MuteUser = UserFunction.FindUser(args[0].slice(3).slice(0,-1));
            
            if (MuteUser == User) {
    
                message.delete();
                message.author.send("Vous ne pouvez pas vous unmute `VOUS MEME` ou `EVERYONE`");
                return;
    
            }

            if (MuteUser.id == message.guild.ownerID && User.id != message.guild.ownerID) {
    
                message.delete();
                message.author.send("Vous ne pouvez pas unmute cette personne il s'agit du `PROPRIETAIRE DU SERVEUR 👑 !!`");
                return;
    
            }
    
            MuteUser.mute = false;
            UserFunction.UdpateUser(MuteUser,MuteUser.name,MuteUser.id);
    
            var reason = "";
            if (args[1] != null) {
    
                for (let i = 1;i < args.length;i++) reason += args[i] + " ";
    
            } else {
    
                reason = "`AUCUNE RAISON DEFINIE !!`"
    
            }
    
            message.guild.members.cache.get(MuteUser.id).send("Vous avez était unmute\nraison : " + reason)

    
            message.author.send("La mute a bien était `AFFECTER ✅`\n\nVous avez unmute **" + MuteUser.name + "**\n\n`RAISON AFFECTER :` " + reason);
    
        } else {
    
            message.delete();
            message.author.send("Vous n'avez pas `PRECISEZ UN UTILISATEUR !!`");
    
        }

    } else {

        message.delete();
        message.author.send("VOUS N'AVEZ PAS LES `PERMISSIONS POUR UTILISER CETTE COMMANDE ❌`");

    }

}

module.exports.help = {

    name: "unmute"

}