Page({
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '400-888-9999',
      fail: () => {
        wx.showToast({ title: '拨号失败', icon: 'none' })
      }
    })
  },

  openChat() {
    wx.showToast({ title: '进入在线客服', icon: 'success' })
    // 可跳转到客服聊天页面
    // wx.navigateTo({ url: '/pages/service/chat/chat' })
  }
})