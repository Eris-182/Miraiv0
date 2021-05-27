module.exports.config = {
	name: "soclo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Cái tên nói lên tất cả!",
	commandCategory: "action",
	usages: "soclon",
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
      const tag = args.join(" ");
      if (mentions == 0)
      return api.sendMessage(`Oh! ${Sex} đang chơi cái gì một mình thế, kím ai chơi cùng đi`, threadID, messageID);
      var gif = [
        "https://i.imgur.com/xxZrIV9.gif",
        "https://i.imgur.com/EHFvcF8.gif",
        "https://i.imgur.com/FRW7XRv.gif",
        "https://i.imgur.com/Y0MQ2ks.gif",
        "https://i.imgur.com/pvXrvQd.gif",
        "https://i.imgur.com/Ne41uYl.gif",
        "https://i.imgur.com/vRisJZA.gif",
        "https://i.imgur.com/kY7Etho.gif",
        "https://i.imgur.com/b7oBmgM.gif",
        "https://i.imgur.com/cR9ssL2.gif"
          ];
          let callback = function() {
          api.sendMessage({
                body: tag + ", đang sục cu! Nhìn nứng ghê",
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/soclo.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/soclo.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(gif[Math.floor(Math.random() * gif.length)]).pipe(fs.createWriteStream(__dirname + '/cache/soclo.gif')).on("close", callback);
}