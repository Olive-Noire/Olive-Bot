const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID) {    
    
        if (args[0] != null) {

            try {
        
                var GiveWayUser = message.mentions.members.first();
    
            } catch (err) {
    
                message.delete();
                console.log("VOICI L'ERREUR : ");
                console.error(err);
                message.author.send("Ce membre `N'EXISTE PAS ❌` Ou `VOUS N'AVEZ PAS LA PERMISSION DE DONNER CE ROLE ❌`");
                return;
    
            }

            if (args[1] != null) {

                try {

                    if (message.guild.roles.cache.find(RoleSpecified => RoleSpecified.id === args[1].slice(3).slice(0,-1)) != null) {

                        console.log(args[1].slice(3).slice(0,-1))
                        message.guild.members.cache.get(GiveWayUser.id).roles.add(args[1].slice(3).slice(0,-1));
                        message.guild.channels.cache.find(channel => channel.name === '🎁-giveaway-👑').send("<@" + GiveWayUser.user.id + "> reçu le grade <@&" + args[1].slice(3).slice(0,-1) + "> 🎁🎀 !!!");
                    
                    } else {

                        message.author.send("Ce role va `ETRE CREER ✅😁`");

                        var color;
                        if (args[2] != null) color = args[2]; else color = "#FFFFFF";

                        var reason = "";
                        if (args[3] != null) {
    
                            for (let i = 3;i < args.length;i++) reason += args[i] + " ";
    
                        } else {
    
                            reason = "`AUCUNE RAISON DEFINIE !!`"
    
                        }

                        message.guild.roles.create({
                            data: {
                            name: args[1],
                            color: color,
                            },
                            reason: reason,
                        })
                            .then()
                            .catch(console.error);

                        message.guild.members.cache.get(GiveWayUser.id).roles.add(message.guild.roles.cache.find(GivewayRole => GivewayRole.name === args[1]).id);
                        console.log(message.guild.roles.cache.find(GivewayRole => GivewayRole.name === args[1]).id);
                        console.log(message.guild.members.cache.get(GiveWayUser.id));

                        message.guild.channels.cache.find(channel => channel.name === '🎁-giveaway-👑').send("<@" + GiveWayUser.user.id + "> reçu le grade <@&" + message.guild.roles.cache.find(GivewayRole => GivewayRole.name === args[1]).id + "> 🎁🎀 !!!");

                    }


                } catch (err) {

                }

                

            } else {

                message.delete();
                message.author.send("Vous n'avez pas `PRECISEZ DE ROLE !!`");

            }

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

    name: "giveway"
}