const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands

module.exports = {
    name: "restart",
    description : "stop the bot",
    permission : Discord.PermissionFlagsBits.Administrator,
    dm : false,
    
    async run(bot, msg){
        return msg.reply({content : "Not handled anymore on the new host", ephemeral : true})
    }
}