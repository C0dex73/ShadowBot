const { createClient } = require('@supabase/supabase-js')
const data = require('../config.json')
const fs = require('fs')
const supabase = createClient(data.supabase.url, data.supabase.APIKey)

module.exports = {
    async Get(args){
        let {data, error} =  await supabase.from(args.from).select(args.select)
        let finalData = []

        data.forEach(async (member) => {
            let toPush = true
            if(args.id != null && member.id != args.id){toPush = false}
            if(args.warns != null && member.warns != args.warns){toPush = false}
            if (args.role != null && toPush){
                toPush = false
                JSON.parse(member.roles).forEach(role => {
                    if(role == args.role) {toPush = true}
                })
            }
            if(args.isBan != null && member.isBan != args.isBan){toPush = false}
            if(args.isExcluded != null && member.isExcluded != args.isExcluded){toPush = false}
        
            if (toPush) {
                finalData.push(member)
            }
        })

        fs.writeFile("./temp.json", JSON.stringify(finalData, null, 4).normalize("NFD").replace(/[\u0300-\u036f]/g, ""), (err) => {
            if (err) console.log(err)
        })
        return error
    },

    async TestConnexion(bot){
        let {data, error} = await supabase
            .from('Shadow')
            .select('*')
        if(!(data != null && error == null)){
            throw error
        }else{
            console.log("INFO : DataBase connected successfully")
        }
        this.Update(bot)
    },

    async AddRow(user, guild){
        let {data, error} = await supabase.from(guild.name).insert([{id : user.username + "#" + user.discriminator}])
    },

    async Update(bot){
        data.guild.forEach(async (guildId) => {
            bot.guilds.cache.get(guildId).members.fetch().then(members => {members.forEach(async member => {
                let user = await member.user
                let {data, error} = await supabase.from(bot.guilds.cache.get(guildId).name).select('*').eq('id', user.username + '#' + user.discriminator)
                if (JSON.stringify(data) == "[]") {
                    this.AddRow(user, bot.guilds.cache.get(guildId))
                }
                let {data2, error2} = await supabase.from(bot.guilds.cache.get(guildId).name).update({roles : JSON.stringify(member._roles)}).match({id : user.username + '#' + user.discriminator})
                if (error2 != null || error != null){
                    console.error(error, error2)
                }
            })})
        })
    }
}