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

module.exports.run = function({ api, event, args, Currencies }) {
    const { messageID, threadID, senderID } = event;
	var mention = Object.keys(event.mentions)[0];
	var content = args.join(" ");
	var moneyPay = args[args.length -1];
        Currencies.getData(senderID).then((money) => {
			if (!moneyPay) return api.sendMessage("Bạn chưa nhập số tiền cần chuyển!", threadID, messageID);
			if (isNaN(moneyPay) || moneyPay.indexOf("-") !== -1) return api.sendMessage(`Số tiền bạn nhập không hợp lệ!`, threadID, messageID);
			if (moneyPay > money) return api.sendMessage('Số dư của bạn không đủ!', threadID, messageID);
			if (moneyPay < 50) return api.sendMessage(`Số tiền cần chuyển của bạn quá thấp, tối thiểu là 50 coin!`, threadID, messageID);
			api.sendMessage({
						body: `Bạn đã chuyển ${moneyPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin cho ${event.mentions[mention].replace("@", "")}.`,
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