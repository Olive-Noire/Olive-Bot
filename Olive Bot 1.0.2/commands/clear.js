const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{

    if (message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) || message.author.id === message.guild.ownerID) {    
    
        for (let i = 0;i < message.channel.messages.cache.array().length;i++) {
                
            message.channel.messages.cache.array()[i].delete();  
        
        }

        message.author.send((message.channel.messages.cache.array().length + 1) + " messages `supprimés ❌`")
        message.delete();

    }

    


}

module.exports.help = {

    name: "clear"
}