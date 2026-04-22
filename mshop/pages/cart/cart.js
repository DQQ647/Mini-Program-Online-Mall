const app = getApp();

Page({
  data: {
    cartList: [],
    selectedList: [], // 选中的商品
    totalPrice: 0, // 总价
    isAllSelected: false
  },

  onShow() {
    this.setData({
      cartList: app.globalData.cartList || []
    });
    this.calcTotalPrice();
  },

  // 选择商品
  selectItem(e) {
    const index = e.currentTarget.dataset.index;
    let selectedList = this.data.selectedList;
    selectedList[index] = !selectedList[index];
    this.setData({ selectedList });
    this.calcTotalPrice();
    this.checkIsAllSelected();
  },

  // 全选/取消全选
  selectAll() {
    let isAllSelected = !this.data.isAllSelected;
    let selectedList = this.data.cartList.map(() => isAllSelected);
    this.setData({ isAllSelected, selectedList });
    this.calcTotalPrice();
  },

  // 计算总价
  calcTotalPrice() {
    let total = 0;
    this.data.cartList.forEach((item, index) => {
      if (this.data.selectedList[index]) {
        total += item.price;
      }
    });
    this.setData({ totalPrice: total });
  },

  // 判断是否全选
  checkIsAllSelected() {
    let isAll = this.data.cartList.every((item, index) => this.data.selectedList[index]);
    this.setData({ isAllSelected: isAll });
  },

  // 删除商品
  delItem(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList.splice(index, 1);
    let selectedList = this.data.selectedList;
    selectedList.splice(index, 1);
    app.globalData.cartList = cartList;
    this.setData({ cartList, selectedList });
    this.calcTotalPrice();
    this.checkIsAllSelected();
  },

  // ✅ 结算功能
  checkout() {
    let hasSelected = this.data.selectedList.some(item => item);
    if (!hasSelected) {
      wx.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认结算',
      content: `总价：¥${this.data.totalPrice}`,
      success: (res) => {
        if (res.confirm) {
          // 清空选中的商品
          let newCart = [];
          this.data.cartList.forEach((item, index) => {
            if (!this.data.selectedList[index]) newCart.push(item);
          });
          app.globalData.cartList = newCart;
          this.setData({
            cartList: newCart,
            selectedList: [],
            totalPrice: 0,
            isAllSelected: false
          });
          wx.showToast({ title: '结算成功' });
        }
      }
    });
  }
});