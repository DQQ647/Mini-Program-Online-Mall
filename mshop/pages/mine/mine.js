Page({
  data: {
    isLogin: false,
    userInfo: {},
    cartCount: 0 // 购物车数量
  },

  onShow() {
    this.checkLogin()
    this.getCartCount() // 每次进来刷新购物车数量
  },

  // 检查登录（你原来的代码，不动）
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

  // ==================
  // 新增：获取购物车数量
  // ==================
  getCartCount() {
    let cart = wx.getStorageSync('cart') || []
    this.setData({
      cartCount: cart.length
    })
  },

  // 跳转到登录页（你原来的）
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 跳转到订单（你原来的）
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

  // 客服
  goService() {
    wx.navigateTo({
      url: '/pages/service/service'
    })
  },

  // 关于我们
  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  // 退出登录
  logout() {
    wx.clearStorageSync()
    wx.showToast({ title: '退出成功' })
    this.checkLogin()
  },

  // ==================
  // 修复：跳转到购物车
  // ==================
  goCart() {
    wx.switchTab({
      url: "/pages/cart/cart"
    })
  }
})