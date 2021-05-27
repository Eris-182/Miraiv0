module.exports.config = {
	name: "getlink",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Lấy url download từ video, audio được gửi từ nhóm",
	commandCategory: "other",
	usages: "getLink",
	cooldowns: 5,
};

module.exports.run = async ({ api, event, Users }) => {
  const x = (await Users.getInfo(event.senderID)).gender;
  const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
    if (event.type !== "message_reply") return api.sendMessage(`${Sex} phải reply một audio, video, ảnh nào đó cơ`, event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage(`${Sex} phải reply một audio, video, ảnh nào đó cơ`, event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`${Sex} chỉ reply một audio, video, ảnh thôi nha!`, event.threadID, event.messageID);
	return api.sendMessage(event.messageReply.attachments[0].url, event.threadID, event.messageID);
}