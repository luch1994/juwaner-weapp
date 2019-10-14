// 云函数入口文件
const cloud = require('wx-server-sdk')

const data = require('./combineData.js');

// 云函数入口函数
exports.main = async(event, context) => {
  let key = event.search;
  let searchResult = data.filter((item) => {
    return item.title.indexOf(key) >= 0;
  }).slice(0, 20);
  return searchResult;
}