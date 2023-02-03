const fs = require('fs')

module.exports = {
    name: "배워",
    description: "봇이 말을 배우는 커맨드 입니다.",
    execute(message, args){
    if(!args[0]) return message.reply(`오류: 올바른 인수를 입력해주세요. (인수: 학습, 뜻)`);
    if(!args[1]) return message.reply(`오류: 올바른 말을 입력해주세요.`);
    const word = args[1];
    const filePath = `./word/${word}.json`;
    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;
    const wf = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let saveWord = {};
    if(args[0] === "학습"){
        if(wf.mean) return message.reply(`이미 학습된 말입니다!`)
        if(!args[2]) return message.reply(`오류: **${args[1]}**의 뜻을 입력해주세요.`)
        saveWord = {
            mean : message.content.slice(args[1].length + 7).trim(),
        };
        fs.writeFileSync(filePath, JSON.stringify(saveWord));
        message.reply(`${args[1]}을 학습시켰습니다!`)
    }
    if(args[0] === "뜻"){
        if(!wf.mean) return message.reply(`학습되지 않은 말입니다.`)
        message.reply(`${wf.mean}`)
    }
}
}