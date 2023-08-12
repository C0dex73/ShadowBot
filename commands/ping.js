const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description : "reply by pong with the delay",
    help : "when used by anyone, like so : /ping, replies with pong and the bot ws ping",
    permission: null,
    dm: true,

    async run(bot, msg, interaction){
        await msg.reply({content : `ping in ${bot.ws.ping}`, ephemeral : true})
    }

}