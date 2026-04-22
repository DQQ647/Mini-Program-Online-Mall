// pages/cart/cart.js
Page({
  data: {
    cartList: [],
    isAllSelected: false,
    totalPrice: 0,
    totalCount: 0
  },

  onShow() {
    this.getCartList();
  },

  // 获取购物车数据（纯本地存储，不依赖后端）
  getCartList() {
    try {
      const cartList = wx.getStorageSync('cartList') || [];
      this.setData({
        cartList
      }, () => {
        this.calcTotal();
        this.isAllSelect();
      });
    } catch (e) {
      console.error('读取购物车失败', e);
    }
  },

  // 单个商品选中/取消选中
  selectItem(e) {
    const id = e.currentTarget.dataset.id;
    let cartList = this.data.cartList;

    cartList = cartList.map(item => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });

    this.setData({ cartList }, () => {
      this.calcTotal();
      this.isAllSelect();
      wx.setStorageSync('cartList', cartList);
    });
  },

  // 全选/取消全选
  selectAll() {
    let isAllSelected = !this.data.isAllSelected;
    let cartList = this.data.cartList;

    cartList.forEach(item => {
      item.selected = isAllSelected;
    });

    this.setData({
      cartList,
      isAllSelected
    }, () => {
      this.calcTotal();
      wx.setStorageSync('cartList', cartList);
    });
  },

  // 判断是否全选
  isAllSelect() {
    const cartList = this.data.cartList;
    if (cartList.length === 0) {
      this.setData({ isAllSelected: false });
      return;
    }
    const allSelected = cartList.every(item => item.selected);
    this.setData({ isAllSelected: allSelected });
  },

  // 减少商品数量
  minusCount(e) {
    const id = e.currentTarget.dataset.id;
    let cartList = this.data.cartList;

    cartList = cartList.map(item => {
      if (item.id === id && item.count > 1) {
        item.count--;
      }
      return item;
    });

    this.setData({ cartList }, () => {
      this.calcTotal();
      wx.setStorageSync('cartList', cartList);
    });
  },

  // 增加商品数量
  plusCount(e) {
    const id = e.currentTarget.dataset.id;
    let cartList = this.data.cartList;

    cartList = cartList.map(item => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });

    this.setData({ cartList }, () => {
      this.calcTotal();
      wx.setStorageSync('cartList', cartList);
    });
  },

  // 删除商品（带确认弹窗）
  delGoods(e) {
    const id = e.currentTarget.dataset.id;
    let cartList = this.data.cartList;

    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          cartList = cartList.filter(item => item.id !== id);
          this.setData({ cartList }, () => {
            this.calcTotal();
            this.isAllSelect();
            wx.setStorageSync('cartList', cartList);
          });
          wx.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  },

  // 计算总价和总数量
  calcTotal() {
    const cartList = this.data.cartList;
    let totalPrice = 0;
    let totalCount = 0;

    cartList.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.count;
        totalCount += item.count;
      }
    });

    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalCount
    });
  },

  // 去结算
  goSettle() {
    if (this.data.totalCount === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '结算功能开发中',
      icon: 'none'
    });
  }
});