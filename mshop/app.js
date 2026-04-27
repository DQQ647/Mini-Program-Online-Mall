import { request } from './utils/request.js';

App({
  globalData: {
    userInfo: null,
    token: "",
    openid: ""
  },

  onLaunch() {
    this.initGlobalData();
    this.checkLoginStatus();
  },

  initGlobalData() {
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null;
    this.globalData.token = wx.getStorageSync('token') || "";
    this.globalData.openid = wx.getStorageSync('openid') || "";
  },

  // 静默登录
  checkLoginStatus() {
    wx.login({
      success: async (res) => {
        if (res.code) {
          try {
            const loginRes = await request({
              url: 'http://localhost:3001/api/login', 
              method: 'POST',
              showMsg: false,
              data: { code: res.code }
            });
            if (loginRes.success) {
              this.globalData.token = loginRes.data.token;
              this.globalData.openid = loginRes.data.openid;
              wx.setStorageSync('token', loginRes.data.token);
              wx.setStorageSync('openid', loginRes.data.openid);
            }
          } catch (err) { console.log("静默登录跳过"); }
        }
      }
    });
  }
})