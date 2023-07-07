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

    run(bot, msg, interactionParams) {
        config.guild.forEach((guild) => {
            let guildName = bot.guilds.cache.get(guild).name
            args = {
                from : guildName,
                select : "*",
                id : msg.user.username + "#" + msg.user.id,
                warns : null,
                role : null,
                isBan : null,
                isExcluded : null,
            }
            DB.Get(args)
            fs.readFile('temp.json', (err, data) => {
                DB.Update(bot)
                config.guild.forEach((guildId) => {
                    try{
                        bot.guilds.cache.get(guildId).members.fetch(msg.user.id).then(user => {
                            if(user.roles.cache.some(role => role.name == "may-a-bot")){
                                user.roles.remove(bot.guilds.cache.get(guildId).roles.cache.find(r => r.name === "may-a-bot"))
                                user.roles.add(bot.guilds.cache.get(guildId).roles.cache.find(r => r.name === "not-a-bot"))
                                return msg.reply("you are now verified on " + guildName + " !")
                            }else{
                                return msg.reply({content : "you are already verified on " + guildName + " !", ephemeral : true})
                            }

                            
                        })
                    }catch(err){
                        return msg.reply({content : "oops, something went wrong : " + err.message, ephemeral : true})
                    }
                })
            })
        })
    }
}