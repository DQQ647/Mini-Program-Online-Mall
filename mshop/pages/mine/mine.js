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

  // 微信授权登录 获取真实头像昵称
  getUserProfile() {
    if (this.data.userInfo) {
      return
    }
    wx.getUserProfile({
      desc: '用于展示个人头像与昵称',
      success: (res) => {
        // 保存到全局 + 本地缓存
        app.saveUserInfo(res.userInfo)
        this.setData({
          userInfo: res.userInfo
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      },
      fail: () => {
        wx.showToast({
          title: '取消登录',
          icon: 'none'
        })
      }
    })
  },

  // 退出登录
  logout() {
    app.saveUserInfo(null)
    this.setData({
      userInfo: null
    })
    wx.showToast({
      title: '退出成功',
      icon: 'success'
    })
  },

  // 待发货/待收货/已完成/全部订单 跳转
  goToOrderList(e) {
    if (!this.data.userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录再查看订单',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            this.getUserProfile()
          }
        }
      })
      return
    }
    const status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: `/pages/order/order?status=${status}`
    })
  },

  // 收货地址
  goToAddress() {
    if (!this.data.userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            this.getUserProfile()
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },

  // 联系客服【已修复，可正常跳转】
  goToService() {
    wx.navigateTo({
      url: '/pages/service/service'
    })
  },

  // 关于我们
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  }
})