Page({
  login() {
    wx.getUserProfile({
      desc: '登录',
      success: res => {
        let user = {
          nickName: res.userInfo.nickName,
          avatarUrl: "/images/avatar.jpg"
        }
        wx.setStorageSync('userInfo', user)
        wx.showToast({ title: '登录成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 500)
      }
    })
  }
})