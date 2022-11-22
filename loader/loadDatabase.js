const { createClient } = require('@supabase/supabase-js')
const data = require('../config.json')
const fs = require('fs')
const supabase = createClient(data.supabase.url, data.supabase.APIKey)

module.exports = {
    async Get(args){
        let {data, error} =  await supabase.from(args.from).select(args.select).eq(args.eq == null ? null : args.eq[0], args.eq == null ? null : args.eq[1])
        if(error != null){
            return "ERROR : " + error
        }
        fs.writeFile("./temp.json", JSON.stringify([data, error], null, 4).normalize("NFD").replace(/[\u0300-\u036f]/g, ""), (err) => {
            if (err) console.log(err)
        })
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
                }else{
                    let {data, error} = await supabase.from(bot.guilds.cache.get(guildId).name).update({roles : JSON.stringify(member._roles)}).match({id : user.username + '#' + user.discriminator})
                }
            })})
        })
    }
}