module.exports.config = {
	name: "moclon",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Cái tên nói lên tất cả!",
	commandCategory: "action",
	usages: "moclon",
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
      const tag = args.join(' ');
      if (mentions == 0)
      return api.sendMessage(`Oh! Hông được đâu ${Sex} phải tag thêm người nữa cơ`, threadID, messageID);
      var gif = [
            "https://i.imgur.com/eYTv0zM.gif",
            "https://i.imgur.com/j3346Co.gif",
            "https://i.imgur.com/UGKT6tS.gif",
            "https://i.imgur.com/48vyKf3.gif",
            "https://i.imgur.com/9blwD2j.gif",
            "https://i.imgur.com/03Yu6Lq.gif",
            "https://i.imgur.com/cIWBos5.gif",
            "https://i.imgur.com/u3u7jXL.gif",
            "https://i.imgur.com/ov1z4ux.gif",
            "https://i.imgur.com/Fg5ed1U.gif",
            "https://i.imgur.com/LM9EM6O.gif",
            "https://i.imgur.com/OVxRWh2.gif",
            "https://i.imgur.com/BvzL07s.gif",
            "https://i.imgur.com/izMhZ5S.gif",
            "https://i.imgur.com/NEOl2xH.gif",
            "https://i.imgur.com/4zUBAiD.gif",
            "https://i.imgur.com/ifjAmSf.gif",
            "https://i.imgur.com/8TuZoKO.gif",
            "https://i.imgur.com/VTePN8Z.gif",
            "https://i.imgur.com/bt9cJ1T.gif",
            "https://i.imgur.com/MhZdhzX.gif",
            "https://i.imgur.com/GAQyPVJ.gif",
            "https://i.imgur.com/FlVFkr0.gif",
            "https://i.imgur.com/yP0A5Wt.gif",
            "https://i.imgur.com/eTMSs6b.gif",
            "https://i.imgur.com/ozHsInq.gif",
            "https://i.imgur.com/oy6jnBW.gif",
            "https://i.imgur.com/a6Kdurt.gif",
            "https://i.imgur.com/d8xrq7C.gif",
            "https://i.imgur.com/J8Rwvm3.gif",
            "https://i.imgur.com/PLyMvP2.gif",
            "https://i.imgur.com/rHJmx9R.gif",
            "https://i.imgur.com/yhcn6da.gif"
          ];
          const randomGif = gif[Math.floor(Math.random() * gif.length)];
          let text = [
            "nước lồn chảy quá trời",
            "hai mép lồn sưng múp",
            "nước ướt cả quần",
            "rên ư ư"
          ];
          const randomText = text[Math.floor(Math.random() * text.length)];
          let callback = function() {
          api.sendMessage({
              body: `${tag} đang móc bím ${randomText}`,
              mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/moclon.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/moclon.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(randomGif).pipe(fs.createWriteStream(__dirname + '/cache/moclon.gif')).on("close", callback);
}