const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js")
const Ctype = require('../config.json').commands.type

module.exports = async (bot) =>{
    let commands = []

    bot.commands.forEach(command => {
        let slashCommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission)
        if(command.options?.length >= 1){
            for(let i = 0; i < command.options.length; i++){
                if((command.options[i].type == Ctype.string || command.options[i].type == Ctype.int) && command.options[i]?.choices != null){
                    slashCommand[`add${command.options[i].type}Option`](option => option.setName(command.options[i].name)
                        .setDescription(command.options[i].description)
                        .setRequired(command.options[i].required)
                        .addChoices(...command.options[i].choices))
                }else{
                    slashCommand[`add${command.options[i].type}Option`](option => option.setName(command.options[i].name)
                        .setDescription(command.options[i].description)
                        .setRequired(command.options[i].required))
                }
                
            }
        }
        commands.push(slashCommand)
    })

    const rest = new REST({version: "10"}).setToken(bot.token)

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
    console.log("INFO : (/) commands loaded.")
}