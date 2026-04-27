const app = getApp();
Page({
  handleLogin() {
    wx.getUserProfile({
      desc: '完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('userInfo', res.userInfo);
        wx.showToast({ title: '登录成功' });
        setTimeout(() => wx.navigateBack(), 1000);
      }
    });
  }
})