Page({
  data: {
    isLogin: false,
    userInfo: {}
  },

  onShow() {
    // 每次进入页面都检查登录状态
    this.checkLogin()
  },

  // 检查本地存储中的用户信息
  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isLogin: true,
        userInfo
      })
    } else {
      this.setData({
        isLogin: false,
        userInfo: {}
      })
    }
  },

  // 跳转到登录页
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 跳转到订单列表（带状态参数）
  goOrderList(e) {
    const status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: `/pages/order/order?status=${status}`
    })
  },

  // 跳转到收货地址
  goAddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },

  // 跳转到客服页面
  goService() {
    wx.navigateTo({
      url: '/pages/service/service'
    })
  },

  // 跳转到关于我们
  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  // 退出登录，清除本地存储
  logout() {
    wx.clearStorageSync()
    wx.showToast({ title: '退出成功' })
    this.checkLogin()
  }
})