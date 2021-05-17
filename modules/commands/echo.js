module.exports.config = {
	name: "echo",
	version: "0.0.1", 
	hasPermssion: 0, 
	credits: "Eris",
	description: "Nhái lại những gì bạn nhập vào",
	commandCategory: "other",
	usages: "echo bot ngu",
	cooldowns: 5
};

module.exports.run = function({ api, event, args }) {
    const content = args.join(" ");
	api.sendMessage(content, event.threadID)
}