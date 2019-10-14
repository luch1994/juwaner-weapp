const {
  envPrefix
} = require('./config.js');

function handleImgUrl(category, id, imgUrl) {
  let ext = imgUrl.slice(imgUrl.lastIndexOf('.'));
  return `${envPrefix}/${category}/${id}${ext}`;
}

function callFunction(name, data) {
  return wx.cloud.callFunction({
    name: name,
    data: data
  });
}

module.exports = {
  handleImgUrl,
  callFunction
};