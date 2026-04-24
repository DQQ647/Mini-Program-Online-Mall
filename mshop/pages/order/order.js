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
    // 从本地存储获取订单（后续购物车下单会自动写入）
    let allOrders = wx.getStorageSync('orderList') || []
    // 状态映射：0=待发货 1=待收货 2=已完成
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

    // 给订单加上状态文本，方便显示
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
  }
})