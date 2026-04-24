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

  onLoad() {
    this.getAllData()
  },

  switchCate(e) {
    let index = e.currentTarget.dataset.index
    let type = this.data.cateList[index].type
    this.setData({ currentIndex: index })
    this.getByType(type)
  },

  getAllData() {
    wx.showLoading({ title: '加载中...' })
    let all = []

    // 第 1 页
    wx.request({
      url: 'http://localhost:3001/api/goods?page=1',
      success: res1 => {
        all = all.concat(res1.data.data.result || [])

        // 第 2 页
        wx.request({
          url: 'http://localhost:3001/api/goods?page=2',
          success: res2 => {
            all = all.concat(res2.data.data.result || [])
            this.setData({ allGoods: all })
            this.getByType("热门推荐")
            wx.hideLoading()
          }
        })
      }
    })
  },

  getByType(type) {
    let list = this.data.allGoods.filter(item => item.tag === type)
    this.setData({ goodsList: list })
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/details/details?id='+id })
  }
})