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
    if (options.type) {
      const idx = this.data.cateList.findIndex(t => t.type == options.type);
      if (idx >= 0) {
        this.setData({ currentIndex: idx });
      }
    }
    this.loadData();
  },

  loadData() {
    wx.showLoading({ title: "加载中...", mask: true });
    
    wx.request({
      url: "http://localhost:3001/api/goods",
      success: (res) => {
        const all = res.data.data?.result || [];
        this.setData({ allGoods: all });
        this.filterByCurrentIndex();
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: '数据加载失败', icon: 'none' });
      }
    });
  },

  switchCate(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentIndex: index });
    this.filterByCurrentIndex();
  },

  filterByCurrentIndex() {
    const type = this.data.cateList[this.data.currentIndex].type;
    const filtered = this.data.allGoods.filter(item => item.tag === type);
    this.setData({ goodsList: filtered });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: "/pages/details/details?id=" + id });
  },

  // 🌟 新增：处理返回按钮的逻辑 🌟
  goBack() {
    const pages = getCurrentPages();
    // 如果页面栈大于 1，说明是从详情页等其他非 Tab 页跳过来的，正常返回
    if (pages.length > 1) {
      wx.navigateBack({ delta: 1 });
    } else {
      // 如果页面栈只有 1，说明是直接点进来的，强制跳转回首页 Tab
      wx.switchTab({ url: '/pages/index/index' });
    }
  }
});