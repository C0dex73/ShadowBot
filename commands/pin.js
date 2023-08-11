const Discord = require('discord.js')
const commands = require("../config.json").commands
const DB = require('../loader/loadDatabase.js')

module.exports = {
    name : "pin",
    description : "can store up to 20 messages links",
    permission : null,
    dm : false,
    options : [{
        type : commands.type.string,
        name : "message_link",
        description : "the link to the message to save",
        required : false
    },
    {
        type : commands.type.bool,
        name : "remove",
        description : "remove the message linked from your pin list",
        required : false
    }],

    async run(bot, msg, args){
        let header = "https://discord.com/channels/" + msg.guild.id.toString() + "/"
        if(args.getString('message_link') == null){
            let fMsg = "Here is the list of your pinned messages :"
            let pinnedList = await this.getList(msg)
            pinnedList.forEach(pin => {
                fMsg += "\r\n <" + header + pin.toString() + ">"
            })
            return await msg.reply({content : fMsg, ephemeral : true})
        }
        
        if(args.getString('message_link').startsWith(header)){
            let returnOverride = false
            let msgLinkTarget = args.getString('message_link').replace(header, '')
            let FTList = await this.getList(msg)
            if (FTList.length != 0){
                await FTList.forEach(async pin => {
                    if(pin == msgLinkTarget){
                        if(!args.getBoolean('remove')){
                            returnOverride = true
                            return await msg.reply({content : "This link is already in your pinned messages list.", ephemeral : true})
                        }
                        let FTListG = FTList
                        FTListG.splice(FTList.indexOf(pin), 1)
                        let DBArgs = {
                            "guild" : msg.guild,
                            "eq" : ['id', msg.user.username + "#" + msg.user.id],
                            "update" : {
                                "pinnedMsg" : FTListG
                            }
                        }
                        let errors = await DB.Modify(DBArgs)
                        if(errors != null){
                            returnOverride = true
                            return await msg.reply({content : "oops, an error occured : " + errors.toString(), ephemeral : true})
                        }
                        returnOverride = true
                        return await msg.reply({content : "Message successfully unpinned !", ephemeral : true})
                    }
                })
            }
            setTimeout(async () => {
                if(returnOverride){
                    return
                }
                if(args.getBoolean('remove')){
                    return await msg.reply({content : "This message isn't pinned !", ephemeral : true})
                }
                let DBArgs = {
                    "guild" : msg.guild,
                    "eq" : ['id', msg.user.username + "#" + msg.user.id],
                    "update" : {
                        "pinnedMsg" : await FTList.concat([msgLinkTarget])
                    }
                }
                let errors = await DB.Modify(DBArgs)
                if(errors != null){
                    return await msg.reply({content : "oops, an error occured : " + errors.toString(), ephemeral : true})
                }
                return await msg.reply({content : "Message successfully pinned !", ephemeral : true})
            }, 1000)
        }else{
            await msg.reply({content : "This is not a message link from this server !", ephemeral : true})
        }
    },

    async getList(msg){
        let DBargs = {
            from : msg.member.guild.name,
            select : "*",
            id : msg.user.username + "#" + msg.user.id,
            warns : null,
            role : null,
            isBan : null,
            isExcluded : null,
        }
        let [data, errors] = await DB.Get(DBargs)
        if(errors != null){
            console.log(errors)
            return await msg.reply({content : "An error as occured, please contact an administrator.", ephemeral : true})
        }
        return JSON.parse(data[0].pinnedMsg)
    }
}