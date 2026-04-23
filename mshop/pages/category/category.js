Page({
  data: {
    // 左侧分类列表
    cateList: [
      { name: "热门推荐", type: "热门推荐" },
      { name: "手机数码", type: "手机数码" },
      { name: "家用电器", type: "家用电器" },
      { name: "电脑办公", type: "电脑办公" }
    ],
    currentIndex: 0,
    // 右侧商品列表
    goodsList: []
  },

  onLoad() {
    // 页面加载时，默认显示第一个分类
    this.getGoodsByCate("热门推荐")
  },

  // 切换左侧分类
  switchCate(e) {
    let index = e.currentTarget.dataset.index
    let type = this.data.cateList[index].type
    this.setData({ currentIndex: index })
    // 根据分类获取商品
    this.getGoodsByCate(type)
  },

  // 核心：根据分类从“内存数据”筛选商品（和你的数据库完全对应）
  getGoodsByCate(type) {
    // 这就是你数据库里的所有商品！
    let allGoods = [
      { id: 1, name: "松下相机", price: "21298", url: "http://localhost:3001/images/goods/1.webp", tag: "热门推荐" },
      { id: 2, name: "南孚充电电池", price: "159", url: "http://localhost:3001/images/goods/2.webp", tag: "热门推荐" },
      { id: 3, name: "佳能5d4相机", price: "15988", url: "http://localhost:3001/images/goods/3.webp", tag: "热门推荐" },
      { id: 4, name: "倍思100W充电器", price: "199", url: "http://localhost:3001/images/goods/4.webp", tag: "手机数码" },
      { id: 5, name: "佳能相机套餐", price: "60499", url: "http://localhost:3001/images/goods/5.webp", tag: "手机数码" },
      { id: 6, name: "小提琴弱音器", price: "68", url: "http://localhost:3001/images/goods/6.webp", tag: "手机数码" },
      { id: 7, name: "佳能5D4兔笼", price: "310", url: "http://localhost:3001/images/goods/7.webp", tag: "手机数码" },
      { id: 8, name: "Apple iPhone 11", price: "4099", url: "http://localhost:3001/images/goods/8.webp", tag: "手机数码" },
      { id: 9, name: "ROKID Air智能眼镜", price: "2999", url: "http://localhost:3001/images/goods/9.webp", tag: "家用电器" },
      { id: 10, name: "倍思65W充电器", price: "118", url: "http://localhost:3001/images/goods/10.webp", tag: "家用电器" },
      { id: 11, name: "斯莫格5D4兔笼", price: "699", url: "http://localhost:3001/images/goods/11.webp", tag: "家用电器" },
      { id: 12, name: "南孚5号电池", price: "29", url: "http://localhost:3001/images/goods/12.webp", tag: "家用电器" },
      { id: 13, name: "潘多拉串饰", price: "348", url: "http://localhost:3001/images/goods/13.webp", tag: "电脑办公" },
      { id: 14, name: "iPhone 13 Pro Max", price: "8699", url: "http://localhost:3001/images/goods/14.webp", tag: "电脑办公" },
    ];

    // 筛选对应分类的商品
    let result = allGoods.filter(item => item.tag === type)
    this.setData({ goodsList: result })
  },

  // 点击商品进入详情
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  }
})