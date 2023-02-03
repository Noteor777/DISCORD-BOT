const Discord = require('discord.js')
const noblox = require ('noblox')
const client = new Discord.Client()
const { prefix, token } = require('./config.json');
const fs = require('fs')
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name,command)
}

client.on('ready', ()=>{
    console.log("start bot.");
    client.user.setActivity('', {type: 'PLAYING'})
});

client.on('message',msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    try{
        command.execute(msg,args)
    }catch(error){
        if(error == "TypeError: Cannot read properties of undefined (reading 'execute')"){
            const embed = new Discord.MessageEmbed().setTitle("명령어 목록").setColor("#bcc0dc").addFields({name:"명령어 이름",value:"하는 것"},{name:"명령어 이름",value:"하는 것"})
            msg.reply(`정의되지 않은 명령어예요!\n명령어 목록은 여기를 참고해주세요`)
            msg.reply(embed)
        }
        else{
            msg.reply(`명령을 처리하지 못했어요!\n오류내용: ${error}`)
            console.log(error)
        }
    }
})

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}로블록스`) && msg.content.split(' ')[1]) {
        noblox
            .getIdFromUsername(msg.content.split(' ')[1])
            .then(id => {
                noblox
                    .getPlayerInfo(id)
                    .then(info => {
                        console.log(info);
                        const embed = new Discord.MessageEmbed();
                        embed.setThumbnail(
                            `http://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&username=${
                                info.username
                            }`
                        );
                        embed.setColor('00ff00');
                        embed.setTitle(`${info.username}님의 정보`);
                        embed.addField('**이름**', info.username);
                        embed.addField(
                            '**생성일**',
                            JSON.stringify(info.joinDate)
                                .split('"')[1]
                                .split('T')[0]
                        );
                        embed.addField('**밴여부**', JSON.stringify(info.isBanned));
                        embed.addField('**친구 수**', info.friendCount);
                        embed.addField('**팔로잉**', info.followingCount);
                        embed.addField('**팔로워**', info.followerCount);
                        msg.channel.send(embed);
                    })
                    .catch(err => {
                        msg.reply('오류');
                    });
            })
            .catch(err => {
                msg.reply('존재하지 않는 유저입니다');
            });
    }
});

client.login(token)