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
  // 最终版结算 → 生成待发货订单
  // ==============================
  goCheckout() {
    if (this.data.cartList.length === 0) {
      wx.showToast({ title: '购物车不能为空', icon: 'none' });
      return;
    }

    // 1. 计算
    let totalPrice = 0;
    let totalNum = 0;
    this.data.cartList.forEach(item => {
      totalPrice += item.price * item.num;
      totalNum += item.num;
    });

    // 2. 生成订单（完全适配你的订单格式）
    let newOrder = {
      orderNo: "ORD" + Date.now(),
      status: 0,    // 0 = 待发货 ✅
      totalPrice: totalPrice.toFixed(2),
      totalNum: totalNum,
      goodsList: this.data.cartList.map(item => ({
        pic: item.url || `http://localhost:3001/images/goods/${item.id}.webp`,
        name: item.title,
        price: item.price,
        num: item.num,
        id: item.id
      }))
    };

    // 3. 写入本地 orderList ✅
    let orderList = wx.getStorageSync("orderList") || [];
    orderList.unshift(newOrder);
    wx.setStorageSync("orderList", orderList);

    // 4. 清空购物车
    wx.setStorageSync("cart", []);
    this.setData({ cartList: [], totalPrice: "0.00" });

    // 5. 跳转到 待发货
    wx.showToast({ title: "下单成功 → 待发货", icon: "success" });
    setTimeout(() => {
      wx.navigateTo({
        url: "/pages/order/order?status=0"
      });
    }, 1500);
  }
});