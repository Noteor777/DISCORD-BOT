module.exports = {
    name: '출첵',
    description: '출석체크를 하는 커맨드입니다.',
    execute(message){
        const fs = require('fs');
        const id = message.author.id;
        const name = message.author.username;
        const filePath = `./daily/${id}.json`;
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed();
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (user.date === date) return message.channel.send(Embed.setTitle(`이미 출석을 하셨습니다.`));
        const saveUser = {
            id,
            name,
            date,
        };
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
        message.channel.send(Embed.setTitle(`출석체크 완료!`));
    }
}
