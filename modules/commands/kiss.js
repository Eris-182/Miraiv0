module.exports.config = {
	name: "kiss",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Hôn người được tag!",
	commandCategory: "action",
	usages: "kiss",
	cooldowns: 5
};

module.exports.run = async ({ args, api, event, Users }) => {
      const { messageID, threadID, senderID } = event;
      const request = require('request');
      const fs = require('fs-extra');
      let name = (await Users.getInfo(senderID)).name;
      const mentions = Object.keys(event.mentions);
      const x = (await Users.getInfo(senderID)).gender;
      const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
      if (mentions == 0)
      return api.sendMessage(`Oh! ${Sex} cần phải tag thêm một người nữa nha`,threadID, messageID);
      return request("https://nekos.life/api/v2/img/kiss",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let callback = function() {
            api.sendMessage({
                body: tag + " bạn được " + name + " hôn thật nồng cháy",
                mentions: [{
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }],
                attachment: fs.createReadStream(__dirname + `/cache/kiss.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/kiss.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/kiss.${ext}`)).on("close", callback);
        }
      );
}