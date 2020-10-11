const Discord = require("discord.js");
const UserFunction = require("../Scripts/Fonctions/User.js");

module.exports.run = async (bot, message, args) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID) {

        if (args[0] != null) {

            try {
        
                var RemoveUser = UserFunction.FindUser(args[0].slice(3).slice(0,-1));
    
            } catch (err) {
    
                message.delete();
                message.author.send("Ce membre `N'EXISTE PAS ❌`");
    
            }

            if (args[1] != null) {
    
                var quantity = parseInt(args[1]);
    
                if (quantity < 1) {
                
                    message.delete();
                    message.author.send("Cette Quantité est `INCORRECTE ❌`");
                    return;
        
                }
    
                if (quantity <= RemoveUser.xp) {

                    RemoveUser.xp -= quantity;
                    UserFunction.UdpateUser(RemoveUser,RemoveUser.name,RemoveUser.id);

                } else {

                    message.delete();
                    message.author.send("Cette quantité est `TROP ELEVEE ❌`");
                    return;

                }
    
                message.author.send("La transaction à `REUSSIE ✅`");

        
            } else {
        
                message.delete();
                message.author.send("Vous n'avez pas choisit de `QUANTITE D'XP`\nSYNTAXE : `-removexp <membre> <quantité> ❌`");
        
            }

        } else {

            message.delete();
            message.author.send("Vous n'avez pas choisit de `MEMBRE DU SERVEUR`\nSYNTAXE : `-removexp <membre> <quantité> ❌`");

        }

    } else {

        message.delete();
        message.author.send("VOUS N'AVEZ PAS LES `PERMISSIONS POUR UTILISER CETTE COMMANDE ❌`");

    }

}

module.exports.help = {

    name: "removexp"
}