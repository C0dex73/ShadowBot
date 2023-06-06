const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands

module.exports = {
    name: "shutdown",
    description : "stop the bot",
    permission : Discord.PermissionFlagsBits.Administrator,
    dm : false,
    
    async run(bot, msg){
        await msg.reply({content : "The bot will stop in few seconds", ephemeral : false})
        console.log(`Shutingdown by ${msg.author} !`)
        setTimeout(() => {
            process.exit(0)
        }, 5000)
    }
}