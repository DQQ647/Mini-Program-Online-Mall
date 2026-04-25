Page({
  data: {
    goodsInfo: {},
    num: 1,
    totalPrice: 0,
    address: null,
    loading: false
  },

  onLoad(options) {
    let goods = JSON.parse(decodeURIComponent(options.goodsInfo));
    let num = options.num;
    let total = (Number(goods.price) * num).toFixed(2);
    this.setData({ goodsInfo: goods, num, totalPrice: total });
    this.loadDefaultAddress();
  },

  onShow() {
    this.loadDefaultAddress();
  },

  loadDefaultAddress() {
    let list = wx.getStorageSync('addressList') || [];
    let addr = list.find(i => i.isDefault) || list[0];
    this.setData({ address: addr });
  },

  goToAddress() {
    wx.navigateTo({ url: '/pages/address/address?from=confirm' });
  },

  // === 提交订单 + 发起微信支付 ===
  async submitOrder() {
    const { goodsInfo, num, totalPrice, address } = this.data;
    if (!address) { wx.showToast({ title: '请选择地址', icon: 'none' }); return; }
    if (this.data.loading) return;
    this.setData({ loading: true });

    // 1. 创建本地订单
    const orderNo = "ORD" + Date.now();
    const order = {
      orderNo,
      status: 0, // 0待支付 1待发货 2待收货 3已完成
      totalPrice,
      totalNum: num,
      address,
      goodsList: [{ pic: goodsInfo.url, name: goodsInfo.title, price: goodsInfo.price, num, id: goodsInfo.id }]
    };

    let orderList = wx.getStorageSync("orderList") || [];
    orderList.unshift(order);
    wx.setStorageSync("orderList", orderList);

    // 2. 请求后端统一下单
    wx.request({
      url: "https://你的域名.com/api/unified-order",
      method: "POST",
      data: {
        orderId: orderNo,
        totalFee: Math.round(Number(totalPrice) * 100), // 单位分
        body: goodsInfo.title,
        openid: wx.getStorageSync("openid") || "o123456789"
      },
      success: (res) => {
        if (res.data.success && res.data.payParams) {
          // 3. 调起微信支付
          wx.requestPayment({
            ...res.data.payParams,
            success: () => {
              wx.showToast({ title: "支付成功" });
              setTimeout(() => wx.redirectTo({ url: "/pages/order/order?status=0" }), 1500);
            },
            fail: () => {
              wx.showToast({ title: "支付取消", icon: "none" });
            },
            complete: () => this.setData({ loading: false })
          });
        } else {
          wx.showToast({ title: res.data.message || "下单失败", icon: "none" });
          this.setData({ loading: false });
        }
      },
      fail: () => {
        wx.showToast({ title: "网络异常", icon: "none" });
        this.setData({ loading: false });
      }
    });
  }
});