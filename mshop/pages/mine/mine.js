const app = getApp(); // 引入全局 app 实例，用于清理全局登录状态

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

  // ==================
  // 🔥 核心优化：检查登录并设置指定头像
  // ==================
  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isLogin: true,
        userInfo: {
          ...userInfo,
          // 🌟 登录成功后，强制显示指定的本地图片
          avatarUrl: '/images/avatar.jpg',
          nickName: userInfo.nickName || '微信用户'
        }
      })
    } else {
      this.setData({
        isLogin: false,
        userInfo: {}
      })
    }
  },

  // 获取购物车数量
  getCartCount() {
    let cart = wx.getStorageSync('cart') || []
    this.setData({
      cartCount: cart.length
    })
  },

  // 跳转到登录页
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 跳转到订单
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
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync() // 清除本地缓存
          
          // 同步清理 app.js 里的全局状态
          if (app.globalData) {
            app.globalData.userInfo = null
            app.globalData.token = ""
          }
          
          this.checkLogin() // 刷新当前页面登录状态为未登录
          this.getCartCount() // 刷新购物车数量为0
          wx.showToast({ title: '已退出', icon: 'none' })
        }
      }
    })
  },

  // 跳转到购物车
  goCart() {
    wx.switchTab({
      url: "/pages/cart/cart"
    })
  }
})