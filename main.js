const Discord = require("discord.js")
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const bot = new Discord.Client({intents: 3276799})
const loadCommands = require("./loader/loadCommands.js")
const loadEvents = require("./loader/loadEvents.js")
const config = require("./config.json")
const DB = require("./loader/loadDatabase.js")
const Minecraft = require("mineboty")
const fs = require("fs");
const { threadId } = require("worker_threads");

bot.commands = new Discord.Collection()
bot.login(config.token)
loadCommands(bot)
loadEvents(bot)