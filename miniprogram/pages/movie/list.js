// pages/movie/list.js
const regeneratorRuntime = require('regenerator-runtime');
const app = getApp();

const {
  handleImgUrl
} = require('../../common/utils.js');

const {
  getDataList
} = require('../../api/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageIndex: 1,
    pageSize: 20,
    hasNextPage: true,
    isLoading: false,
    category: '',
    name: '',
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let category = options.category;
    this.data.category = category;
    this.setData({
      name: options.name
    });
    wx.setNavigationBarTitle({
      title: options.name
    });

    let totalCount = 0;
    for (let item of app.globalData.categories) {
      if (item._id === category) {
        totalCount = item.totalCount;
        break;
      }
    }
    this.data.totalCount = totalCount;

    if (app.globalData[category]) {
      this.setData({
        list: app.globalData[category].list
      });
      this.data.pageIndex = app.globalData[category].pageIndex;
    } else {
      this._getData();
    }

  },

  async _getData() {
    if (!this.data.hasNextPage) {
      return;
    }
    if (this.data.isLoading) {
      return;
    }
    if (!this.data.category) {
      return;
    }
    this.setData({
      isLoading: true
    });
    let category = this.data.category;
    let data = await getDataList(category, this.data.pageIndex, this.data.pageSize);
    data = data.map((item) => {
      item.imgUrl = handleImgUrl(category, item._id, item.largerImg);
      delete item.largerImg;
      return item;
    });

    this.data.pageIndex++;
    if (!app.globalData[category]) {
      app.globalData[category] = {
        list: [],
        pageIndex: 0
      }
    }
    app.globalData[category].list = app.globalData[category].list.concat(data);
    app.globalData[category].pageIndex = this.data.pageIndex;

    let hasNextPage = true;
    if (app.globalData[category].list.length >= this.data.totalCount) {
      hasNextPage = false;
    }

    this.setData({
      list: app.globalData[category].list,
      isLoading: false,
      hasNextPage
    });
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
    this._getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '海量资源等你来发现',
      imageUrl: '/images/share.png',
      path: `/pages/movie/list?category=${this.data.category}&name=${this.data.name}`
    }
  }
})