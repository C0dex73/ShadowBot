const Discord = require("discord.js")
const DB = require("../loader/loadDatabase.js")
const config = require("../config.json")
const commands = require("../config.json").commands
const fs = require("fs")
const { TeamMemberMembershipState } = require("discord.js")

module.exports = {
    name : "ask_verify",
    description : "Remove acess to the server and send him verif msg",
    permissions : Discord.PermissionFlagsBits.ManageRoles,
    dm : false,
    options:[{
        type : commands.type.discord.user,
        name : "member",
        description : "User to verify",
        required : true
    }],

    async run(bot, msg, args){
        let user = args.getMember('member')
        bot.guilds.cache.get(msg.guild.id).members.fetch(user.id).then((member) => {
            member.roles.remove(member.roles.cache)
            member.roles.add(bot.guilds.cache.get(msg.guild.id).roles.cache.find(r => r.name === "may-a-bot"))

            member.send("A moderator asked to reverify yourself. Please type /verify below to do so !")
            return msg.reply({content : `'${member.user.username}' now has to reverify himself !`})
        })
    }
}