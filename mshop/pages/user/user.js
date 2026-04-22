Page({
  data: {},
  // 跳转到订单页
  goToOrder() {
    wx.navigateTo({ url: '/pages/order/order' })
  },
  // 跳转到设备页（可自行创建）
  goToDevice() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },
  // 跳转到收藏页（可自行创建）
  goToFavorite() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },
  // 跳转到地址页（可自行创建）
  goToAddress() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },
  // 跳转到设置页（可自行创建）
  goToSettings() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },
  // 跳转到关于页（可自行创建）
  goToAbout() {
    wx.showToast({ title: '百战商城 v1.0', icon: 'none' })
  },
  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.reLaunch({ url: '/pages/login/login' })
        }
      }
    })
  }
})