const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands
const DB = require("../loader/loadDatabase.js")
const fs = require("fs")

module.exports = {
    name: "get_data",
    description : "Return all the Database data",
    permission : Discord.PermissionsBitField.All,
    dm : false,
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
            name : "warns",
            description : "if not null, will only return the rows with the selected number of warns",
            required : false
        },
        {
            type : commands.type.bool,
            name : "is_banned",
            description : "if not true, will only return the rows corresponding to a member who is ban",
            required : false
        },
        {
            type : commands.type.bool,
            name : "is_excluded",
            description : "if not true, will filter the rows to only return the rows corresponding to a member who is excluded",
            required : false
        },
        {
            type : commands.type.int,
            name : "punishement_start_time",
            description : "if not true, will only return the rows of who have a punishement startTime of the indicated value",
            required : false
        }
    ],

    async run(bot, msg, interaction){
        args = {
            from : msg.member.guild.name,
            select : "*",
            eq : [
                ["id", interaction.getMember("is")],
                ["warns", interaction.getInteger("warns")],
                ["roles", interaction.getMember("roles") == null ? null : interaction.getMember("roles").id],
                ["isBan", interaction.getBoolean("is_banned")],
                ["isExcluded", interaction.getBoolean("is_excluded")],
                ["startTime", interaction.getInteger("punishement_start_time")]
            ]
        }
        console.log("e")
        errors = await DB.Get(args).
        console.log(errors)
        if(errors =! null){
            msg.reply({content : "This file contain the data asked", ephemeral : true, files: [{
                attachment: 'temp.json',
                name: 'data.json',
                description: 'the data in the DataBase'
            }]})
        }
        else{
            msg.reply({content : "OhOh, ERROR : " + errors, ephemeral : true})
        }
    }
}