const Discord = require("discord.js");
const fs = require("fs");
const UserFunction = require("../Fonctions/User.js");

module.exports.run = async (bot,message,args,User) => {

    //XP
    if (message.content.length > 10 && message.content.length < 15) User.xp++;
    if (message.content.length > 15 && message.content.length < 20) User.xp += 3;
    if (message.content.length > 20 && message.content.length < 25) User.xp += 5;
    if (message.content.length > 25 && message.content.length < 30) User.xp += 8;
    if (message.content.length > 30 && message.content.length < 35) User.xp += 10;
    if (message.content.length > 35 && message.content.length < 50) User.xp += 15;
    if (message.content.length > 50 && message.content.length < 70) User.xp += 25;
    if (message.content.length > 70) User.xp += 35;
    if (User.level == 50) User.xp = 100;
    UserFunction.UdpateUser(User,User.name,User.id); 

}