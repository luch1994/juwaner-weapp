//app.js
const regeneratorRuntime = require('regenerator-runtime');
App({
  onLaunch: async function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      const {
        env
      } = require('./common/config.js');
      wx.cloud.init({
        env: env,
        traceUser: true,
      });
      const myEvent = require('./common/my-event.js');
      wx.myEvent = myEvent;
      const {
        getConfig
      } = require('./api/data.js');
      let config = await getConfig();
      wx.myEvent.pub('onGetConfig', config);
    }

    this.globalData = {}
  }
})