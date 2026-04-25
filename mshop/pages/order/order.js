Page({
  data: {
    currentTab: 'all',
    orderList: []
  },

  onLoad(options) {
    const status = options.status || 'all'
    this.setData({ currentTab: status })
    this.loadOrderList(status)
  },

  onShow() {
    this.loadOrderList(this.data.currentTab)
  },

  switchTab(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentTab: status })
    this.loadOrderList(status)
  },

  loadOrderList(status) {
    let allOrders = wx.getStorageSync('orderList') || []
    const statusMap = {
      '0': 0,
      '1': 1,
      '2': 2
    }

    let list = []
    if (status === 'all') {
      list = allOrders
    } else {
      list = allOrders.filter(item => item.status === statusMap[status])
    }

    list = list.map(item => {
      let statusText = ''
      switch(item.status) {
        case 0: statusText = '待发货'; break
        case 1: statusText = '待收货'; break
        case 2: statusText = '已完成'; break
      }
      return { ...item, statusText }
    })

    this.setData({ orderList: list })
    this.autoOrderStatus()
  },

  autoOrderStatus() {
    let orderList = wx.getStorageSync('orderList') || []

    orderList.forEach((item, index) => {
      if (item.status === 0) {
        setTimeout(() => {
          let orders = wx.getStorageSync('orderList') || []
          if (orders[index]?.status === 0) {
            orders[index].status = 1
            wx.setStorageSync('orderList', orders)
            this.loadOrderList(this.data.currentTab)
          }
        }, 3000)
      }

      if (item.status === 1) {
        setTimeout(() => {
          let orders = wx.getStorageSync('orderList') || []
          if (orders[index]?.status === 1) {
            orders[index].status = 2
            wx.setStorageSync('orderList', orders)
            this.loadOrderList(this.data.currentTab)
          }
        }, 6000)
      }
    })
  },

  confirmReceive(e) {
    const orderNo = e.currentTarget.dataset.orderno
    let allOrders = wx.getStorageSync('orderList') || []
    const index = allOrders.findIndex(item => item.orderNo === orderNo)
    if (index !== -1) {
      allOrders[index].status = 1
      wx.setStorageSync('orderList', allOrders)
      this.loadOrderList(this.data.currentTab)
      wx.showToast({ title: '确认收货成功', icon: 'success' })
    }
  },

  // 删除订单
  deleteOrder(e) {
    const orderNo = e.currentTarget.dataset.orderno
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单吗？',
      success: (res) => {
        if (res.confirm) {
          let all = wx.getStorageSync('orderList') || []
          all = all.filter(i => i.orderNo !== orderNo)
          wx.setStorageSync('orderList', all)
          this.loadOrderList(this.data.currentTab)
          wx.showToast({ title: '删除成功' })
        }
      }
    })
  },

  // 再次购买
  buyAgain(e) {
    const id = e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  }
})