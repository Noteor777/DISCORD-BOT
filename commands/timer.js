module.exports = {
    name: "타이머",
    description: "타이머 커맨드입니다.",
    execute(message,args){
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        if(isNaN(args[0])) {
            return message.reply(Embed.setColor("#D8BEE4").addField("오류!",`숫자를 입력해주세요!`))
        } if (!args[1] || args[1] == "초") {
            if (args[0] > 1000){
                return message.reply(Embed.setColor("#D8BEE4").addField("오류!",`최대 1000초입니다!`))
            } else {
                message.reply(Embed.setColor("#D8BEE4").addField("타이머 시작!",`${args[0]}초 후에 멘션해드릴게요!`))
                setTimeout(function(){
                    message.channel.send(`<@${message.author.id}> ${args[0]}초 타이머가 종료되었어요!`)
                }, (args[0] * 1000))
            }
        }
    }
}
