const Discord = require("discord.js")
const { toString } = require("lodash")
const commands = require("../config.json").commands

module.exports = {
    name : "role",
    description : "give selected role to the user",
    permission : Discord.PermissionFlagsBits.ManageRoles,
    dm : false,
    options : [{
        type : commands.type.discord.user,
        name : "membre",
        description : "User who will recieve the role",
        required : true
    },
    {
        type : commands.type.discord.role,
        name : "role",
        description : "Role to give",
        required : true
    }],

    async run(bot, msg, args){
        try{
            const role = args.getRole('role')
            const member = args.getMember('membre')
            member.roles.add(role)
            msg.reply({content : `Successfuly gave '${role.name}' to '${member.user.username}'`, ephemeral : true})
        }catch(err){
            await msg.reply({content : "ERROR : " + toString(err).slice(toString(err).indexOf(":") + 2), ephemeral: true})
        }
    }
}