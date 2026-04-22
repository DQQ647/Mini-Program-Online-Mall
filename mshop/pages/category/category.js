const app = getApp();

Page({
  data: {
    activeIndex: 0,
    cateList: [
      { id: 1, name: "iPhone" },
      { id: 2, name: "Mac" },
      { id: 3, name: "iPad" },
      { id: 4, name: "Watch" },
      { id: 5, name: "AirPods" }
    ],
    allGoods: [
      { id: 1, name: "iPhone 17 Pro", price: 7999, image: "/images/tab/iPhone_17_Pro.jpg", cid: 1 },
      { id: 2, name: "iPhone 17", price: 5999, image: "/images/tab/iPhone17.jpg", cid: 1 },
      { id: 3, name: "MacBook Air M3", price: 8999, image: "/images/tab/MacBook_Air_M3.jpg", cid: 2 },
      { id: 4, name: "MacBook Pro 14", price: 12999, image: "/images/tab/MacBook_Pro_14.jpg", cid: 2 },
      { id: 5, name: "iPad Pro M4", price: 6799, image: "/images/tab/iPad_Pro_M4.jpg", cid: 3 },
      { id: 6, name: "iPad Air", price: 4599, image: "/images/tab/iPad_Air.jpg", cid: 3 },
      { id: 7, name: "Apple Watch S10", price: 1999, image: "/images/tab/Apple_Watch_S10.jpg", cid: 4 },
      { id: 8, name: "Watch SE3", price: 1299, image: "/images/tab/Watch_SE3.jpg", cid: 4 },
      { id: 9, name: "AirPods Pro 3", price: 1899, image: "/images/tab/AirPods_Pro3.jpg", cid: 5 },
      { id: 10, name: "AirPods 4", price: 999, image: "/images/tab/AirPods4.jpg", cid: 5 }
    ],
    goodsList: []
  },

  onLoad() {
    this.setData({
      goodsList: this.data.allGoods.filter(item => item.cid === 1)
    })
  },

  switchCate(e) {
    const index = e.currentTarget.dataset.index;
    const cid = this.data.cateList[index].id;
    this.setData({
      activeIndex: index,
      goodsList: this.data.allGoods.filter(item => item.cid === cid)
    });
  },

  addCart(e) {
    const item = e.currentTarget.dataset.item;
    let cart = app.globalData.cartList || [];
    cart.push(item);
    app.setCartList(cart);

    wx.showToast({
      title: '加入成功',
      icon: 'success'
    });
  }
});