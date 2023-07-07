const { ThreadAutoArchiveDuration } = require("discord.js")
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
        description : "if true will remove instead of adding",
        required : true
    }],

    async run(bot, msg, args){

        if(args.getBoolean('remove')){
            if(args.getMember('member').roles.cache.some(role => role == args.getRole('role'))){
                args.getMember('member').roles.remove(args.getRole('role'))
                msg.reply({content : `Successfuly removed '${args.getRole('role').name}' to '${args.getMember('member').user.username}'`, ephemeral : true})
            }else{
                msg.reply({content : `'${args.getMember('member').user.username}' do not have this role !`, ephemeral : true})
            }
        }else{
            if(!args.getMember('member').roles.cache.some(role => role == args.getRole('role'))){
                args.getMember('member').roles.add(args.getRole('role'))
                msg.reply({content : `Successfuly gave '${args.getRole('role').name}' to '${args.getMember('member').user.username}'`, ephemeral : true})
            }else{
                msg.reply({content : `'${args.getMember('member').user.username}' already has this role !`, ephemeral : true})
            }
        }
        
    },
}