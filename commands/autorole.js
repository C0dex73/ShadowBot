const commands = require("../config.json").commands
const ApplyRoleRule = require("./role").Apply

module.exports = {
    name : "autorole",
    description : "gives you the selected role if authorized",
    help : "when used by anyone, like so : /autorole @role [optional : True / False (remove)] will add the specified role if remove is False or not specified and remove it otherwise. Works only with the game roles.",
    permission : null,
    dm : false,
    options : [{
        type : commands.type.discord.role,
        name : "role",
        description : "the role to give to yourself",
        required : true
    },
    {
        type : commands.type.bool,
        name : "remove",
        description : "if true will remove instead of giving",
        required : false
    }],

    async run(bot, msg, args){
        if(args.getRole('role').comparePositionTo(bot.guilds.cache.get(msg.guild.id).roles.cache.find(r => r.name === "Server Booster")) < 0){
            ApplyRoleRule(msg, msg.member, args.getRole('role'), args.getBoolean('remove'))
        }else{
            msg.reply({content : "You are not allowed to modify this role on yourself !", ephemeral : true})
        }
    }
}