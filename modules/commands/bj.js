module.exports.config = {
	name: "bj",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Bắt người được tag buscu mình!",
	commandCategory: "action",
	usages: "bj",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Users, args }) => {
      const { messageID, threadID, senderID } = event;
      const request = require('request');
      const fs = require('fs-extra');
      let name = (await Users.getInfo(senderID)).name;
      const mentions = Object.keys(event.mentions);
      const tag = args.join(" ");
      if (mentions == 0)
      return api.sendMessage("Bạn cần phải tag một người nào đó!",threadID, messageID);
      return request("https://nekos.life/api/v2/img/bj",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = contentMessage.slice(prefix.length + 3, contentMessage.length).replace("@", "");
          let callback = function() {
            api.sendMessage({
              body: tag + ", bạn đang bú cu " + name + " rất ngon lành",
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + `/cache/bj.${ext}`)
            },
            threadID,(err, info) => {fs.unlinkSync(__dirname + `/cache/bj.${ext}`);setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
         };
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/bj.${ext}`)).on("close", callback);
       })
}