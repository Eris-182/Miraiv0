module.exports.config = {
	name: "ins",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Eris",
	description: "Check thông tin tài khoản Instagram",
	commandCategory: "other",
	usages: "ins quangsang_official",
	cooldowns: 5,
    dependencies: ['request', 'fs-extra','axios']
};

module.exports.run = function({ api, event, args, client, __GLOBAL }) {
    const axios = require('axios');
    const fs = require('fs-extra');
    const request = require('request')
    const { messageID, threadID } = event;
    const UserName = args.join(' ');
    let cookie = "mid=YGDV4QALAAHx67JEf_UHj_bJzSHf; ig_did=A8783F64-F91B-415E-93D8-FB0F0EFB80A5; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=25-UfQGNeV62gWETwLp5AOdCnnluEh39vetjBo3jwRY.eyJ1c2VyX2lkIjoiMTAwMDQzODA0MTc3NDYzIiwiY29kZSI6IkFRRGpTRmdsVmd1b3hXeEpOT29rb1FPbEFyVzcxdzY2dWtYNy1zazU0OVJEN0wtT0pyLUJuUUtqZFJWMFFBNURLdkJvMXhheHNqMFQ3cUgtUmFFbm5HNV9sdEM1NDFWODNnYXpodkRhbUsyQmFHZms2QnE4enVsNkxyalhFQWpWUUZDUjBDdDMwenY4cllMSnhFcjljZUJtcUZLQ0lnaWtZQ1ZfQmJvNUZMRzRyN2w0SGxwa1JHZ1JFWUpUaHYyb1AyZllkUUtheTJGRmFNV2hCczdqZ2ZaeGJfaTdCcTJkRG10bGpMV1JwMHk1T0hlS3ZESTJONllIcUgzLWpwXzlCblBKWWdVUXBEV1Y1NV92Ty1LTngxT2J0OVladEhWTUstN2NIbm5xTlNTNzNraVlMM0l0WDZKOGhRSko1aXYtSmszZldXcVZ0a3V5WDh6ckZuNDJRQU5iIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZOa1h4MnA4bXdYWkFlRlc2YXV6OFRkemNXSWw2aEdpakNOM2dGYTkxZDA0WFlIc1B0dTJEWkJKY28xMHM2ZFJid2hFSWh3SFl4Y0dOWHhzMDlUNUxEVjNNTTl2RFJXc1VVVGZvVU0xYUdsWkJZWkI0MEJYUThXUTVDb3N3QTV0S3ZMaWRqeGdaQU9YMFpCd29kVFRhTlpDZ0xXbXI2N0hGTGFpWVVpMk94IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTY5NTg5NDh9; csrftoken=ojgEAHNEMW0Y5dk5SGxO6rM7snUUiYvj; ds_user_id=13224575476; sessionid=13224575476%3Ax5ih5lsClZLu2B%3A8; shbid=18989; shbts=1616958950.8120112; fbsr_124024574287414=25-UfQGNeV62gWETwLp5AOdCnnluEh39vetjBo3jwRY.eyJ1c2VyX2lkIjoiMTAwMDQzODA0MTc3NDYzIiwiY29kZSI6IkFRRGpTRmdsVmd1b3hXeEpOT29rb1FPbEFyVzcxdzY2dWtYNy1zazU0OVJEN0wtT0pyLUJuUUtqZFJWMFFBNURLdkJvMXhheHNqMFQ3cUgtUmFFbm5HNV9sdEM1NDFWODNnYXpodkRhbUsyQmFHZms2QnE4enVsNkxyalhFQWpWUUZDUjBDdDMwenY4cllMSnhFcjljZUJtcUZLQ0lnaWtZQ1ZfQmJvNUZMRzRyN2w0SGxwa1JHZ1JFWUpUaHYyb1AyZllkUUtheTJGRmFNV2hCczdqZ2ZaeGJfaTdCcTJkRG10bGpMV1JwMHk1T0hlS3ZESTJONllIcUgzLWpwXzlCblBKWWdVUXBEV1Y1NV92Ty1LTngxT2J0OVladEhWTUstN2NIbm5xTlNTNzNraVlMM0l0WDZKOGhRSko1aXYtSmszZldXcVZ0a3V5WDh6ckZuNDJRQU5iIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZOa1h4MnA4bXdYWkFlRlc2YXV6OFRkemNXSWw2aEdpakNOM2dGYTkxZDA0WFlIc1B0dTJEWkJKY28xMHM2ZFJid2hFSWh3SFl4Y0dOWHhzMDlUNUxEVjNNTTl2RFJXc1VVVGZvVU0xYUdsWkJZWkI0MEJYUThXUTVDb3N3QTV0S3ZMaWRqeGdaQU9YMFpCd29kVFRhTlpDZ0xXbXI2N0hGTGFpWVVpMk94IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTY5NTg5NDh9; rur=FRC";
    if (!UserName) return api.sendMessage('Vui lòng nhập username', threadID, messageID)
  axios.get(`https://www.instagram.com/${UserName}/?__a=1`, {
    headers: {
      cookie: `${cookie}`
    }
  }).then((response) => {
    let data = response.data.graphql.user;
    console.log(data)
    // Khai báo Y tế //
    let Bio = data.biography;
    let FullName = data.full_name;
    let ID = data.id;
    let Follow = data.edge_followed_by.count;
    let Follower = data.edge_follow.count;
    let Category = data.category_name;
    let CountPost = data.edge_owner_to_timeline_media.count;

    let Private = data.is_private;
    let Verified = data.is_verified;

    let UrlImg = data.profile_pic_url_hd;
    // Phân tích //

    let VeriIcon = Verified == false ? "❎" : Verified == true ? "☑️" : "Null";
    let PrivateIcon = Private == false ? "🔓" : Private == true ? "🔒" : "Null";

    // Gửi thông tin đi

    let callback = function() {
        api.sendMessage({
            body: `FullName: ${FullName}\nID: ${ID}\nBio: ${Bio}\nFollow: ${Follow}\nFollowers: ${Follower}\nPost: ${CountPost}\nPrivate: ${PrivateIcon}\nVerified: ${VeriIcon}`,
            attachment: fs.createReadStream(__dirname + `/cache/AvatarIns.png`)
        }, threadID, () => fs.unlinkSync(__dirname + `/cache/AvatarIns.png`), messageID);
    };
    request(UrlImg).pipe(fs.createWriteStream(__dirname + `/cache/AvatarIns.png`)).on("close", callback);
  }).catch((error) => {
    return api.sendMessage('Người dùng bạn nhập vào không đúng', threadID)
  })
}