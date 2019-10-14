// pages/movie/detail.js
const regeneratorRuntime = require('regenerator-runtime');
const app = getApp();

const {
  getDataDetail
} = require('../../api/data.js');

const {
  handleImgUrl
} = require('../../common/utils.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    category: '',
    detail: null,
    desc: [],
    isShowPoster: false,
    painting: {},
    isShowLink: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.data.id = +options.id;
    this.data.category = options.category;

    let data = await getDataDetail(this.data.category, this.data.id);
    let desc = data.desc.split('<br/>');
    delete data.desc;
    data.imgUrl = handleImgUrl(data.category, data._id, data.largerImg);
    delete data.largerImg;

    this.setData({
      detail: data,
      desc
    });
    wx.setNavigationBarTitle({
      title: data.title,
    });

    wx.myEvent.sub('onGetConfig', this.onGetConfig);

  },

  onGetConfig(config) {
    this.setData({
      isShowLink: config.isShowLink
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.myEvent.remove('onGetConfig', this.onGetConfig);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: `${this.data.detail.title}免费看`,
      path: `/pages/movie/detail?id=${this.data.id}&category=${this.data.category}`,
      imageUrl: this.data.detail.imgUrl
    }
  },

  clipAll(e) {
    let i = +e.currentTarget.dataset.i;
    let type = e.currentTarget.dataset.type;
    let url = '';
    for (let item of this.data.detail.linkList[i]) {
      url += item[type];
      url += '\n';
    }
    url = url.slice(0, url.length - 1);
    wx.setClipboardData({
      data: url
    })
  },

  clipSingle(e) {
    let i = +e.currentTarget.dataset.i;
    let j = +e.currentTarget.dataset.j;
    let type = e.currentTarget.dataset.type;
    let url = this.data.detail.linkList[i][j][type];
    wx.setClipboardData({
      data: url
    });
  }
})