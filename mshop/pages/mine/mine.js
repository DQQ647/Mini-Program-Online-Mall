Page({
  data: {
    isLogin: false,
    userInfo: {}
  },

  onShow() {
    this.checkLogin()
  },

  checkLogin() {
    let user = wx.getStorageSync('userInfo')
    if (user) {
      this.setData({
        isLogin: true,
        userInfo: user
      })
    } else {
      this.setData({
        isLogin: false,
        userInfo: {}
      })
    }
  },

  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  goAddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },

  goService() {
    wx.navigateTo({
      url: '/pages/service/service'
    })
  },

  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  logout() {
    wx.clearStorageSync()
    wx.showToast({ title: '退出成功' })
    this.checkLogin()
  }
})