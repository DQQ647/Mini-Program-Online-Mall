Page({
  openWebsite() {
    wx.showToast({ title: '打开官网', icon: 'success' })
    // 可使用 web-view 打开网页
    // wx.navigateTo({ url: '/pages/webview/webview?url=https://www.apple.com' })
  }
})