Page({
  onLoad() {
    wx.setNavigationBarTitle({ title: '联系客服' })
  },

  // 拨打客服电话
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '400-666-8888',
    })
  }
})