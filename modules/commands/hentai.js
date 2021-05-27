module.exports.config = {
	name: "hentai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "Random lấy ảnh hentai! (Safe For Work)",
	commandCategory: "random-img",
	usages: "hentai tag",
    cooldowns: 5,
	dependencies: ['request', 'fs-extra'],
    info: [
		{
			key: "tag => Để trống",
			prompt: "Lấy danh sách các tag có",
            type: "null",
            example: ""
		},
		{
			key: "tag => tag tồn tại trong danh sách",
			prompt: "Nhập tag tồn tại để lấy ảnh đúng với chủ đề của tag!",
            type: "string",
            example: "cosplay"
		}
	],
};

module.exports.run = ({ event, api, args }) => {
    const { readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    const request = require("request");

    let animeData = JSON.parse(readFileSync(__dirname + "/cache/hentai.json")).nsfw;
    if (!animeData.hasOwnProperty(args[0])) {
        let list = [];
        Object.keys(animeData).forEach(endpoint => list.push(endpoint));
        return api.sendMessage(`=== Tất cả các tag của Anime ===\n${list.join(", ")}`, event.threadID, event.messageID);
    }
    else return request(animeData[args[0]], (error, response, body) => {
        let picData = JSON.parse(body);
        let URL = "";
        (!picData.data) ? URL = picData.url : URL = picData.data.response.url;
        let ext = URL.substring(URL.lastIndexOf(".") + 1);
        request(URL)
        .pipe(createWriteStream(__dirname + `/cache/anime.${ext}`))
        .on("close", () => api.sendMessage({ attachment: createReadStream(__dirname + `/cache/anime.${ext}`) }, event.threadID, (err, info) => {unlinkSync(__dirname + `/cache/anime.${ext}`);setTimeout(() => api.unsendMessage(info.messageID), 10000)}, event.messageID));
    });
};