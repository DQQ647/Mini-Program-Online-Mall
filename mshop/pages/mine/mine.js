// pages/mine/mine.js
const app = getApp()

Page({
  data: {
    userInfo: null
  },

  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  // 退出登录
  logout() {
    app.globalData.userInfo = null
    this.setData({
      userInfo: null
    })
    wx.showToast({
      title: '退出成功',
      icon: 'success'
    })
  }
})