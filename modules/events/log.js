module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "CatalizCS",
	description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, global, Users }) {
    const logger = require("../../utils/log");
    if (global[this.config.name].enable != true) return;
    const Name = (await Users.getInfo(event.author)).name;
    const ThreadName = (await Threads.getInfo(event.threadID)).name;
    const task = '';
    var formReport =  `${Name} vừa ${task} ${ThreadName}\nVào lúc: ${Date.now()}`;
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Tên không tồn tại",
                    newName = event.logMessageData.name || "Tên không tồn tại";
            task = "thay đổi tên nhóm từ: '" + oldName + "' thành '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "thêm bot vào nhóm";
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == '100043804177463')) return api.sendMessage('Ý anh yêu của em vào kìa mọi người ơi', event.threadID)
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "kick bot ra khỏi nhóm"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}