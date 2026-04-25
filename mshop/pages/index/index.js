Page({
  data: {
    bannerList: [
      { id: 1, url: "http://localhost:3001/images/banner/1.jpg" },
      { id: 2, url: "http://localhost:3001/images/banner/2.png" },
      { id: 3, url: "http://localhost:3001/images/banner/3.jpg" },
    ],
    allGoods: [],    // 所有商品
    showList: [],    // 显示列表（搜索后变化）
    searchKey: ""    // 搜索关键词
  },

  onShow() {
    this.loadGoods();
  },

  // 加载全部商品
  loadGoods() {
    wx.showLoading({ title: '加载中' })
    let all = []
    wx.request({
      url: "http://localhost:3001/api/goods?page=1",
      success: res => {
        all = all.concat(res.data.data.result)
        wx.request({
          url: "http://localhost:3001/api/goods?page=2",
          success: res2 => {
            all = all.concat(res2.data.data.result)
            this.setData({ allGoods: all, showList: all })
            wx.hideLoading()
          }
        })
      }
    })
  },

  // ======================
  // 搜索功能（已实现）
  // ======================
  onSearchInput(e) {
    let key = e.detail.value
    this.setData({ searchKey: key })

    let list = this.data.allGoods.filter(item => {
      return item.title.includes(key)
    })
    this.setData({ showList: list })
  },

  // 跳转分类
  goCategory(e) {
    let type = e.currentTarget.dataset.type
    wx.switchTab({
      url: '/pages/category/category',
      success: () => {
        let page = getCurrentPages().pop()
        let idx = page.data.cateList.findIndex(i => i.type === type)
        page.setData({ currentIndex: idx })
        page.filterGoods(type)
      }
    })
  },

  // 跳转详情
  goDetail(e) {
    wx.navigateTo({ url: '/pages/details/details?id=' + e.currentTarget.dataset.id })
  }
})