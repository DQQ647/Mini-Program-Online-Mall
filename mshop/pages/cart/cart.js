Page({
  data: {
    cartList: []
  },

  onShow() {
    // 页面显示时，从本地存储获取购物车数据
    this.getCartList();
  },

  getCartList() {
    const cartList = wx.getStorageSync("cartList") || [];
    this.setData({
      cartList
    });
  },

  // 删除购物车商品
  delGoods(e) {
    const id = e.currentTarget.dataset.id;
    let cartList = wx.getStorageSync("cartList") || [];
    // 过滤掉要删除的商品
    cartList = cartList.filter(item => item.id !== id);
    // 更新本地存储
    wx.setStorageSync("cartList", cartList);
    // 更新页面数据
    this.setData({
      cartList
    });
    wx.showToast({
      title: "删除成功",
      icon: "success"
    });
  }
});