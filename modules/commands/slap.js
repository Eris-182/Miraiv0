module.exports.config = {
	name: "slap",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Tát gãy răng người được tag!",
	commandCategory: "action",
	usages: "slap",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Users, args }) => {
      const { messageID, threadID, senderID } = event;
      const request = require('request');
      const fs = require('fs-extra');
      let name = (await Users.getInfo(senderID)).name;
      const mentions = Object.keys(event.mentions);
      if (mentions == 0)
      return api.sendMessage("Bạn cần phải tag một người nào đó!",threadID, messageID);
      return request("https://nekos.life/api/v2/img/slap",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let num = Math.floor(Math.random() * 4);
          let callback = function() {
            api.sendMessage({
                body: tag + ", bị " + name + " cho ăn tát, gãy mẹ "+ num +" cái răng",
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
                attachment: fs.createReadStream(__dirname + `/cache/slap.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/slap.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/slap.${ext}`)).on("close", callback);
        }
      );
}