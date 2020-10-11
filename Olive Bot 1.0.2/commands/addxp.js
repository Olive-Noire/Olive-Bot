const Discord = require("discord.js");
const UserFunction = require("../Scripts/Fonctions/User.js");

module.exports.run = async (bot, message, args) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID) {

        if (args[0] != null) {

            try {
        
                var AddUser = UserFunction.FindUser(args[0].slice(3).slice(0,-1));
    
            } catch (err) {
    
                message.delete();
                message.author.send("Ce membre `N'EXISTE PAS ❌`");
    
            }

            if (args[1] != null) {
    
                var quantity = parseInt(args[1]);
    
                if (quantity < 1) {
                
                    message.author.send("Cette Quantité est `INCORRECTE ❌`");
                    return;
        
                }
    
                AddUser.xp += quantity;
                UserFunction.UdpateUser(AddUser,AddUser.name,AddUser.id);
    
                message.author.send("La transaction à `REUSSIE ✅`");

        
            } else {
        
                message.delete();
                message.author.send("Vous n'avez pas choisit de `QUANTITE D'XP`\nSYNTAXE : `-addxp <membre> <quantité> ❌`");
        
            }

        } else {

            message.delete();
            message.author.send("Vous n'avez pas choisit de `MEMBRE DU SERVEUR`\nSYNTAXE : `-addxp <membre> <quantité> ❌`");

        }

    } else {

        message.delete();
        message.author.send("VOUS N'AVEZ PAS LES `PERMISSIONS POUR UTILISER CETTE COMMANDE ❌`");

    }

}

module.exports.help = {

    name: "addxp"
}