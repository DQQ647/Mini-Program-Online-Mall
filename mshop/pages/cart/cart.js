const app = getApp()

Page({
  data: {
    cartList: []
  },

  onShow() {
    this.setData({
      cartList: app.globalData.cartList || []
    })
  },

  delCart(e) {
    const index = e.currentTarget.dataset.index
    let cart = app.globalData.cartList
    cart.splice(index, 1)
    app.setCartList(cart)
    
    this.setData({
      cartList: cart
    })

    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
  }
})