const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands
const DB = require("../loader/loadDatabase.js")
const fs = require("fs")

module.exports = {
    name: "get_data",
    description : "Return all the Database data",
    permission : Discord.PermissionsBitField.All,
    dm : true,
    options : [
        {
            type : commands.type.discord.role,
            name : "has_role",
            description : "if not null, will only return the rows with the selected role",
            required : false
        },
        {
            type : commands.type.discord.user,
            name : "is",
            description : "if not null, will filter the data to only return the selected user",
            required : false
        },
        {
            type : commands.type.int,
            name : "has_warns",
            description : "if not null, will only return the rows with the selected number of warns",
            required : false
        },
        {
            type : commands.type.bool,
            name : "is_ban",
            description : "if not true, will only return the rows corresponding to a member who is ban",
            required : false
        },
        {
            type : commands.type.bool,
            name : "is_excluded",
            description : "if not true, will filter the data to only return the rows corresponding to a member who is excluded",
            required : false
        } //TODO : write commands relatively to the options
    ],

    async run(bot, msg, interaction){
        console.log(interaction.getRole("has_role"))
        console.log(interaction.getMember("is"))
        console.log(interaction.getInt())
        args = {
            from : msg.member.guild.name,
            select : "*",
            eq : [
                "id",
                msg.user.username + "#" + msg.user.discriminator
            ]
        }
        
        await DB.Get(args)
        msg.reply({content : "This file contain your current data.", ephemeral : true, files: [{
            attachment: 'temp.json',
            name: 'data.json',
            description: 'your data in the DataBase'
          }]})
    }
}