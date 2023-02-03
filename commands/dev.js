const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed()

module.exports = {
    name:'개발자', 
    description: '개발자만을 위한 전용 명령어입니다.',
    execute(message){
            if (message.author.id==''){// 봇 개발자 아이디가 맞으면
                    message.channel.send(Embed.setTitle(`당신이 봇 개발자입니다!`));
            }else{// else 는 만약 아닐 떄 라는 뜻 만약 일반 유저 라면
                    message.channel.send(Embed.setTitle(`Permission Error! 권한이 없습니다!`));
            }
    }
}
