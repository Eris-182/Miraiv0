module.exports.config = {
	name: "poke",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Chọc người được tag!",
	commandCategory: "action",
	usages: "poke",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Users }) => {
      const { messageID, threadID, senderID } = event;
      const request = require('request');
      const fs = require('fs-extra');
      let name = (await Users.getInfo(senderID)).name;
      const mentions = Object.keys(event.mentions);
      if (mentions == 0)
      return api.sendMessage("Bạn cần phải tag một người nào đó!",threadID, messageID);
      return request("https://nekos.life/api/v2/img/poke",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let callback = function() {
            api.sendMessage({
                body: tag + ", bạn bị " + name + " chọc 😔",
                mentions: [{
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }],
                attachment: fs.createReadStream(__dirname + `/cache/poke.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/poke.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/poke.${ext}`)).on("close", callback);
        }
      );
}