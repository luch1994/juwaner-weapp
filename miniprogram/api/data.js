const regeneratorRuntime = require('regenerator-runtime');

const db = wx.cloud.database();

const getCategoryList = async() => {
  let res = await db.collection('categories').field({
    _id: true,
    text: true,
    totalCount: true
  }).get();
  return res.data;
};

const getDataList = async(categoryId, pageIndex, pageSize) => {
  let offset = (pageIndex - 1) * pageSize;
  let res = await db.collection(categoryId).field({
    _id: true,
    category: true,
    desc: true,
    largerImg: true,
    title: true
  }).skip(offset).limit(pageSize).get();
  return res.data;
}

const getDataDetail = async(categoryId, id) => {
  let res = await db.collection(categoryId).doc(id).field({
    _id: true,
    category: true,
    dbInfo: true,
    desc: true,
    largerImg: true,
    linkList: true,
    title: true
  }).get();
  return res.data;
};

const getConfig = async() => {
  let res = await db.collection('configs').doc('2c180102-0057-4f3c-9b46-877f3da29ce6').get();
  return res.data;
}

module.exports = {
  getCategoryList,
  getDataList,
  getDataDetail,
  getConfig
};