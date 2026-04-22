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
      { id: 1, name: "iPhone 17 Pro", price: 7999, image: "https://img.icons8.com/400/iphone-17-pro.png", cid: 1 },
      { id: 2, name: "iPhone 17", price: 5999, image: "https://img.icons8.com/400/iphone-17.png", cid: 1 },
      { id: 3, name: "MacBook Air M3", price: 8999, image: "https://img.icons8.com/400/macbook-air.png", cid: 2 },
      { id: 4, name: "MacBook Pro 14", price: 12999, image: "https://img.icons8.com/400/macbook-pro.png", cid: 2 },
      { id: 5, name: "iPad Pro M4", price: 6799, image: "https://img.icons8.com/400/ipad-pro.png", cid: 3 },
      { id: 6, name: "iPad Air", price: 4599, image: "https://img.icons8.com/400/ipad-air.png", cid: 3 },
      { id: 7, name: "Apple Watch S10", price: 3199, image: "https://img.icons8.com/400/apple-watch.png", cid: 4 },
      { id: 8, name: "Watch SE", price: 1999, image: "https://img.icons8.com/400/apple-watch-se.png", cid: 4 },
      { id: 9, name: "AirPods Pro 3", price: 1899, image: "https://img.icons8.com/400/airpods-pro.png", cid: 5 },
      { id: 10, name: "AirPods 4", price: 999, image: "https://img.icons8.com/400/airpods.png", cid: 5 }
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