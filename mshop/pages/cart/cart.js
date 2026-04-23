Page({
  data: {
    cartList: [],
    total: 0
  },

  onShow() {
    this.getCartData()
  },

  getCartData() {
    wx.request({
      url: "http://localhost:3001/getCart",
      success: res => {
        let list = res.data
        let sum = 0
        list.forEach(v => {
          sum += Number(v.price)
        })
        this.setData({
          cartList: list,
          total: sum
        })
      }
    })
  },

  del(e) {
    let id = e.currentTarget.dataset.id
    wx.request({
      url: "http://localhost:3001/delCart",
      method: "POST",
      data: { id },
      success: () => {
        wx.showToast({ title: "删除成功" })
        this.getCartData()
      }
    })
  }
})