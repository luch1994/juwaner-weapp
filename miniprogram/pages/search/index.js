// pages/search/index.js
const regeneratorRuntime = require('regenerator-runtime');

const {
  callFunction
} = require('../../common/utils.js');

Page({
  data: {
    inputVal: "",
    timeout: null,
    searchResult: []
  },
  onInput: function(e) {

    let value = e.detail.value;
    this.setData({
      inputVal: value
    });
    if (this.data.timeout) {
      clearTimeout(this.data.timeout);
    }
    if (!value) {
      return;
    }
    this.data.timeout = setTimeout(async() => {
      let res = await callFunction('search', {
        search: value
      });
      if (res.result.length === 0) {
        wx.showToast({
          title: '没有找到记录',
          icon: 'none'
        })
      }
      this.setData({
        searchResult: res.result
      });
    }, 500);
  },
  back() {
    wx.navigateBack({

    });
  }
})