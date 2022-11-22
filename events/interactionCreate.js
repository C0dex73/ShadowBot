const Discord = require("discord.js")

module.exports = async (bot, interaction) =>{
    if(interaction.guild != null && interaction.member.permissions.has(Discord.PermissionsBitField.All)){
        //console.log("admin used command !")
    }
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){
        let entry = interaction.options.getFocused()
        let choices = bot.commands.filter(cmd => cmd.name.include(entry))
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choice.map(choice => ({name: choice, value: choice})))
    }
    if(interaction.type === Discord.InteractionType.ApplicationCommand){
        let command = require(`../commands/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }
}