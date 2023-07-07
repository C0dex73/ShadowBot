const DB = require("../loader/loadDatabase.js")
const loadSlashCommands = require("../loader/loadSlashCommands")

module.exports = async bot =>{
    await loadSlashCommands(bot)
    await DB.TestConnexion(bot)
    await DB.Update(bot)
    console.log(`INFO : ${bot.user.tag} online !`)
}