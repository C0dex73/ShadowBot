const commands = require("../config.json").commands
const fs = require("fs")

module.exports = {
    name : "help",
    description : "return the list of the commands",
    help : "when used by anyone like so : /help, show this page",
    permission : null,
    dm : true,
    options : [{
        type : commands.type.string,
        name : "command",
        description : "display help about this command",
        choices : [
            {name : 'ask_verify', value : 'ask_verify'},
            {name : 'autorole', value : 'autorole'},
            {name : 'get_data', value : 'get_data'},
            {name : 'get_my_data', value : 'get_my_data'},
            {name : 'help', value : 'help'},
            {name : 'pin', value : 'pin'},
            {name : 'ping', value : 'ping'},
            {name : 'restart', value : 'restart'},
            {name : 'role', value : 'role'},
            {name : 'shutdown', value : 'shutdown'},
            {name : 'verify', value : 'verify'}
        ],
        required : false
    }],

    async run(bot, msg, args){
        let fmsg = ""
        if(args.getString('command')){
            let command = require(`../commands/${args.getString('command')}.js`)
            fmsg += `Here is the complete description of the command [**/${command.name}**] :`
            fmsg += `\r\n\r\n> *${command.description}*\r\n> ${command.help}`
            fmsg += "\r\n\r\n```fix\r\nOptions : ["
            if(command.options?.length >= 1){
                command.options.forEach(option => {
                    fmsg += `\r\n{\r\n\tname : ${option.name},`
                    fmsg += `\r\n\tdescription : ${option.description},`
                    fmsg += `\r\n\ttype : ${option.type}\r\n},\r\n`
                })
                fmsg = fmsg.slice(0, -3)
                fmsg += "\r\n] ```"
            }else{
                fmsg += "\r\nNone ```"
            }
        }else{
            fmsg += "Here the list of the commands and a short description :"
            fs.readdirSync("./commands").filter(f => f.endsWith(".js")).forEach(async file => {
                let command = require(`../commands/${file}`)
                fmsg += `\r\n> **${command.name}** : *${command.description}*`
            })
        }
        return await msg.reply(fmsg)
    }
}