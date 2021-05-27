module.exports.config = {
	name: "fuck",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Chịch người được tag!",
	commandCategory: "action",
	usages: "fuck",
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
      return api.sendMessage(`Oh! ${Sex} cần phải tag thêm một người nữa nha`,threadID, messageID);
      var gif = [
        "https://68.media.tumblr.com/079c991c44216fa834bd813cf4c60861/tumblr_oc2qbrcif51v2hfg0o1_500.gif",
        "https://bobsvagene.club/wp-content/uploads/2018/06/anime_hentai_har-2867.gif",
        "https://www.omweb.eu/image/free-hentai-gif-galleries.gif",
        "https://cdn5-images.motherlessmedia.com/images/ADDBF6D.gif",
        "https://static.hentai-gif-anime.com/upload/20200323/69/140151/detail.gif",
        "https://i.imgur.com/QiqOsPn.gif",
        "https://static.hentai-gif-anime.com/upload/20171011/36/72147/detail.gif",
        "http://the-sex.me/wp-content/uploads/2013/10/hentai-gifs-animated-fucking-hentai-gif-ehentai-1381941561g8k4n.gif",
        "https://juicygif.com/albums/userpics/2018y/08/05/10/1/6318-hentai-fucked-in-the-juicy-pussy.gif",
        "https://www.youpeg.com/wp-content/uploads/2019/09/Animated-BDSM-porn-gif-girl-bound-and-fucked-hentai.gif",
        "https://thumb-p0.xhcdn.com/a/ePO7YpJxGLC01-6sMnCJQA/000/265/986/860_1000.gif",
        "https://thumb-p6.xhcdn.com/a/uTZLDlVKoO4Aru-IgkZj0Q/000/265/986/856_1000.gif"
        ];
       var randomGif = gif[Math.floor(Math.random() * gif.length)];
       console.log(randomGif)
       var title = [" đụ cho tê lồn"," đâm con cặc sâu vào lồn"," đụ nước lồn bắn ra tung tóe"];
       let t = title[Math.floor(Math.random() * title.length)];
       let callback = function() {
        api.sendMessage({body: tag + ", bạn bị " + name + t,
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
                attachment: fs.createReadStream(__dirname + '/cache/fuck.gif')
           },threadID, (err, info) => {fs.unlinkSync(__dirname + '/cache/fuck.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID
        );
       };
       request(randomGif).pipe(fs.createWriteStream(__dirname + '/cache/fuck.gif')).on("close", callback);
}