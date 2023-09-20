const Discord = require("discord.js")
const commands = require("../config.json").commands

module.exports = {
    name : "role",
    description : "give selected role to the user",
    permission : Discord.PermissionFlagsBits.ManageRoles,
    dm : false,
    options : [{
        type : commands.type.discord.user,
        name : "member",
        description : "User who will recieve the role",
        required : true
    },
    {
        type : commands.type.discord.role,
        name : "role",
        description : "Role to give",
        required : true
    },
    {
        type : commands.type.bool,
        name : "remove",
        description : "if true will remove instead of giving",
        required : false
    }],

    async run(bot, msg, args){

        let memberToModify = args.getMember('member')
        let roleToApply = args.getRole('role')
        let toRemove = args.getBoolean('remove')

        this.Apply(msg, memberToModify, roleToApply, toRemove)
    },

    async Apply(msg, memberToModify, roleToApply, toRemove){
        if(toRemove == true){
            if(memberToModify.roles.cache.some(role => role == roleToApply)){
                memberToModify.roles.remove(roleToApply)
                msg.reply({content : `Successfuly removed '${roleToApply.name}' to '${memberToModify.user.username}'`, ephemeral : (msg.member.roles.cache.find(r => r.id === 780472016775020550) == null ? true : false)})
            }else{
                msg.reply({content : `'${memberToModify.user.username}' do not have this role !`, ephemeral : true})
            }
        }else{
            if(!memberToModify.roles.cache.some(role => role == roleToApply)){
                memberToModify.roles.add(roleToApply)
                msg.reply({content : `Successfuly gave '${roleToApply.name}' to '${memberToModify.user.username}'`, ephemeral : (msg.member.roles.cache.find(r => r.id === 780472016775020550) == null ? true : false)})
            }else{
                msg.reply({content : `'${memberToModify.user.username}' already has this role !`, ephemeral : true})
            }
        }
    }
}