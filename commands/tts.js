const { getAudioUrl } = require('google-tts-api')

module.exports = {
    name:"tts", name:"t",
    description:"tts를 해주는 커맨드입니다.",
        async execute(message,args){
        const string = args.join(" ")
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) { return message.reply("보이스채널에 입장해주세요") }
        const audioURL = await getAudioUrl( string ,{
            lang:'ko',
            slow:false,
            host:'https://translate.google.com',
            timeout:10000,
        });
        try{
            voiceChannel.join().then(connect =>{
                const dispatcher = connect.play(audioURL);
                dispatcher.on('finish', () => {
                    return;
                });
            });
        }
        catch(e) {
            message.channel.send("에러")
            console.log(e)
        }
    }
}