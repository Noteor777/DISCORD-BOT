const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "서버정보",
  description: "server",
  execute(message) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`** ${message.guild.name}서버의 서버 정보입니다**`)
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("서버 이름 |", `${message.guild.name}`)
        .addField("서버 멤버수 |", `${message.member.guild.memberCount}명`)
        .addField("서버 주인(Owner) |", `${message.guild.owner}`)
        .addField("서버 아이디 |", `${message.guild.id}`)
        .addField("서버 생성일 |", `${message.guild.createdAt}`)
        message.channel.send(embed);
  },
};