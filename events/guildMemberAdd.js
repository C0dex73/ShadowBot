const Discord = require('discord.js')

module.exports = async (bot, member) =>{
    let role = await bot.guilds.cache.get(member.guild.id).roles.cache.find(r => r.name === "may-a-bot")
    member.roles.add(role)
    member.send("Please type '/verify' to verify yourself and access to the ShadowServer")
}