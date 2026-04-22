Page({
  data: {
    cateList: [
      { id: 1, name: "iPhone" },
      { id: 2, name: "Mac" },
      { id: 3, name: "iPad" },
      { id: 4, name: "Watch" },
      { id: 5, name: "音频" },
      { id: 6, name: "配件" }
    ],
    activeIndex: 0,
    goodsList: []
  },

  onLoad() {
    this.getGoodsByCate(1)
  },

  switchCate(e) {
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    this.setData({ activeIndex: index })
    this.getGoodsByCate(id)
  },

  getGoodsByCate(cateId) {
    let goods = []

    if (cateId == 1) {
      goods = [
        { id: 1, name: "iPhone 16 Pro Max", price: 9999, image: "/images/iphone16promax.png" },
        { id: 2, name: "iPhone 16 Pro", price: 8999, image: "/images/iphone16pro.png" },
        { id: 3, name: "iPhone 16", price: 6999, image: "/images/iphone16.png" },
        { id: 4, name: "iPhone 15 Pro Max", price: 8499, image: "/images/iphone15promax.png" },
        { id: 5, name: "iPhone 15 Pro", price: 7499, image: "/images/iphone15pro.png" },
        { id: 6, name: "iPhone 15", price: 5499, image: "/images/iphone15.png" }
      ]
    } else if (cateId == 2) {
      goods = [
        { id: 7, name: "MacBook Pro 16 M4", price: 19999, image: "/images/macbookpro16m4.png" },
        { id: 8, name: "MacBook Air 15 M3", price: 11999, image: "/images/macbookair15m3.png" },
        { id: 9, name: "iMac 24 M3", price: 10999, image: "/images/imac24.png" },
        { id: 10, name: "Mac Mini M4", price: 5299, image: "/images/macmini.png" }
      ]
    } else if (cateId == 3) {
      goods = [
        { id: 11, name: "iPad Pro M4", price: 8999, image: "/images/ipadpro13m4.png" }
      ]
    } else if (cateId == 4) {
      goods = [
        { id: 12, name: "Apple Watch Ultra 3", price: 6499, image: "/images/watchultra3.png" }
      ]
    } else if (cateId == 5) {
      goods = [
        { id: 13, name: "AirPods Pro 3", price: 1899, image: "/images/airpodspro3.png" },
        { id: 14, name: "AirPods Max", price: 3999, image: "/images/airpodsmax.png" },
        { id: 15, name: "HomePod mini", price: 749, image: "/images/homepodmini.png" },
        { id: 16, name: "HomePod 2", price: 2299, image: "/images/homepod.png" }
      ]
    } else if (cateId == 6) {
      goods = [
        { id: 17, name: "iPhone 16 透明手机壳", price: 299, image: "/images/iphone-case.png" },
        { id: 18, name: "20W USB‑C 充电器", price: 149, image: "/images/20w-charger.png" },
        { id: 19, name: "USB‑C to Lightning 线", price: 145, image: "/images/lightning-cable.png" },
        { id: 20, name: "MagSafe 外接电池", price: 749, image: "/images/magsafe-battery.png" }
      ]
    }

    this.setData({ goodsList: goods })
  },

  addCart(e) {
    const item = e.currentTarget.dataset.item
    let cartList = wx.getStorageSync('cartList') || []
    const index = cartList.findIndex(i => i.id === item.id)
    if (index > -1) {
      cartList[index].count += 1
    } else {
      cartList.push({ ...item, count: 1, selected: true })
    }
    wx.setStorageSync('cartList', cartList)
    wx.showToast({ title: '已加入购物车' })
  }
})