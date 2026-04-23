Page({
  data: {
    swiperList: [],
    goodsList: []
  },

  onLoad() {
    this.getBanner()
    this.getGoods()
  },

  // 轮播
  getBanner() {
    wx.request({
      url: "http://localhost:3001/getBanner",
      success: res => {
        this.setData({ swiperList: res.data })
      }
    })
  },

  // 商品
  getGoods() {
    wx.request({
      url: "http://localhost:3001/getGoods",
      success: res => {
        this.setData({ goodsList: res.data })
      }
    })
  },

  goDetail(e) {
    wx.navigateTo({
      url: "/pages/details/details?id=" + e.currentTarget.dataset.id
    })
  },

  goToRecycle() {
    wx.navigateTo({ url: "/pages/recycle/recycle" })
  }
})