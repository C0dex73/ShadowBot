const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands
const DB = require("../loader/loadDatabase.js")
const fs = require("fs")

module.exports = {
    name: "get_my_data",
    description : "Return your data in the Database data",
    permission : null,
    dm : true,
    
    async run(bot, msg, interaction){
        let args = {
            from : msg.member.guild.name,
            select : "*",
            id : msg.user.username + "#" + msg.user.id,
            warns : null,
            role : null,
            isBan : null,
            isExcluded : null,
        }
        let errors = await DB.Get(args)
        msg.reply({content : errors == null ? "This file contain the data asked" : "UhOh, an error as occured. Please contact an admin and show the file below", ephemeral : true, files: [{
            attachment: 'temp.json',
            name: errors == null ? 'data.json' : 'errors.json',
            description: errors == null ? 'the data in the DataBase' : 'the error that has occured'
        }]})
    }
}