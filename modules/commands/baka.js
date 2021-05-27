module.exports.config = {
	name: "baka",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Chửi người được tag là ngốc!",
	commandCategory: "action",
	usages: "baka",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Users, args }) => {
      const { messageID, threadID, senderID } = event;
      const request = require('request');
      const fs = require('fs-extra');
      let name = (await Users.getInfo(senderID)).name;
      const mentions = Object.keys(event.mentions);
      const x = (await Users.getInfo(senderID)).gender;
      const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
      if (mentions == 0)
      return api.sendMessage(`Oh! ${Sex} cần phải tag thêm một người vào nha`,threadID, messageID);
      return request("https://nekos.life/api/v2/img/baka",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let callback = function() {
            api.sendMessage({
                body: tag + " bạn bị " + name + " chửi là ngốc",
                mentions: [{
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }],
                attachment: fs.createReadStream(__dirname + `/cache/baka.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/baka.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/baka.${ext}`)).on("close", callback);
        }
      );
}