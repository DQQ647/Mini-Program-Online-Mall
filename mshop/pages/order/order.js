Page({
  data: {
    status: -1,
    allOrders: [
      {
        id: 1,
        orderNo: "202604230001",
        status: 0,
        statusText: "待发货",
        totalPrice: "12598",
        goodsList: [
          { id: 1, name: "iPhone 17", price: "7999", img: "/images/tab/iPhone17.jpg" },
          { id: 2, name: "iPad Air 11英寸", price: "4599", img: "/images/tab/iPad_Air.jpg" }
        ]
      },
      {
        id: 2,
        orderNo: "202604230002",
        status: 1,
        statusText: "待收货",
        totalPrice: "1899",
        goodsList: [
          { id: 3, name: "AirPods Pro 3", price: "1899", img: "/images/tab/AirPods_Pro3.jpg" }
        ]
      },
      {
        id: 3,
        orderNo: "202604230003",
        status: 2,
        statusText: "已完成",
        totalPrice: "9898",
        goodsList: [
          { id: 4, name: "MacBook Air M3", price: "8999", img: "/images/tab/MacBook_Air_M3.jpg" },
          { id: 5, name: "Magic Keyboard", price: "899", img: "/images/tab/Watch_SE3.jpg" }
        ]
      }
    ],
    orderList: []
  },

  onLoad(options) {
    const status = parseInt(options.status || -1)
    this.setData({ status })
    this.filterOrders()
    this.setNavTitle(status)
  },

  filterOrders() {
    const { allOrders, status } = this.data
    let orderList = []

    if (status === -1) {
      orderList = allOrders
    } else {
      orderList = allOrders.filter(item => item.status === status)
    }

    this.setData({ orderList })
  },

  setNavTitle(status) {
    let title = "全部订单"
    if (status === 0) title = "待发货"
    if (status === 1) title = "待收货"
    if (status === 2) title = "已完成"
    wx.setNavigationBarTitle({ title })
  },

  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看订单详情', icon: 'none' })
  }
})