module.exports.config = {
	name: "femdom",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Nữ nhân hành hạ nam nhân!",
	commandCategory: "action",
	usages: "femdom",
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
      return api.sendMessage("Bạn cần phải tag một người nào đó!", threadID, messageID);
      var gif = [
        "https://i.imgur.com/itamZh9.gif",
        "https://i.imgur.com/6rnbjgH.gif",
        "https://i.imgur.com/QwQAQYz.gif",
        "https://i.imgur.com/HjzEnXq.gif",
        "https://i.imgur.com/550bpis.gif",
        "https://i.imgur.com/vrFuiMo.gif",
        "https://i.imgur.com/MeyqmGW.gif",
        "https://i.imgur.com/XzF0jTB.gif",
        "https://i.imgur.com/r0tCa5x.gif",
        "https://i.imgur.com/pu5upPE.gif",
        "https://i.imgur.com/CFdmU49.gif",
        "https://i.imgur.com/66vAiQ5.gif",
        "https://i.imgur.com/LgHksWq.gif",
        "https://i.imgur.com/ddMJ7gp.gif",
        "https://i.imgur.com/nIkRZtK.gif",
        "https://i.imgur.com/1x5P2UU.gif",
        "https://i.imgur.com/nITTHgR.gif",
        "https://i.imgur.com/uuMR8F7.gif",
        "https://i.imgur.com/pEOGo36.gif",
        "https://i.imgur.com/Zh3S5CN.gif",
        "https://i.imgur.com/ERWFPub.gif",
        "https://i.imgur.com/2fWPOkA.gif",
        "https://i.imgur.com/DXmlAZE.gif",
        "https://i.imgur.com/b8mOWKm.gif",
        "https://i.imgur.com/jxA8ik8.gif"
          ];
          let callback = function() {
          api.sendMessage({
              body: `${name} đang hành hạ ${tag}`,
              mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/femdom.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/femdom.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(gif[Math.floor(Math.random() * gif.length)]).pipe(fs.createWriteStream(__dirname + '/cache/femdom.gif')).on("close", callback);
}