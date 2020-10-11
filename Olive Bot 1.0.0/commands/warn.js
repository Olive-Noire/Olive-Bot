const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, User) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID || !message.member.hasPermission("BAN_MEMBERS")) {
    
        if (args[0] != null) {

            var WarnUser = FindUser(args[0].slice(3).slice(0,-1));
            
            if (WarnUser == User) {
    
                message.delete();
                message.author.send("Vous ne pouvez pas vous warn `VOUS MEME` ou `EVERYONE`");
                return;
    
            }

            if (WarnUser.id == message.guild.ownerID) {
    
                message.delete();
                message.author.send("Vous ne pouvez pas warn cette personne il s'agit du `PROPRIETAIRE DU SERVEUR 👑 !!`");
                return;
    
            }
    
            WarnUser.warn++;
            UdpateUser(WarnUser,WarnUser.name,WarnUser.id);
    
            var reason = "";
            if (args[1] != null) {
    
                for (let i = 1;i < args.length;i++) reason += args[i] + " ";
    
            } else {
    
                reason = "`AUCUNE RAISON DEFINIE !!`"
    
            }
    
            if (WarnUser.warn < 3) message.guild.members.cache.get(WarnUser.id).send("Vous avez était warn\nraison : " + reason + "\n\nvous êtes à présent à " + WarnUser.warn + " warn(s) `⚠ FAITES ATTENTION !!`")
    
            if (WarnUser.warn == 3 || WarnUser.warn == 6) {
            
                if (!message.guild.members.cache.get(WarnUser.id).roles.cache.has("admin")) {

                    message.guild.members.cache.get(WarnUser.id).user.send("Vous avez était warn\nraison : " + reason + "\n\nvous êtes à présent à " + WarnUser.warn + " warn(s) `⚠ FAITES ATTENTION !!`");
                    var saveOfUser = {

                        name: WarnUser.name,
                        id: WarnUser.id,
                        xp: WarnUser.xp,
                        level: WarnUser.level,
                        warn: WarnUser.warn,
                        mute: WarnUser.mute,
                        save:WarnUser.save,

                    }
                    message.guild.members.cache.get(WarnUser.id).kick();
                    AddUser(saveOfUser.name,saveOfUser.id,saveOfUser.xp,saveOfUser.level,saveOfUser.warn);
                    message.author.send("L'utilisateur " + saveOfUser.name + " à était kick !!");
    
                }
        
            }

            if (WarnUser.warn >= 9) {

                if (!message.guild.members.cache.get(WarnUser.id).roles.cache.has("admin")) {

                    message.author.send("L'utilisateur " + WarnUser.name + " à était ban !!");
                    message.guild.members.cache.get(WarnUser.id).user.send("Vous avez était ban\nraison : " + reason + "\n\nvous êtes à présent à " + WarnUser.warn + " warn(s) `⚠ JE T'AVAIS PREVENU(S) 💔😡 !!`");
                    message.guild.members.cache.get(WarnUser.id).ban({reason: reason});

                }

            }
    
            message.author.send("La warn a bien était `AFFECTER ✅`\n\nVous avez warn **" + WarnUser.name + "** il est à présent à " + WarnUser.warn + " warns\n\n`RAISON AFFECTER :` " + reason);
    
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

    name: "warn"

}

function FindUser(id) { return require("../Donnees/Utilisateurs/" + id + ".json"); };

function UdpateUser(User,name,id) {

    let UserUpdapted = {

        name: name,
        id: User.id,
        xp: User.xp,
        level: User.level,
        warn:User.warn,
        mute:User.mute,
        save:User.save,

    }

    fs.writeFileSync("./Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(UserUpdapted));

};

function AddUser(name,id,xp,level,warn,mute,save) {

    let user = { 

        name: name, 
        id: id,
        xp: xp,
        level: level,
        warn: warn,
        mute:mute,
        save:save,

    }; 

    fs.writeFileSync("./Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(user), err => { 

        if (err) throw err;  
           
        console.log("Nouveau Utilisateur enregistrer !");

    });

}