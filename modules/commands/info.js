module.exports.config = {
	name: "info",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Eris",
	description: "Check thông tin cá nhân/ box",
	commandCategory: "other",
	usages: "info",
	cooldowns: 5,
    dependencies: ['request', 'fs-extra','axios']
};

module.exports.run = async function({ api, event, args, Currencies, Users, Threads }) {
    const request = require('request');
    const fs = require('fs-extra');
    const { threadID, messageID } = event;
    const content = args.join(" ");
    switch(content){
        case 'user': {        
            if (event.type == "messageReply") {
                mentions = event.messageReply.senderID;
                api.sendMessage(`Tui nè`, threadID)
            } 
            if (content.indexOf('@') !== -1){
                mentions = Object.keys(event.mentions)
            }
            else mentions = event.senderID;
            let Data = (await Users.getInfo(mentions));
            const Money = (await Currencies.getData(mentions)).money;
            const Usex = await Data.gender;
            let Sex = Usex == 2 ? "Nam" : Usex == 1 ? "Nữ": "Gay";
            let isFriend = Data.isFriend;
            let Friend = isFriend == true ? "Đã kết bạn với Bot" : isFriend == false ? "Chưa kết bạn với Bot" : "Null"
            let callback = function() {
                api.sendMessage({
                    body: `Tên: ${Data.name}\nUID: ${event.senderID}\nUserName: ${Data.vanity}\nGiới tính: ${Sex}\nTình trạng: ${Friend}\nUrl: ${Data.profileUrl}\nMoney: ${Money} coin`,
                    attachment: fs.createReadStream(__dirname + `/cache/Avatar.png`)
                }, threadID, () => fs.unlinkSync(__dirname + `/cache/Avatar.png`), messageID);
            };
            return request(encodeURI(`https://api.miraiproject.tk/getavatar?ID=${mentions}`)).pipe(fs.createWriteStream(__dirname+'/cache/Avatar.png')).on('close',() => callback());
        }
        break;
        case 'box': {
            let Data = (await Threads.getInfo(threadID));
            var GenderNam = [];
			var GenderNu = [];
            var tenCak = [];
             for (let z in Data.userInfo) {
             	var gioitinhone = Data.userInfo[z].gender;
                if (gioitinhone == "MALE") {GenderNam.push(gioitinhone)
                } else { GenderNu.push(gioitinhone)
              }
            };
             var Nam = GenderNam.length;
             var Nu = GenderNu.length;
			let sex = Data.approvalMode;
            var pd = sex == false ? "Đang tắt" : sex == true ? "Đang bật" : "Không phải Thread";
            var callback = () => api.sendMessage({
            body: `Tên: ${Data.threadName}\nID Thread: ${Data.threadID}\nPhê duyệt thành viên: ${pd}\nEmoji: ${Data.emoji}\nThông tin: \n`
            +`+Tổng số thành viên:${Data.participantIDs.length}\n`
            +`+Nam: ${Nam}\n+Nữ: ${Nu}\n`
            +`+Số quản trị viên ${Data.adminIDs.length}\n`
            +`+Tổng số tin nhắn: ${Data.messageCount}\n`,
            attachment: fs.createReadStream(__dirname + "/cache/2.png")
            }, threadID, () => fs.unlinkSync(__dirname + "/cache/2.png"),messageID);
            if (ten = Data.threadName == null){var ten = "Chưa đặt tên"}
            if (emg = Data.emoji == null){ var emg = "(y)" }
                var callback2 = () => api.sendMessage({
                body: `Tên: ${ten}\nID Thread: ${Data.threadID}\nPhê duyệt thành viên: ${pd}\nEmoji: ${emg}\nThông tin: \n`
                +`+Số thành viên :${Data.participantIDs.length}\n`
                +`+Số quản trị viên ${Data.adminIDs.length}\n`
                +`+Tổng số tin nhắn: ${Data.messageCount}\n`}, threadID,messageID)
            if (Data.imageSrc == null) { 
                return callback2() 
            } else {
                return request(encodeURI(`${Data.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/2.png')).on('close',() => callback())}
            }
        default:
        api.sendMessage(`Sử dụng:\n!info user -- Để check thông tin của bản thân\n!info user @tag -- Để check thông tin người tag\n!info box -- Để check thông tin nhóm`, event.threadID, event.messageID)
        }      
} 