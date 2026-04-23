Page({
  data: {
    cateList: [
      { name: "手机" },
      { name: "电脑" },
      { name: "平板" },
      { name: "耳机" },
      { name: "手表" }
    ],
    currentIndex: 0,
    goodsList: [
      { id: 1, name: "iPhone 15", price: 5999, url: "/images/goods/1.jpg" },
      { id: 2, name: "MacBook Pro", price: 12999, url: "/images/goods/2.jpg" },
      { id: 3, name: "iPad Air", price: 4599, url: "/images/goods/3.jpg" },
      { id: 4, name: "AirPods Pro", price: 1899, url: "/images/goods/4.jpg" },
    ]
  },

  switchCate(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  }
})