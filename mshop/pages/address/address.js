Page({
  data: {
    addressList: [],
    fromPage: ''
  },

  onLoad(options) {
    this.setData({
      fromPage: options.from || ''
    })
  },

  onShow() {
    this.loadAddress()
  },

  loadAddress() {
    let list = wx.getStorageSync('addressList') || [
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
        detail: '建国路88号',
        isDefault: true
      },
      {
        id: 2,
        name: '李四',
        phone: '13900139000',
        province: '上海市',
        city: '上海市',
        district: '浦东新区',
        detail: '张江高科技园区',
        isDefault: false
      }
    ]
    this.setData({ addressList: list })
  },

  addAddress() {
    wx.navigateTo({ url: '/pages/address/add/add' })
  },

  editAddress(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/address/add/add?id=${id}` })
  },

  deleteAddress(e) {
    let id = e.currentTarget.dataset.id
    let list = this.data.addressList.filter(item => item.id !== id)
    this.setData({ addressList: list })
    wx.setStorageSync('addressList', list)
    wx.showToast({ title: '删除成功' })
  },

  setDefault(e) {
    let id = e.currentTarget.dataset.id
    let list = this.data.addressList.map(item => {
      item.isDefault = (item.id == id)
      return item
    })
    this.setData({ addressList: list })
    wx.setStorageSync('addressList', list)
    wx.showToast({ title: '已设为默认地址' })
  },

  selectAddress(e) {
    if (this.data.fromPage === 'confirm') {
      let id = e.currentTarget.dataset.id
      let list = this.data.addressList.map(item => {
        item.isDefault = item.id == id
        return item
      })
      wx.setStorageSync('addressList', list)
      wx.navigateBack()
    }
  }
})