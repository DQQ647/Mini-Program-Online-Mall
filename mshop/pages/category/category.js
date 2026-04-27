Page({
  data: {
    cateList: [
      { name: "热门推荐", type: "热门推荐" },
      { name: "手机数码", type: "手机数码" },
      { name: "家用电器", type: "家用电器" },
      { name: "电脑办公", type: "电脑办公" }
    ],
    currentIndex: 0,
    goodsList: [],
    allGoods: []
  },

  onLoad(options) {
    // 接收首页传过来的分类
    if (options.type) {
      let idx = this.data.cateList.findIndex(t => t.type == options.type);
      if (idx >= 0) {
        this.setData({ currentIndex: idx });
      }
    }
    this.loadAllData();
  },

  // 切换左侧分类
  switchCate(e) {
    let index = e.currentTarget.dataset.index;
    let type = this.data.cateList[index].type;
    this.setData({ currentIndex: index });
    this.filterGoods(type);
  },

  // 修改后的 category.js
loadAllData() {
  wx.showLoading({ title: "加载中..." });
  
  wx.request({
    url: "http://localhost:3001/api/goods", 
    success: (res) => {
      // 检查返回数据结构是否正确
      let all = res.data.data?.result || [];
      
      this.setData({ allGoods: all });

      // 默认显示当前选中的分类商品
      let defaultType = this.data.cateList[this.data.currentIndex].type;
      this.filterGoods(defaultType);
      
      wx.hideLoading();
    },
    fail: () => {
      wx.hideLoading();
      wx.showToast({ title: '网络请求失败', icon: 'none' });
    }
  });
},

  // 筛选对应分类商品
  filterGoods(type) {
    let showList = this.data.allGoods.filter(item => item.tag === type);
    this.setData({ goodsList: showList });
  },

  // 进入商品详情
  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/details/details?id=" + id
    });
  },

  // 直接跳转到首页
  goHome() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  }
});