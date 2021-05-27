module.exports.config = {
	name: "leuleu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Leuleu người được tag (Kiếm nữ mà sài lệnh nha má)!",
	commandCategory: "action",
	usages: "leuleu",
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
      return api.sendMessage(`Ý hí hí ${Sex} thật là biến thái quá đi hà`, threadID, messageID);
        var gif = [
        "https://25.media.tumblr.com/ca6a46c63ad37f6e28ce7d12deb43afe/tumblr_mt3ws805jo1r86u7yo1_500.gif",
        "https://37.media.tumblr.com/8b184cb3c1bcfaa998015301d1e60f37/tumblr_mik3jbFos01rg4rvvo1_500.gif",
        "https://i2.wp.com/yadocarism.com/images/91fea1737989a057137c3c07df8560cf.gif",
        "https://68.media.tumblr.com/6195232b36ea1c112d3a3b4ab243e3bf/tumblr_mzkc0mrDWG1t0f6pjo1_r1_500.gif",
        "https://i0.wp.com/im1.ibsearch.xxx/5/8b/7ff8132ef059b9216d868b354797e.gif",
        "https://img.rule34.xxx/images/677/cdb3cecaf80a98ddb9279b04c12e2640fa05b473.gif",
        "https://24.media.tumblr.com/b418c449b65a6aa52996788320f45a4e/tumblr_mo797pl2jl1sv5v4qo1_500.gif",
        "https://tbib.org/images/3658/9bbc4f58a909b372a428e8bd74edbcbe44ce4809.gif",
        "https://static.hentai-gif-anime.com/upload/20160529/18/35910/1.gif",
        "https://gen-style.com/img/pussy-licking-gifs-hentai-2.gif",
        "https://i1.wp.com/38.media.tumblr.com/7827348cbab26ba646fcc70e0a6db127/tumblr_n66ny2AOCN1tck5t9o1_500.gif",
          ];
         var title = ["Nước tuôn ra quá trời luôn","Lồn nhiều nước ghê","Hai mép lồn sưng bự chả bá"];
         let t = title[Math.floor(Math.random() * title.length)];
          let callback = function() {
          api.sendMessage({
                body: tag + ", bạn đang được " + name + " liếm lồn! " +t,
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/leuleu.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/leuleu.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(gif[Math.floor(Math.random() * gif.length)]).pipe(fs.createWriteStream(__dirname + '/cache/leuleu.gif')).on("close", callback);
}