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

    run(bot, msg, interaction) {
        config.guild.forEach((guild) => {
            let guildName = bot.guilds.cache.get(guild).name
            args = {
                from : guildName,
                select : "*",
                id : msg.user.username + "#" + msg.user.discriminator,
                warns : null,
                role : null,
                isBan : null,
                isExcluded : null,
            }
            DB.Get(args)
            fs.readFile('temp.json', (err, data) => {
                console.log(guildName + data.toString())
                if(data.toString() == "[]") {
                    DB.Update(bot)
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

                    return msg.reply("you are now verified on " + guildName + " !")
                }
            })
        })
    }
}