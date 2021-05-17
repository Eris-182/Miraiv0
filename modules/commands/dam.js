module.exports.config = {
	name: "dam",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Đấm người được tag!",
	commandCategory: "action",
	usages: "dam",
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
      return api.sendMessage("Tag một người vào nha bạn.", threadID, messageID);
      var gif = [
        "https://i.pinimg.com/originals/f3/ec/8c/f3ec8c256cb22279c14bfdc48c92e5ab.gif",
        "https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif?itemid=4790446",
        "https://media2.giphy.com/media/yo3TC0yeHd53G/giphy.gif",
        "https://i.pinimg.com/originals/8d/50/60/8d50607e59db86b5afcc21304194ba57.gif",
        "https://media0.giphy.com/media/AlsIdbTgxX0LC/giphy.gif",
        "https://i.pinimg.com/originals/d4/17/ce/d417ce25489868ae4bf177de73308aa5.gif",
        "https://i.gifer.com/9eUJ.gif",
        "https://i.kym-cdn.com/photos/images/newsfeed/001/856/131/1af.gif"
        ];
          let callback = function() {
          api.sendMessage({
                body: tag + ", bạn bị " + name + " đấm cho vào mặt",
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/dam.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/dam.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(gif[Math.floor(Math.random() * gif.length)]).pipe(fs.createWriteStream(__dirname + '/cache/dam.gif')).on("close", callback);
}