Page({
  data: {
    swiperList: []
  },

  onLoad() {
    this.getBanner()
  },

  // 只保留轮播广告
  getBanner() {
    wx.request({
      url: "http://localhost:3001/getBanner",
      success: res => {
        this.setData({
          swiperList: res.data
        })
      }
    })
  }
})