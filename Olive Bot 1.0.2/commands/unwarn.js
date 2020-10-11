const Discord = require("discord.js");
const fs = require("fs");
const UserFunction = require("../Scripts/Fonctions/User.js");

module.exports.run = async (bot, message, args, User) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID) {
    
        if (args[0] != null) {

            var WarnUser = UserFunction.FindUser(args[0].slice(3).slice(0,-1));
            
            if (WarnUser == User) {
    
                message.author.send("Vous ne pouvez pas vous unwarn `VOUS MEME` ou `EVERYONE`");
                return;
    
            }
    
            WarnUser.warn--;
            UserFunction.UdpateUser(WarnUser,WarnUser.name,WarnUser.id);
    
            var reason = "";
            if (args[1] != null) {
    
                for (let i = 1;i < args.length;i++) reason += args[i] + " ";
    
            } else {
    
                reason = "`AUCUNE RAISON DEFINIE !!`"
    
            }
    
            message.guild.members.cache.get(WarnUser.id).send("Vous avez était unwarn\nraison : " + reason + "\n\nvous êtes à présent à " + WarnUser.warn + " warn(s) `CONTINUEZ DE FAIRE DE BONNES ACTIONS POUR VOUS FAIRE PARDONNER 😉✅ !!`")
    
            message.author.send("La unwarn a bien était `AFFECTER ✅`\n\nVous avez unwarn **" + WarnUser.name + "** il est à présent à " + WarnUser.warn + " warns\n\n`RAISON AFFECTER :` " + reason);
    
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

    name: "unwarn"

}