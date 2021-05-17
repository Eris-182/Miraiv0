module.exports.config = {
	name: "cumface",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Bắn tinh lên mặt!",
	commandCategory: "action",
	usages: "cumface",
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
      return api.sendMessage("Tag một người vào nha bạn. Mất công lại tự bắn tinh lên mặt nữa.", threadID, messageID);
      var gif = [
        "https://thumb-p1.xhcdn.com/a/Q8K8F1imZ-x9WqMpe-KF0w/000/088/788/451_450.gif",
        "https://img.xbooru.com//images/259/56b2936a0eed5a620b021c1b0de3e9e8.gif",
        "https://thumb-p1.xhcdn.com/a/TVaXHI0xngu0bW2hqgUBoA/000/088/788/471_450.gif",
        "https://static.hentai-gif-anime.com/upload/20170502/22/44328/detail.gif",
        "https://img.xbooru.com//images/305/1d7a925736c90c5444c71a35c1dd8468.gif",
        "https://tbib.org//images/717/74af14e292a8bcde5bcb85dfa11169cac3f4f6ba.gif",
        "https://static.hentai-gif-anime.com/upload/20170502/22/44324/detail.gif",
        "https://static.hentai-gif-anime.com/upload/20191124/61/124653/detail.gif",
        "https://static.hentai-gif-anime.com/upload/20160427/4/7523/detail.gif",
        "https://31.media.tumblr.com/12d593f7544322b550d7f8217409930a/tumblr_nj2mka31vt1u0l683o4_r1_500.gif",
        "https://totovladimir.ru/vasxxx/wp-content/uploads/2016/01/006-oppai-paizuri-hentai-cum-shot.gif",
        "https://xxgasm.com/wp-content/upload/2018/04/cgi_hentai_gif_c-2532.gif"
        ];
          let callback = function() {
          api.sendMessage({
               body:"" + name + " bạn đang bắn tinh lên mặt " + tag + " quá trời! ",
                mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],
              attachment: fs.createReadStream(__dirname + '/cache/cumface.gif')},
              threadID,(err, info) => {fs.unlinkSync(__dirname + '/cache/cumface.gif');setTimeout(() => api.unsendMessage(info.messageID), 10000)}, messageID);
          };
         request(gif[Math.floor(Math.random() * gif.length)]).pipe(fs.createWriteStream(__dirname + '/cache/cumface.gif')).on("close", callback);
}