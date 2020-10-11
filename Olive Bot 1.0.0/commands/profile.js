const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args, User) =>{

    var ColorId = Math.floor(Math.random() * 6);
    var Color = "#000000";

    if (ColorId == 0) Color = "#FF0000";
    if (ColorId == 1) Color = "#00FF00";
    if (ColorId == 2) Color = "#0000FF";
    if (ColorId == 3) Color = "#FFFF00";
    if (ColorId == 4) Color = "#FF00FF";
    if (ColorId == 5) Color = "#00FFFF";

    let grade = "";
    if (message.author.id == message.guild.ownerID) grade = " (👑)";

    let roles = "";

    if (args[0] == undefined) {

        for(let i = 0;i < message.member.roles.cache.array().length;i++) { 

            if (message.member.roles.cache.array()[i].name != "@everyone") roles += "<@&" + message.member.roles.cache.array()[i].id + "> "; 
        
        }
        
        message.channel.send(CreateProfileEmbed(Color,User.name,grade,message.author.avatarURL(),User.xp,User.level,User.warn,roles,message.guild.name)); 
    
    } else {

        var ProfileUser;

        try {
        
            ProfileUser = FindUser(args[0].slice(3).slice(0,-1));

        } catch (err) {

            message.delete();
            message.author.send("Ce membre `N'EXISTE PAS` ❌");
            return;

        }

        for(let i = 0;i < message.guild.members.cache.get(ProfileUser.id).roles.cache.array().length;i++) { 
            
            if (message.guild.members.cache.get(ProfileUser.id).roles.cache.array()[i].name != "@everyone") roles += "<@&" + message.guild.members.cache.get(ProfileUser.id).roles.cache.array()[i].id + "> "; 
        
        }

        message.channel.send(CreateProfileEmbed(Color,ProfileUser.name,grade,message.guild.members.cache.get(ProfileUser.id).user.avatarURL(),ProfileUser.xp,ProfileUser.level,ProfileUser.warn,roles,message.guild.name,ProfileUser.mute))

    }


}

module.exports.help = {

    name: "profile"
}

function CreateProfileEmbed(color,name,grade,image,xp,level,warn,roles,guildName,mute) {

    if (xp == undefined) xp = "Valeur non `TROUVER ❌ !!`";
    if (level == undefined) level = "Valeur non `TROUVER ❌ !!`";
    if (warn == undefined) warn = "Valeur non `TROUVER ❌ !!`";
    if (roles == undefined) roles = "Valeur non `TROUVER ❌ !!`";
    if (roles == "") roles = "`CET UTILISATEUR NE POSSEDE AUCUN ROLE !!`";
    if (name == undefined) name = "Valeur non `TROUVER ❌ !!`";
    if (guildName == undefined) guildName = "⚠ Nom du Serveur non `TROUVER ❌ !!` ⚠";
    if (color == undefined) color = "#FFFFFF";
    if (grade == undefined) grade = "";
    if (image == undefined) image = "https://www.labaleine.fr/sites/default/files/image-not-found.jpg";

    var progressionBar = "";
    if (xp != undefined || xp != "Valeur non `TROUVER ❌ !!`") {

        var remplissage = "";
        for (let i = 0;i < Math.ceil(xp / 10);i++) {
            
            if (xp.toString().endsWith("5") && i < (Math.ceil(xp / 10) - 1)) remplissage += "█";
            if (xp.toString().endsWith("5") && i == (Math.ceil(xp / 10) - 1)) remplissage += "⬢";

        }


        var vide = "";
        for (let i = 0;i < (10 - Math.ceil(xp / 10));i++) remplissage += "●";
        progressionBar = (remplissage + vide);
        console.log(xp.toString().endsWith("5"));
        console.log(xp)
        console.log("voici la progress bar : " + progressionBar);

    }

    if (level === 50) {

        level = "`MAX 👑 (50)`"

    }

    if (mute) name += " `(🤐 MUTE !!)`";

    let PlayerEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Voici votre Progression sur le serveur :")
        .setDescription("Carte de **" + name + grade + "**")
        .setImage(image)

        .addFields(

            {name: "**XP Total :**", value: xp + "/100\n\n[ -   " + progressionBar + "   - ]" ,inline: false},
            {name: "**Level(s) :**", value: level ,inline: false},
            {name: "**Warn(s) :**", value: warn ,inline: false},
            {name: "**Role(s) :**", value: roles ,inline: false},

        )

        .setFooter(guildName + " Serv.")
    return PlayerEmbed;

}

function FindUser(id) { return require("../Donnees/Utilisateurs/" + id + ".json"); };