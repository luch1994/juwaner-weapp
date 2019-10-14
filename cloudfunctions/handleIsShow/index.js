// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  let now = new Date();
  let hour = now.getHours() + 8;
  let isShowLink = false;
  if (hour < 18 && hour > 8) {
    isShowLink = false;
  } else {
    isShowLink = true;
  }
  await db.collection('configs').doc('2c180102-0057-4f3c-9b46-877f3da29ce6').update({
    data: {
      isShowLink: isShowLink
    }
  })
  return isShowLink;
}