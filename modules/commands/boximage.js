const request = require('request')
const fs = require('fs')
module.exports.config = {
  name: "boximage",  
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Eris",
  description: "Thay đổi ảnh nhóm",
  commandCategory: "boximage",
  usages: "boximage",
  cooldowns: 5,
  info: [
    {
        key: 'Reply',
        prompt: '',
        type: 'Reply bức ảnh',
        example: 'boximage'
    },
    {
        key: '[agrs]',
        prompt: '',
        type: 'Đường dẫn của ảnh',
        example: 'boximage https://imgur.com/AKSDJ'
    }
],
};

module.exports.run = async ({ event, api, args}) => {
    const axios = require('axios')
    const { messageID, threadID } = event; 
    if (event.type == "message_reply") {
        if (event.type !== "message_reply") return api.sendMessage('Vui lòng reply bức ảnh cần thay đổi', threadID);    if (event.messageReply.attachments.length > 1) return api.sendMessage('Vui lòng reply chỉ một ảnh!', threadID, messageID);
        if (event.messageReply.attachments.length > 1) return api.sendMessage('Vui lòng reply chỉ một ảnh!', threadID, messageID);
        const ImgUrl = event.messageReply.attachments[0].url;
        let pathImg = __dirname + '/cache/ntk.png';
        let getntk = (await axios.get(`${ImgUrl}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(pathImg, Buffer.from(getntk, 'utf-8'));
        return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/ntk.png'), threadID, () => fs.unlinkSync(pathImg), messageID);     
    } else {
        var content = args.join(' ');
        if (!content) return api.sendMessage('Vui lòng điền đường dẫn của ảnh cần thay đổi', threadID)
        let pathImg = __dirname + '/cache/ntk.png';
        let getntk = (await axios.get(`${content}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(pathImg, Buffer.from(getntk, 'utf-8'));
        return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/ntk.png'), threadID, () => fs.unlinkSync(pathImg), messageID);
    }
    
}