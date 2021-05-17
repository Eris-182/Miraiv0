module.exports.config = {
	name: "feed",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Đút người được tag ăn!",
	commandCategory: "action",
	usages: "feed",
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
      return request("https://nekos.life/api/v2/img/feed",(err, response, body) => {
          let picData = JSON.parse(body);
          let getURL = picData.url;
          let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
          let tag = args.join(' ').replace("@", "");
          let callback = function() {
            api.sendMessage({
                body: tag + " bạn được " + name + " đút cho ăn",
                mentions: [{
                    tag: tag,
                    id: Object.keys(event.mentions)[0]
                  }],
                attachment: fs.createReadStream(__dirname + `/cache/feed.${ext}`)},threadID,() => fs.unlinkSync(__dirname + `/cache/feed.${ext}`),messageID);
          };
          request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/feed.${ext}`)).on("close", callback);
        }
      );
}