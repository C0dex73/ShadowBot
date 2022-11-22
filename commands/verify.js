const Discord = require("discord.js")
const DB = require("../loader/loadDatabase.js")
const config = require("../config.json")
const fs = require("fs")
const { TeamMemberMembershipState } = require("discord.js")

module.exports = {
    name : "verify",
    description : "Use this command to verify yourself as a human",
    permissions : null,
    dm : true,

    async run(bot, msg, interaction) {
        args = {
            from : msg.member.guild.name,
            select : "*",
            eq : [
                "id",
                msg.user.username + "#" + msg.user.discriminator
            ]
        }
        await DB.Get(args)
        fs.readFile('temp.json', (err, data) => {
            if(data.toString().startsWith("[\n    [],")) {
                DB.AddRow(msg.user, msg.member.guild)
                config.guild.forEach((guildId) => {
                    try{
                        bot.guilds.cache.get(guildId).members.fetch(msg.user.id).then(user => {
                            user.roles.remove(bot.guilds.cache.get(guildId).roles.cache.find(r => r.name === "may-a-bot"))
                            user.roles.add(bot.guilds.cache.get(guildId).roles.cache.find(r => r.name === "not-a-bot"))
                        })
                    }catch{
                        console.log(bot.guilds.cache.get(guildId).name)
                    }
                })
                return msg.reply("you are now verified !")
            }
            return msg.reply({ content :"you are already verified !", ephemeral : true})
        })
    }
}