module.exports.config = {
	name: "pay", 
	version: "0.0.1", 
	hasPermssion: 0, 
	credits: "Eris",
	description: "Chuyển tiền cho người khác", 
	commandCategory: "economy", 
	usages: "pay @Hồng Đào 5000", 
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
    const { messageID, threadID, senderID } = event;
	var mention = Object.keys(event.mentions)[0];
	var content = args.join(" ");
	var moneyPay = args[args.length -1];
  const x = (await Users.getInfo(senderID)).gender;
 const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
        Currencies.getData(senderID).then((money) => {
			if (!moneyPay) return api.sendMessage(`${Sex} chưa nhập số tiền cần chuyền nè`, threadID, messageID);
			if (isNaN(moneyPay) || moneyPay.indexOf("-") !== -1) return api.sendMessage(`Số tiền ${Sex} nhập không đúng rồi!`, threadID, messageID);
			if (moneyPay > money) return api.sendMessage(`${Sex} ơi, số dư của ${Sex} không đủ rồi`, threadID, messageID);
			if (moneyPay < 50) return api.sendMessage(`Số tiền ${Sex} nhỏ quá nha. Tối thiếu phải 50 coin cơ`, threadID, messageID);
			api.sendMessage({
						body: `${Sex} đã chuyển ${moneyPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin cho ${event.mentions[mention].replace("@", "")}.`,
						mentions: [{tag: event.mentions[mention].replace("@", ""),id: mention}]
					},
					threadID,() => {
						Currencies.increaseMoney(mention, parseInt(moneyPay));
						Currencies.decreaseMoney(senderID, parseInt(moneyPay));
					},
					messageID
				);
			});
		return;
}