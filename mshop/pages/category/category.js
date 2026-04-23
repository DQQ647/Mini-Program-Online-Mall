Page({
  data: {
    cateList: [
      { tag: "热门推荐", name: "热门推荐" },
      { tag: "手机数码", name: "手机数码" },
      { tag: "家用电器", name: "家用电器" },
      { tag: "电脑办公", name: "电脑办公" },
    ],
    goodsList: [],
    activeTag: "热门推荐",
    showGoods: []
  },

  onLoad() {
    this.getGoods()
  },

  getGoods() {
    wx.request({
      url: "http://localhost:3001/getGoods",
      success: (res) => {
        this.setData({
          goodsList: res.data,
          showGoods: res.data.filter(i => i.tag == this.data.activeTag)
        })
      }
    })
  },

  switchCate(e) {
    let tag = e.currentTarget.dataset.tag
    let show = this.data.goodsList.filter(i => i.tag == tag)
    this.setData({
      activeTag: tag,
      showGoods: show
    })
  },

  addToCart(e) {
    let item = e.currentTarget.dataset.item
    wx.request({
      url: "http://localhost:3001/addCart",
      method: "POST",
      data: {
        title: item.title,
        image: item.url,
        price: item.price,
        currentID: item.id
      },
      success: res => {
        if (res.data.code === 1) {
          wx.showToast({ title: "加入成功", icon: "success" })
        }
      }
    })
  }
})