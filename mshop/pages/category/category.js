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
    goodsList: [
      // iPhone 系列
      {
        id: 1,
        name: "iPhone 17 Pro",
        price: "7999",
        image: "https://picsum.photos/id/160/400/400"
      },
      {
        id: 2,
        name: "iPhone 17",
        price: "5999",
        image: "https://picsum.photos/id/160/400/400"
      },
      // Mac 系列
      {
        id: 3,
        name: "MacBook Air M3",
        price: "8999",
        image: "https://picsum.photos/id/48/400/400"
      },
      {
        id: 4,
        name: "MacBook Pro 14",
        price: "12999",
        image: "https://picsum.photos/id/48/400/400"
      },
      // iPad 系列
      {
        id: 5,
        name: "iPad Pro M4",
        price: "6799",
        image: "https://picsum.photos/id/110/400/400"
      },
      {
        id: 6,
        name: "iPad Air",
        price: "4599",
        image: "https://picsum.photos/id/110/400/400"
      },
      // Watch 系列
      {
        id: 7,
        name: "Apple Watch S10",
        price: "3199",
        image: "https://picsum.photos/id/133/400/400"
      },
      {
        id: 8,
        name: "Watch SE",
        price: "1999",
        image: "https://picsum.photos/id/133/400/400"
      },
      // AirPods 系列
      {
        id: 9,
        name: "AirPods Pro 3",
        price: "1899",
        image: "https://picsum.photos/id/76/400/400"
      },
      {
        id:10,
        name: "AirPods 4",
        price: "999",
        image: "https://picsum.photos/id/76/400/400"
      }
    ]
  },

  switchCate(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
  },

  addCart() {
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
  }
})