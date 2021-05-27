module.exports.config = {
	name: "resend",
	version: "0.0.1",
	hasPermssion: 1,
	credits: "Sunii",
	description: "Gửi lại những cái gì mà ai đó gỡ",
	commandCategory: "system",
	usages: "resend on",
  dependencies: ['tinyurl','fs-extra','request'],
	cooldowns: 0
};
module.exports.event = async function ({ event, api, client, Users }) {
  let {messageID, senderID, threadID, body } = event;
  const fs = require('fs-extra');
  const request = require('request');
  let settings = client.threadSetting.get(event.threadID) || {};
  if (!client.message) client.message = new Array();
    if(event.type != "message_unsend") client.message.push({
    msgID:messageID,
    msgBody:body,
    attachment:event.attachments
  })
    if(event.type == "message_unsend") {
      if(!client.message.some(item => item.msgID == messageID)) return;
      var getMsg = client.message.find(item => item.msgID == messageID);
      let name = (await Users.getInfo(event.senderID)).name;
      if (event.senderID == "100043804177463") return;
      if (getMsg.attachment.length >= 2){
        let num = 0
        let msg = `${name} vừa gỡ ${getMsg.attachment.length} tệp đính kèm:\n`
      for (var i = 0; i < getMsg.attachment.length; i++) {
			var shortLink = await require("tinyurl").shorten(getMsg.attachment[i].url);
				num +=1;
        msg += `${num}: ${shortLink}\n`;
    	}
        api.sendMessage(msg,threadID);
        }
      else if(getMsg.msgBody != "") {
        if (event.senderID == "100044478222598") {
          return api.sendMessage(`Trà Chanh móc lôz vừa gỡ một tin nhắn\nNội dung: ${getMsg.msgBody}`, threadID)
        } else {
          return api.sendMessage(`${name} đã gỡ 1 tin nhắn:\n${getMsg.msgBody}`,threadID)
        }
      }  
      else if (getMsg.attachment[0].type == 'photo') request (getMsg.attachment[0].url).pipe(fs.createWriteStream(__dirname + "/cache/images.jpg")).on("close", () => api.sendMessage({body: "Đây là ảnh " + name + " vừa gỡ",mentions: [{tag: name, id: event.senderID } ],attachment: fs.createReadStream(__dirname + "/cache/images.jpg")},event.threadID,() => fs.unlinkSync(__dirname + "/cache/images.jpg")))
      else if (getMsg.attachment[0].type == 'video') request (getMsg.attachment[0].url).pipe(fs.createWriteStream(__dirname + "/cache/video.mp4")).on("close", () => api.sendMessage({body: "Đây là video " + name + " vừa gỡ",mentions: [{ tag: name, id: event.senderID }],attachment: fs.createReadStream(__dirname + "/cache/video.mp4")},event.threadID,() => fs.unlinkSync(__dirname + "/cache/video.mp4")))
      else if (getMsg.attachment[0].type == 'audio') request (getMsg.attachment[0].url).pipe(fs.createWriteStream(__dirname + "/cache/voice.mp3")).on("close", () => api.sendMessage({body: "Đây là đoạn ghi âm " + name + " vừa gỡ",mentions: [{ tag: name, id: event.senderID }],attachment: fs.createReadStream(__dirname + "/cache/voice.mp3")},event.threadID,() => fs.unlinkSync(__dirname + "/cache/voice.mp3")))
      else if (getMsg.attachment[0].type == 'animated_image')  request (getMsg.attachment[0].url).pipe(fs.createWriteStream(__dirname + "/cache/sticker.gif")).on("close", () => api.sendMessage({body: "Đây là ảnh gif " + name + " vừa gỡ",mentions: [{ tag: name, id: event.senderID }],attachment: fs.createReadStream(__dirname + "/cache/sticker.gif")},event.threadID,() => fs.unlinkSync(__dirname + "/cache/sticker.gif")))
      else if (getMsg.attachment[0].type == 'sticker') request (getMsg.attachment[0].url).pipe(fs.createWriteStream(__dirname + "/cache/sticker.png")).on("close", () => api.sendMessage({body: "Đây là sticker " + name + " vừa gỡ",mentions: [{ tag: name, id: event.senderID }],attachment: fs.createReadStream(__dirname + "/cache/sticker.png")},event.threadID,() => fs.unlinkSync(__dirname + "/cache/sticker.png")))
      }
    }

module.exports.run = async function({ event, api, args, Threads, client, utils }) {
   if (args.length == 0) return api.sendMessage("Input không được để trống", event.threadID, event.messageID);
    let settings = (await Threads.getData(event.threadID)).settings;
    switch (args[0]) {
        case "on": {
            settings["resend"] = true;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã bật resend!", event.threadID);
            break;
        }
        case "off": {
            settings["resend"] = false;
            await Threads.setData(event.threadID, options = { settings });
            client.threadSetting.set(event.threadID, settings);
            api.sendMessage("Đã tắt resend!", event.threadID);
            break;
        }
    
        default: {
            utils.throwError("resend", event.threadID, event.messageID);
            break;
        }
    }
}