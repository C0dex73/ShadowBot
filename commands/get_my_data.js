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