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
    
    let list = status === 'all' 
      ? allOrders 
      : allOrders.filter(item => item.status == status);

    list = list.map(item => {
      let statusText = '';
      if (item.status === 0) statusText = '待支付';
      else if (item.status === 1) statusText = '待收货';
      else if (item.status === 2) statusText = '已完成';
      return { ...item, statusText };
    });

    this.setData({ orderList: list });
    this.autoReceiveSimulator(); 
  },

  // 待支付状态下发起支付
  payOrder(e) {
    const orderNo = e.currentTarget.dataset.orderno;
    wx.showModal({
      title: '订单支付',
      content: '确认模拟支付该订单吗？',
      confirmColor: '#07c160',
      success: (res) => {
        if (res.confirm) {
          let all = wx.getStorageSync('orderList') || [];
          const idx = all.findIndex(i => i.orderNo === orderNo);
          if (idx !== -1) {
            all[idx].status = 1; // 从待支付(0)变成待收货(1)
            wx.setStorageSync('orderList', all);
            wx.showToast({ title: '支付成功' });
            this.loadOrderList(this.data.currentTab);
          }
        }
      }
    });
  },

  confirmReceive(e) {
    const orderNo = e.currentTarget.dataset.orderno;
    let all = wx.getStorageSync('orderList') || [];
    const idx = all.findIndex(i => i.orderNo === orderNo);
    if (idx !== -1) {
      all[idx].status = 2; 
      wx.setStorageSync('orderList', all);
      wx.showToast({ title: '收货成功' });
      this.loadOrderList(this.data.currentTab);
    }
  },

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
      title: '提示',
      content: '确认删除该记录吗？',
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
  }
});