const Discord = require("discord.js");
const fs = require("fs");
const UserFunction = require("../Scripts/Fonctions/User.js");

module.exports.run = async (bot, message, args, User) =>{

    if (args[0] != null) {

        try {
        
            var GiveUser = UserFunction.FindUser(args[0].slice(3).slice(0,-1));

        } catch (err) {

            message.delete();
            message.author.send("Ce membre `N'EXISTE PAS ❌`");

        }

        if (GiveUser == User) {
            
            message.delete();
            message.author.send("Vous ne pouvez pas vous créditez `VOUS MEME` ou `EVERYONE ❌`");
            return;

        }

        if (args[1] != null) {
    
            var quantity = parseInt(args[1]);

            if (quantity < 1) {
            
                message.author.send("Cette Quantité est `INCORRECTE ❌`");
                return;
    
            }

            if (quantity < User.xp) {

                GiveUser.xp += quantity;
                UserFunction.UdpateUser(GiveUser,GiveUser.name,GiveUser.id);

                User.xp -= quantity;
                UserFunction.UdpateUser(User,User.name,User.id);

                message.author.send("La transaction à `REUSSIE ✅`");

            } else {

                message.delete();
                message.author.send("Cette quantité est `TROP ELEVEE ❌`");

            }
    
        } else {
    
            message.delete();
            message.author.send("Vous n'avez pas choisit de `QUANTITE D'XP`\nSYNTAXE : `-addxp <membre> <quantité> ❌`");
    
        }

    } else {

        message.delete();
        message.author.send("Vous n'avez pas choisit de `MEMBRE DU SERVEUR`\nSYNTAXE : `-addxp <membre> <quantité> ❌`");

    }

}

module.exports.help = {

    name: "givexp"

}
