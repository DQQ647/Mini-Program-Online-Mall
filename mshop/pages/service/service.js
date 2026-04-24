// 完全保留你原来的结构，只加客服功能
Page({
  data: {},

  onLoad(options) {},

  // 拨打客服电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '400-888-9999'
    })
  },

  // 进入在线客服聊天（真实功能）
  goToChat() {
    wx.navigateTo({
      url: '/pages/service/chat/chat'
    })
  }
})