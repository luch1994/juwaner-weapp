//index.js
const regeneratorRuntime = require('regenerator-runtime');
const app = getApp();
const {
  getCategoryList
} = require('../../api/data.js');

Page({
  data: {
    categoryList: [],
    bannerImgs: ["/images/juwaner-banner-0.png", "/images/juwaner-banner-1.png"]
  },

  async onLoad() {
    let data = await getCategoryList();
    data.shift();
    this.setData({
      categoryList: data
    });
    app.globalData.categories = data;

  },

  onShareAppMessage() {
    return {
      title: '海量资源等你来发现',
      imageUrl: '/images/share.png'
    }
  },

  onSearch() {
    wx.navigateTo({
      url: '../search/index',
    })
  }

})