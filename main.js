const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const loadCommands = require("./loader/loadCommands.js")
const loadEvents = require("./loader/loadEvents.js")
const config = require("./config.json")

console.log("STARTING BOT...")

bot.commands = new Discord.Collection()
bot.login(config.token)
loadCommands(bot)
loadEvents(bot)