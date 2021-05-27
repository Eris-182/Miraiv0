module.exports.config = {
	name: "sexy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Eris",
	description: "Kiểm ra độ sexy của bạn!",
	commandCategory: "other",
	usages: "sexy",
	cooldowns: 5
};

module.exports.run = async ({ api, event, Users }) => {
        const { messageID, threadID, senderID } = event;
        let name = (await Users.getInfo(senderID)).name;
        const x = (await Users.getInfo(senderID)).gender;
        const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        api.sendMessage(name + ` điểm sexy của ${Sex} là ${Math.floor(love)}% \nĐiểm hôm nay: ${loveLevel}`,threadID,messageID)
}