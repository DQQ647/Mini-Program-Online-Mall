Page({
  data: {
    cartList: [],
    totalPrice: 0
  },

  onShow() {
    this.getCartList()
  },

  // 获取购物车
  getCartList() {
    let cart = wx.getStorageSync('cart') || []
    let total = 0
    cart.forEach(item => {
      total += parseFloat(item.price)
    })
    this.setData({
      cartList: cart,
      totalPrice: total.toFixed(2)
    })
  },

  // 删除购物车
  delCart(e) {
    let id = e.currentTarget.dataset.id
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(item => item.id != id)
    wx.setStorageSync('cart', cart)
    this.getCartList()
    wx.showToast({ title: '删除成功' })
  },

  // 去结算
  toBuy() {
    wx.showToast({ title: '即将支持下单', icon: 'none' })
  }
})