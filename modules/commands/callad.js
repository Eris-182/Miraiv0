module.exports.config = {
    name: "callad",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Thọ & fix by banledangyeuu",
    description: "gửi tin nhắn tới admin của bot",
    commandCategory: "group",
    usages: "callad [lời nhắn]",
    cooldowns: 3

};
module.exports.handleReply = async function({ api, event, args, handleReply, client, __GLOBAL, Threads, Users }) {
  let name = (await Users.getInfo(event.senderID)).name;
  return api.sendMessage({body :`𝑭𝒆𝒆𝒅𝒃𝒂𝒄𝒌 𝒇𝒓𝒐𝒎 𝒂𝒅𝒎𝒊𝒏 ${name}: ${event.body}`,mentions:[{tag: name, id: event.senderID}]}, handleReply.threadID, handleReply.replyID);    
};

module.exports.run = async function({ api, event, args, Currencies, utils, Users, Threads, global,client }) {
    const moment = require("moment-timezone");
    let { senderID, messageID, threadID } = event;
    if (!args[0]) return api.sendMessage("Bạn chưa nhập tin nhắn !", threadID,messageID);
    let data = (await Users.getData(senderID));
    let thread = (await Threads.getData(threadID));
    var time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');
    for (var id of global.settings.ADMINBOT) {
        api.sendMessage(`=== 𝑹𝒆𝒑𝒐𝒓𝒕 ===\n\nTIME: ${time}\nName: ${data.name}\nUID: ${senderID}\nNhóm: ${thread.name}\nThreadID: ${event.threadID}\nNhắn : ${args.join(" ")}`,id, async (err, messageInfo) => {
                client.handleReply.push({ 
                    name: this.config.name,
                    messageID: messageInfo.messageID,
                    replyID: event.messageID, 
                    threadID,
                    type: "reply"
                })
    await new Promise(resolve => setTimeout(resolve, 1000))
    })      
    return api.sendMessage(`𝑺𝒖𝒄𝒄𝒆𝒔𝒔: Thông tin của bạn đã được gửi tới các admin\n𝑻𝒊𝒎𝒆: ${time}`,event.threadID)
    }
} 