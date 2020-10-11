const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args,User) => {

    //Level
;
    if (User.xp > 100 && User.level < 50) {
        
        User.level++;
        User.xp = 0;
        console.log(User.name);
        UdpateUser(User,message.author.name,User.id);
        console.log(User.name);
        message.author.send("**Bravo** 🎉 Vous êtes passer niveau : " + User.level);
        if (User.level === 50) {
            
            message.author.send("Vous avez atteint le niveau `MAX 👑 (50)` !!");
            message.member.roles.add(message.guild.roles.cache.find(AddRole => AddRole.name === "membre v.i.p"));
            message.member.roles.remove(message.guild.roles.cache.find(RemoveRole => RemoveRole.name === "ancien"));

        }

        if (User.level === 30) {
            
            message.author.send("Vous avez atteint le niveau " + User.level + " vous obtenez le role ancien !!");
            message.member.roles.add(message.guild.roles.cache.find(AddRole => AddRole.name === "ancien"));
            message.member.roles.remove(message.guild.roles.cache.find(RemoveRole => RemoveRole.name === "pro"));

        }

        if (User.level === 20) {
            
            message.author.send("Vous avez atteint le niveau " + User.level + " vous obtenez le role pro !!");
            message.member.roles.add(message.guild.roles.cache.find(AddRole => AddRole.name === "pro"));
            message.member.roles.remove(message.guild.roles.cache.find(RemoveRole => RemoveRole.name === "rookie"));

        }

        if (User.level === 10) {
            
            message.author.send("Vous avez atteint le niveau " + User.level + " vous obtenez le role rookie !!");
            message.member.roles.add(message.guild.roles.cache.find(AddRole => AddRole.name === "rookie"));
            message.member.roles.remove(message.guild.roles.cache.find(RemoveRole => RemoveRole.name === "membre"));

        }

        if (User.level === 5) {
            
            message.author.send("Vous avez atteint le niveau " + User.level + " vous obtenez le role membre !!");
            message.member.roles.add(message.guild.roles.cache.find(AddRole => AddRole.name === "membre"));
            message.member.roles.remove(message.guild.roles.cache.find(RemoveRole => RemoveRole.name === "nouveau"));

        }

    } else if (User.level == 50) {

        User.xp = 100;

    }

}

function UdpateUser(User,name,id) {

    let UserUpdapted = {

        name: name,
        id: User.id,
        xp: User.xp,
        level: User.level,
        warn: User.warn,
        mute:User.mute,
        save:User.save

    }

    fs.writeFileSync("./Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(UserUpdapted));

}