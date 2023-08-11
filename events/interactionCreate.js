const Discord = require("discord.js")
const DB = require("../loader/loadDatabase.js")

module.exports = async (bot, interaction) =>{
    if(interaction.guild != null && interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        //console.log("admin used command !")
    }
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){
        let entry = interaction.options.getFocused()
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choice.map(choice => ({name: choice, value: choice})))
    }
    if(interaction.type === Discord.InteractionType.ApplicationCommand){
        let command = require(`../commands/${interaction.commandName}`)
        try{
            console.log("[" + (new Date(Date.now())).toLocaleString() + " UTC] : " + interaction.member.user.username + " --> " + interaction.commandName)
        }catch(err){
            console.log(err)
        }
        try{            
            command.run(bot, interaction, interaction.options)
        }catch(err){
            interaction.reply({content : err, ephemeral : true})
        }
    }
    DB.Update(bot)
}