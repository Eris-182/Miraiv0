module.exports.config = {
    name: "setexp",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "NTKhang",
    description: "set exp cho user\nCredits: NTKhang",
    commandCategory: "system",
    usages: "setexp [exp] || setexp [tag] [exp] || setexp [iduser] [exp]",
    cooldowns: 5,
    info: [
    {
        key: 'exp',
        prompt: 'set exp cho bản thân',
        example: '$setexp 999'
    },
    {
        key: '[tag] [exp]',
        prompt: 'set exp cho người được tag',
        example: '$setexp @Khang 999'
    },
    {
        key: '[iduser] [exp]',
        prompt: 'set exp cho id được chỉ định',
        example: '$setexp 100010382497517 999'
    }]
};

module.exports.run = async({ api, event, Currencies, client, args, Users, global, Threads }) => {
    let { body, senderID, threadID, messageID } = event;
    var prefix = (await Threads.getData(threadID)).settings.PREFIX || global.config.PREFIX;
    if (!args[0]) return api.sendMessage(`Onii chan hổng pít sài ồi, dùng ${prefix}help đi muội chỉ cho nè!`, threadID, messageID);
    const allUser = client.allUser;
    var UID = Object.keys(event.mentions);
    if (UID.length == 0)
    {
        if (!args[1]) var UID = senderID;
        else if (args[0] && args[1]) var UID = args[0]; 
    }
    if (allUser.indexOf(parseInt(UID)) == -1)
        return api.sendMessage(`Muộn không tìm thấy dữ liệu của ID này đâu`, threadID, messageID);
    var exp = args[args.length-1];
    if (isNaN(parseInt(exp))) return api.sendMessage(`Exp Onii chan nhập có phải số đâu ạ`, threadID, messageID);
    var Name = (await Users.getData(UID)).name;
    var CurrentExp = parseInt((await Currencies.getData(UID)).exp);
    var NewExp = parseInt(exp) + CurrentExp;
    var CongTru = (exp < 0) ? "trừ" + exp.slice(1) : "cộng" + exp;
    api.sendMessage({
        body: `Onii chan mới ${CongTru} điểm kinh nghiệm của ${Name},\nExp hiện tại : ${NewExp.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
        mentions: [{tag: Name,id: parseInt(UID)}]
    }, threadID, async() => {
        await Currencies.setData(UID,{ exp: parseInt(NewExp)})}, messageID);

};