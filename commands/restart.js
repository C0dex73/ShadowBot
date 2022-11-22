const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands

module.exports = {
    name: "restart",
    description : "stop the bot",
    permission : Discord.PermissionFlagsBits.Administrator,
    dm : false,
    
    async run(bot, msg){
        await msg.reply({content : "The bot will restart in few seconds", ephemeral : false})
        console.log(`Restarting by ${msg.author} !`)
        setTimeout(function () {
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                })
            })
            process.exit()
        }, 5000)
    }
}