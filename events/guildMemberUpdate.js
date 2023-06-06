const Discord = require("discord.js")
const DB = require("../loader/loadDatabase.js")

module.exports = async (bot, oldMember, newMember) => {
    DB.Update(bot)
}