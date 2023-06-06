const Discord = require("discord.js")
const { permission } = require("./ping")
const commands = require("../config.json").commands

module.exports = {
    name : "help",
    description : "return the list of the commands",
    permission : null,
    dm : true,
    options : [{
        type : commands.type.string,
        name : "command",
        description : "display help about this command",
        required : false
    }],

    async run(bot, msg){
        await msg.reply("in developpement...")
    }
}