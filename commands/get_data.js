const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands
const DB = require("../loader/loadDatabase.js")
const fs = require("fs")

module.exports = {
    name: "get_data",
    description : "Return all the Database data",
    permission : Discord.PermissionFlagsBits.BanMembers,
    dm : false,
    options : [
        {
            type : commands.type.bool,
            name : "public",
            description : "if true, everyone will be able to see the data",
            required : true
        },
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
        }
    ],

    async run(bot, msg, interaction){
        let args = {
            from : msg.member.guild.name,
            select : "*",
            id : interaction.getMember("is") == null ? null : interaction.getMember("is").user.username + "#" + interaction.getMember("is").user.id,
            warns : interaction.getInteger("warns"),
            role : interaction.getRole("has_role") == null ? null : interaction.getRole("has_role").id,
            isBan : interaction.getBoolean("is_banned"),
            isExluded : interaction.getBoolean("is_excluded"),
        }

        let [data, errors] = await DB.Get(args)
        msg.reply({content : errors == null ? "This file contain the data asked" : "UhOh, an error as occured. Please contact an admin and show the file below", ephemeral : !interaction.getBoolean("public"), files: [{
            attachment: 'temp.json',
            name: errors == null ? 'data.json' : 'errors.json',
            description: errors == null ? 'the data in the DataBase' : 'the error that has occured'
        }]})
    }
}