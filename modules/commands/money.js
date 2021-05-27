module.exports.config = {
	name: "money",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Sunii",
	description: "Thay đổi tiền tệ ",
	commandCategory: "economy",
	usages: "money @tag 5000",
	cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Currencies }) {
  let { threadID, senderID, messageID } = event;
	const mentions = Object.keys(event.mentions)[0];
	const content = args.join(" ");
  const sender = args[0];
  const moneySet = args[args.length -1];
  const moneyMentions = args[args.length -1];
  if (isNaN(moneySet)) return api.sendMessage("Số tiền bạn nhập không hợp lệ", threadID, messageID);
  switch(args[0]) {
    case 'add':
      if (!mentions && sender) return api.sendMessage(`Bạn đã nạp ${moneySet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin vào ví`, event.threadID,() => Currencies.increaseMoney(senderID, parseInt(moneyMentions)), messageID)
      return api.sendMessage({
        body: `Bạn đã nạp cho ${event.mentions[mentions].replace("@", "")} ${moneyMentions.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} vào ví.`, 
        mentions: [{tag: event.mentions[mentions].replace("@", ""),id: mentions}]},
        threadID, () => Currencies.increaseMoney(mentions, parseInt(moneyMentions)), messageID)
    break;
    case 'move':
      if (!mentions && sender) return api.sendMessage(`Bạn đã trừ ${moneySet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin khỏi ví`, event.threadID,() => Currencies.decreaseMoney(senderID, parseInt(moneyMentions)), messageID)
      return api.sendMessage({
        body: `Bạn đã trừ ${moneyMentions.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin từ ví của ${event.mentions[mentions].replace("@", "")}.`, 
        mentions: [{tag: event.mentions[mentions].replace("@", ""),id: mentions}]},
        threadID, () => Currencies.decreaseMoney(mentions, parseInt(moneyMentions)), messageID)
    break;
    case 'set':
      if (!mentions && sender) return api.sendMessage(`Bạn đã thay đổi số dư thành ${moneySet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin`, threadID, () => Currencies.setData(senderID,{money: parseInt(moneySet)}), messageID);
		  return api.sendMessage({
        body: `Bạn đã thay đổi số dư cho ${event.mentions[mentions].replace("@", "")} thành ${moneySet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} coin`,
        mentions: [{tag: event.mentions[mentions].replace("@", ""),id: mentions}]
		}, threadID, () => Currencies.setData(mentions, {money: parseInt(moneySet)}), messageID);
    break;
  }
}