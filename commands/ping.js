const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description : "reply by pong with the delay",
    permission: null,
    dm: true,

    async run(bot, msg, interaction){
        await msg.reply({content : `ping in ${bot.ws.ping}`, ephemeral : true})
    }

}