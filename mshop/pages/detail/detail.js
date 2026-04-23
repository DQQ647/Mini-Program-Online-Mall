Page({
  data: {
    info: {}
  },

  onLoad(options) {
    let id = options.id;
    wx.request({
      url: 'http://localhost:3001/getGoodsDetail',
      data: { id },
      success: res => {
        this.setData({ info: res.data[0] });
      }
    })
  }
})