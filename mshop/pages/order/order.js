Page({
  data: {
    currentTab: 'all',
    orderList: []
  },

  onLoad(options) {
    const status = options.status || 'all';
    this.setData({ currentTab: status });
    this.loadOrderList(status);
  },

  onShow() {
    this.loadOrderList(this.data.currentTab);
  },

  switchTab(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ currentTab: status });
    this.loadOrderList(status);
  },

  loadOrderList(status) {
    let allOrders = wx.getStorageSync('orderList') || [];
    
    // 逻辑：0待支付，1待收货，2已完成
    let list = status === 'all' 
      ? allOrders 
      : allOrders.filter(item => item.status == status);

    list = list.map(item => {
      let statusText = '';
      if (item.status === 0) statusText = '等待付款';
      else if (item.status === 1) statusText = '卖家已发货';
      else if (item.status === 2) statusText = '交易完成';
      return { ...item, statusText };
    });

    this.setData({ orderList: list });
    this.autoReceiveSimulator(); 
  },

  // 立即支付
  payOrder(e) {
    const orderNo = e.currentTarget.dataset.orderno;
    wx.showModal({
      title: '支付确认',
      content: '确认模拟支付该订单？',
      confirmColor: '#c9a886',
      success: (res) => {
        if (res.confirm) {
          let all = wx.getStorageSync('orderList') || [];
          const idx = all.findIndex(i => i.orderNo === orderNo);
          if (idx !== -1) {
            all[idx].status = 1; 
            wx.setStorageSync('orderList', all);
            wx.showToast({ title: '支付成功' });
            this.loadOrderList(this.data.currentTab);
          }
        }
      }
    });
  },

  // 确认收货
  confirmReceive(e) {
    const orderNo = e.currentTarget.dataset.orderno;
    wx.showModal({
      title: '收货确认',
      content: '是否确认已收到商品？',
      success: (res) => {
        if (res.confirm) {
          let all = wx.getStorageSync('orderList') || [];
          const idx = all.findIndex(i => i.orderNo === orderNo);
          if (idx !== -1) {
            all[idx].status = 2; 
            wx.setStorageSync('orderList', all);
            wx.showToast({ title: '已确认收货' });
            this.loadOrderList(this.data.currentTab);
          }
        }
      }
    });
  },

  // 自动物流模拟
  autoReceiveSimulator() {
    let all = wx.getStorageSync('orderList') || [];
    all.forEach(item => {
      if (item.status === 1 && !item.autoTimerSet) {
        item.autoTimerSet = true; 
        setTimeout(() => {
          let latest = wx.getStorageSync('orderList') || [];
          let target = latest.find(i => i.orderNo === item.orderNo);
          if (target && target.status === 1) {
            target.status = 2;
            wx.setStorageSync('orderList', latest);
            this.loadOrderList(this.data.currentTab);
          }
        }, 10000); 
      }
    });
  },

  deleteOrder(e) {
    const orderNo = e.currentTarget.dataset.orderno;
    wx.showModal({
      title: '删除订单',
      content: '删除后无法找回，确定吗？',
      success: (res) => {
        if (res.confirm) {
          let all = wx.getStorageSync('orderList') || [];
          all = all.filter(i => i.orderNo !== orderNo);
          wx.setStorageSync('orderList', all);
          this.loadOrderList(this.data.currentTab);
        }
      }
    });
  },

  buyAgain(e) {
    const id = e.currentTarget.dataset.goodsid;
    wx.navigateTo({ url: '/pages/details/details?id=' + id });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});