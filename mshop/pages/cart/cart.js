Page({
  data: {
    cartList: [],
    totalPrice: 0
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    let cart = wx.getStorageSync('cart') || [];
    
    // 强制转数字，杜绝 NaN
    cart = cart.map(item => {
      item.price = Number(item.price) || 0;
      item.num = Number(item.num) || 1;
      return item;
    });

    this.setData({ cartList: cart });
    this.calcTotal();
  },

  calcTotal() {
    let total = 0;
    this.data.cartList.forEach(item => {
      total += (Number(item.price) || 0) * (Number(item.num) || 0);
    });
    this.setData({ totalPrice: total.toFixed(2) });
  },

  changeNum(e) {
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let list = this.data.cartList;

    let index = list.findIndex(item => item.id === id);
    if (index === -1) return;

    if (type === 'minus') {
      if (list[index].num > 1) {
        list[index].num--;
      } else {
        wx.showToast({ title: '数量不能小于1', icon: 'none' });
        return;
      }
    } else {
      list[index].num++;
    }

    this.setData({ cartList: list });
    wx.setStorageSync('cart', list);
    this.calcTotal();
  },

  deleteGoods(e) {
    let id = e.currentTarget.dataset.id;
    let list = this.data.cartList.filter(item => item.id !== id);
    this.setData({ cartList: list });
    wx.setStorageSync('cart', list);
    this.calcTotal();
    wx.showToast({ title: '删除成功', icon: 'success' });
  },

  // ==============================
  // 结算跳转到订单确认页
  // ==============================
  goCheckout() {
    if (this.data.cartList.length === 0) {
      wx.showToast({ title: '购物车不能为空', icon: 'none' });
      return;
    }

    // 取购物车里的商品去结算 (如果需要处理多商品，可以在这里扩展，目前取第一个)
    let goods = this.data.cartList[0];
    
    // 跳转到订单确认页，并把商品信息带过去
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?goodsInfo=${encodeURIComponent(JSON.stringify(goods))}&num=${goods.num}`
    });
  }
});