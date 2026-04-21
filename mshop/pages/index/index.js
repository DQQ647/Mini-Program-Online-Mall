Page({
  data: {
    bannerList: [],
    goodList: [],
    navList: [
      { text: "手机" },
      { text: "家电" },
      { text: "服饰" },
      { text: "零食" },
      { text: "美妆" },
      { text: "家具" },
      { text: "鞋包" },
      { text: "更多" }
    ]
  },

  onLoad(options) {
    this.getBannerData();
    this.getGoodsData();
  },

  getBannerData() {
    // 这里替换为你真实的接口请求
    console.log("获取轮播数据");
  },

  getGoodsData() {
    // 这里替换为你真实的接口请求
    console.log("获取商品数据");
  },

  // 点击商品跳转到详情页
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});