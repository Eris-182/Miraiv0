module.exports.config = {
	name: "sleep",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "SpermLord",
	description: "Tính thời gian thức dậy hoàn hảo cho bạn",
	commandCategory: "health",
	usages: "sleep [Time]",
	cooldowns: 5,
	dependencies: ["moment-timezone"],
	info: [
		{
			key: 'Time',
			prompt: 'Thời gian bạn thức dậy',
			type: 'Giờ',
			example: '07:00'
		}
	]
};

module.exports.run = async function({ api, event, args, global, Users }) {
	let { senderID, threadID, messageID } = event;
	const moment = require("moment-timezone");
	var sleepTime = [];
	let content = args.join(" ");
	var contentHour = content.split(":")[0];
	var contentMinute = content.split(":")[1];
  const x = (await Users.getInfo(event.senderID)).gender;
  const Sex = x == 2 ? "Onii chan" : x == 1 ? "Onee chan" : "";
	if (isNaN(contentHour) || isNaN(contentMinute) || contentHour > 23 || contentMinute > 59 || contentHour < 0 || contentMinute < 0 || contentHour.length != 2 || contentMinute.length != 2)  return api.sendMessage(`Không đúng format, hãy xem trong ${global.config.PREFIX}help`, threadID, messageID);
	var getTime = moment().utcOffset("+07:00").format();
	var time = getTime.slice(getTime.indexOf("T") + 1, getTime.indexOf("+"));
	var wakeTime = getTime.replace(time.split(":")[0] + ":", contentHour + ":").replace(time.split(":")[1] + ":", contentMinute + ":");
	for (var i = 6; i > 0; i--) sleepTime.push(moment(wakeTime).utcOffset("+07:00").subtract(90 * i + 15, 'm').format("HH:mm"));
	return api.sendMessage(`Nếu ${Sex} muốn thức dậy vào lúc ${content}, thì thời gian hoàn hảo để ngủ là:\n${sleepTime.join(', ')}\nFact: Thời gian để bạn vào giấc ngủ từ lúc nhắm mắt là 15-20 phút`, threadID, messageID);
}