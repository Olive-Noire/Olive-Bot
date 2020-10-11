const { exit } = require("process");

module.exports.run = async(bot,message,args,User) => {

    if ((message.member.roles.cache.has(message.guild.roles.cache.find(role => role.name === 'admin').id) && !User.mute) || message.author.id === message.guild.ownerID) {

        const channelForBot = bot.guilds.cache.find(Guild => Guild.name === "akatsuki").channels.cache.find(channel => channel.name === '🤖-info-bot-🤖');
        const channelBot = bot.channels.cache.get(channelForBot.id);
        channelBot.send("`JE SUIS DECONNECTE 🤖❌`");

        var pass = false;

        do {

            if (message.channel.lastMessage.content == "`JE SUIS DECONNECTE 🤖❌`") {

                pass = true;
    
            } else {
    
                console.log("ending...");
                await sleep(1);
                pass = false;
    
            }
    
        } while (!pass)
    
    

        process.exit(1);

    } else {

        message.delete();
        message.author.send("VOUS N'AVEZ PAS LES `PERMISSIONS POUR UTILISER CETTE COMMANDE`");

    }


}

module.exports.help = {

    name: "exit"

}

function sleep(s) {
    return new Promise((resolve) => {
      setTimeout(resolve,(s * 1000));
    });
}