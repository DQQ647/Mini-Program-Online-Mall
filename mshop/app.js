// app.js
App({
  onLaunch() {
    // 展示本地存储能力（保留你原有代码）
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录逻辑（保留你原有代码）
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log("微信登录成功，code：", res.code);
        }
      }
    })

    // 👇 商城项目必备优化（文档要求）
    this.initGlobalData()      // 初始化全局数据
    this.checkUserInfo()       // 检查用户登录状态
  },

  // 全局数据（严格按照商城文档规范定义）
  globalData: {
    userInfo: null,            // 用户信息
    token: "",                // 用户登录令牌（接口必备）
    cartList: [],             // 购物车数据
    baseUrl: "https://api.xxx.com", // 接口请求地址
    cateList: [],             // 商品分类数据
    orderList: []             // 订单数据
  },

  // 初始化全局商城数据
  initGlobalData() {
    try {
      // 从本地缓存读取购物车
      const cartList = wx.getStorageSync('cartList') || []
      // 从本地缓存读取用户信息
      const userInfo = wx.getStorageSync('userInfo') || null
      // 从本地缓存读取token
      const token = wx.getStorageSync('token') || ''

      this.globalData.cartList = cartList
      this.globalData.userInfo = userInfo
      this.globalData.token = token

      console.log("✅ 全局数据初始化完成")
    } catch (e) {
      console.log("❌ 数据初始化失败", e)
    }
  },

  // 检查用户登录状态（商城必备）
  checkUserInfo() {
    if (this.globalData.userInfo) {
      console.log("✅ 用户已登录")
    } else {
      console.log("ℹ️ 用户未登录，可引导授权")
    }
  },

  // 通用设置购物车数据（全局方法）
  setCartList(cart) {
    this.globalData.cartList = cart
    wx.setStorageSync('cartList', cart)
  },

  // 通用保存用户信息
  saveUserInfo(userInfo) {
    this.globalData.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
  }
})