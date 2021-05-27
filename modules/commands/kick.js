module.exports.config = {
	name: "kick",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "Thọ",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "other", 
	usages: "kick [tag]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, Users }) {
	var mention = Object.keys(event.mentions);
  const x = (await Users.getInfo(event.senderID)).gender;
  const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
	return api.getThreadInfo(event.threadID, (err, info) => {
		if (err) return api.sendMessage(`Huhu có lỗi rồi nè`,event.threadID);
		if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`${Sex} ơi, em cần quyền quản trị mới kick được`, event.threadID, event.messageID);
		if(!mention[0]) return api.sendMessage(`${Sex} phải tag người cần kick nha`,event.threadID);
		if (info.adminIDs.some(item => item.id == event.senderID)) {
			for (let o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	})
}