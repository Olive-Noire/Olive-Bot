const Discord = require("discord.js");
const fs = require("fs");
const {token, prefix, name, version} = require("./Donnees/config.json");
const bot = new Discord.Client();

bot.login(token);

bot.commands = new Discord.Collection();
bot.ManagementScripts = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);
 
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0){
        console.log("Aucun fichier trouvés !")
        return;
    }

    console.log("\ncommandes  trouvés : \n");

    jsFiles.forEach((f,i) =>{
        var fileGet = require("./commands/" + f);
        console.log(((i + 1) + " - " + f).replace(".js", ""));
        bot.commands.set(fileGet.help.name, fileGet)
    });

});

fs.readdir("./Scripts/Managements/", (err, files) =>{
    if(err) console.log(err);
 
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0){
        console.log("Aucun fichier trouvés !")
        return;
    }

    console.log("\n\nFichier de Management trouvés : \n");

    jsFiles.forEach((f,i) =>{
        var fileGet = require("./Scripts/Managements/" + f);
        console.log(((i + 1) + " - " + f).replace(".js", ""));
        bot.ManagementScripts.set(f,fileGet)
    });

});

bot.on("guildMemberAdd", member =>{

    AddUser(member.user.username,member.user.id,0,0,0,false,false);

    member.roles.add(member.guild.roles.cache.find(MemberRole => MemberRole.name === "nouveau").id);

    const channelWelcome = member.guild.channels.cache.find(channel => channel.name === '🎉-bienvenue-😁');

    const WelcomeEmbed = new Discord.MessageEmbed()

        .setColor("#FF0000")
        .setDescription("Bienvenue dans notre Serveur !!")
        .setImage(member.guild.iconURL())
        .setFooter(member.guild.name + " Serv")

    member.send(WelcomeEmbed)
    member.send("\n●▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬●\n░░░▒▒▒▒▒▓▓▓▒▒▒▒▒░░░\n░╔╦╦╦═╦╗╔═╦═╦══╦═╗░\n░║║║║╩╣╚╣═╣║║║║║╩╣░\n░╚══╩═╩═╩═╩═╩╩╩╩═╝░\n░░░▒▒▒▒▒▓▓▓▒▒▒▒▒░░░\n●▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬●");

    let PhraseDeBienvenues = [];

    PhraseDeBienvenues[0] = ("Bienvenue <@" + member.user.id + "> J'espere que tu passeras un bon moment sur le serveur 😉 !");
    PhraseDeBienvenues[1] = ("Une Nouveau membre est 😛 arriver 😼 ! <@" + member.user.id + "> !")

    bot.channels.cache.get(channelWelcome.id).send(PhraseDeBienvenues[Math.floor(Math.random())]);

    
});

 
bot.on("ready", async () =>{

    console.log("\nle bot : " + bot.user.tag + " est Conecté !\nname : " + name + "\nver- " + version + "\n\n\n");

    bot.user.setActivity("Mangez des Olives (Référence à celui qui a coder le bot 😉) !", {type: "PLAYING"});

    const channelBot = bot.guilds.cache.find(Guild => Guild.name === "akatsuki").channels.cache.find(channel => channel.name === '🤖-info-bot-🤖');
    bot.channels.cache.get(channelBot.id).send("`JE SUIS CONNECTE 🤖✅`");

});

bot.off("debug", async () => {

    const channelBot = bot.guilds.cache.find(Guild => Guild.name === "akatsuki").channels.cache.find(channel => channel.name === '🤖-info-bot-🤖');
    bot.channels.cache.get(channelBot.id).send("`JE SUIS DECONNECTE 🤖❌`");


});
 
bot.on("message", message =>{

    var date = new Date();

    var dateMsg = ([

        date.getDay(),
        date.getMonth(),
        date.getFullYear(),


    ].join("/") + " " + [

        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),

    ].join(":"));


    console.log(message.author.username + " : " + message.content + "\nDate : " + dateMsg + "\nDans le channel : " + message.channel.name + "\n\n");

    try {
        
        var User = FindUser(message.author.id);
        UdpateUser(message.author.username, message.author.id);

    } catch(err) {

        AddUser(message.author.username,message.author.id,0,0,0,false,false);
        var User = FindUser(message.author.id);
        UdpateUser(message.author.username, message.author.id);

    }

    if (User.mute) {
        
        message.delete();
        message.author.send("Vous avez était `MUTE 🤐 !!`");


    }


    fs.readdir("./Scripts/Managements/", (err, files) =>{
        if(err) console.log(err);
     
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
    
        jsFiles.forEach((f,i) =>{
            var fileGet = require("./Scripts/Managements/" + f);
            bot.ManagementScripts.set(message.content, fileGet);

            var messageArray = message.content.split(" ");
            var args = messageArray.slice(1)
            var Managements = bot.ManagementScripts.get(f);
            if(Managements) Managements.run(bot, message, args, User); else console.log("fichier de Management : " + f + "\nNON TROUVER")
            
        });
    
    });


    if(message.author == message.author.bot || message.channel.type === "dm") return;
 
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var args = messageArray.slice(1)
    var commands = bot.commands.get(command.slice(prefix.length));
    if(commands) commands.run(bot, message, args, User);


});


bot.on("guildMemberRemove", member => {

    DeleteUser(member.id);
    const channelWelcome = member.guild.channels.cache.find(channel => channel.name === '🎉-bienvenue-😁');
    bot.channels.cache.get(channelWelcome.id).send("`" +  member.user.username + " Nous à quitter 😥`");


});


function UdpateUser(name,id) {

    User = FindUser(id);

    let UserUpdapted = {

        name: name,
        id: User.id,
        xp: User.xp,
        level: User.level,
        warn: User.warn,
        mute: User.mute,
        save: User.save

    }

    fs.writeFileSync("./Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(UserUpdapted), err => {

        console.log(err);

    });

}

function FindUser(id) { return require("./Donnees/Utilisateurs/" + id + ".json"); }

function AddUser(name,id,xp,level,warn,mute,save) {

    let user = { 

        name: name, 
        id: id,
        xp: xp,
        level: level,
        warn: warn,
        mute: mute,
        save: save,

    }; 

    fs.writeFileSync("./Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(user), err => { 

        if (err) throw err;  
           
        console.log("Nouveau Utilisateur enregistrer !");

    });

}

function DeleteUser(id) {

    if (!FindUser(id).save) {

        fs.unlinkSync("./Donnees/Utilisateurs/" + id + ".json", err => {

            console.log(err);

        });

    }

}