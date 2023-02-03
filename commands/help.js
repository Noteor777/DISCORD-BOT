module.exports = {
    name: "도움말",
    description: "명령어 도움말을 출력합니다.",
    async execute(message) {
        const { RED, GREEN, BLUE } = { RED: "#ff5454", GREEN: "#54ff62", BLUE: "#38e1ff" }
        const Discord = require('discord.js');
        const fs = require('fs');
        const Embed = new Discord.MessageEmbed();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const Field = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            Field.push({ name: ";" + command.name, value: command.description });
        }
        return message.channel.send(Embed.setTitle("명령어 목록").addFields(Field).setColor(BLUE));
    }
}