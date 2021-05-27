module.exports.config = {
	name: "spank",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Tét mông người được tag!",
	commandCategory: "action",
	usages: "spank",
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
      return api.sendMessage(`Oh! ${Sex} tag thêm một người vào nha`,threadID, messageID);
      return request("https://nekos.life/api/v2/img/spank",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let callback = function() {
            api.sendMessage({
                body: tag + ", bạn bị " + name + " tét mông",
                mentions: [{
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }],
                attachment: fs.createReadStream(__dirname + `/cache/spank.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/spank.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/spank.${ext}`)).on("close", callback);
        }
      );
}