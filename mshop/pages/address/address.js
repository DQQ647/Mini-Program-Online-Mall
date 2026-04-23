Page({
  data: {
    addressList: [
      {
        id: 1,
        name: "张三",
        phone: "13800138000",
        detail: "北京市朝阳区苹果总部大厦 1001 室",
        default: true
      },
      {
        id: 2,
        name: "李四",
        phone: "13900139000",
        detail: "上海市浦东新区陆家嘴金融中心 2002 室",
        default: false
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '我的收货地址' })
  },

  // 添加地址
  addAddress() {
    wx.showToast({ title: '去添加地址', icon: 'none' })
  },

  // 编辑地址
  editAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '编辑地址 ' + id, icon: 'none' })
  },

  // 删除地址
  deleteAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          let list = this.data.addressList.filter(item => item.id !== id)
          this.setData({ addressList: list })
          wx.showToast({ title: '删除成功' })
        }
      }
    })
  }
})