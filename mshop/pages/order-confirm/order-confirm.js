import { request } from '../../utils/request.js';
const app = getApp();

Page({
  data: {
    goodsInfo: {},
    num: 1,
    totalPrice: 0,
    address: null,
    loading: false
  },

  onLoad(options) {
    // 解析详情页传过来的商品数据
    if (options.goodsInfo) {
      let goods = JSON.parse(decodeURIComponent(options.goodsInfo));
      let num = parseInt(options.num || 1);
      let total = (Number(goods.price) * num).toFixed(2);
      this.setData({ goodsInfo: goods, num, totalPrice: total });
    }
    this.loadDefaultAddress();
  },

  onShow() {
    this.loadDefaultAddress();
  },

  // 加载默认地址逻辑
  loadDefaultAddress() {
    let list = wx.getStorageSync('addressList') || [];
    let addr = list.find(i => i.isDefault) || list[0];
    this.setData({ address: addr });
  },

  goToAddress() {
    wx.navigateTo({ url: '/pages/address/address?from=confirm' });
  },

  /**
   * 核心：提交订单并触发支付流程
   * 对应《微信支付.md》中的流程：下单 -> 获取参数 -> 调用支付 -> 处理回调
   */
  async submitOrder() {
    const { goodsInfo, num, totalPrice, address } = this.data;
    
    if (!address) {
      wx.showToast({ title: '请选择收货地址', icon: 'none' });
      return;
    }
    
    if (this.data.loading) return;
    this.setData({ loading: true });

    try {
      // 1. 调用后端统一下单接口
      // 注意：totalFee 单位是“分”，所以要乘以100
      const payRes = await request({
        url: 'http://localhost:3001/api/unified-order', 
        method: 'POST',
        data: {
          orderId: "ORD" + Date.now(),
          totalFee: Math.round(totalPrice * 100), 
          body: goodsInfo.title,
          openid: app.globalData.openid || wx.getStorageSync('openid')
        }
      });

      // 2. 如果后端接口调通，拉起微信官方支付控件
      if (payRes && payRes.success) {
        const payParams = payRes.payParams;
        wx.requestPayment({
          ...payParams,
          success: (res) => {
            wx.showToast({ title: '支付成功', icon: 'success' });
            this.saveOrderToLocal(1); // 状态1：待发货
          },
          fail: (err) => {
            wx.showToast({ title: '支付已取消', icon: 'none' });
            this.saveOrderToLocal(0); // 状态0：待支付
          }
        });
      } else {
        // 如果后端返回失败，跳转到模拟逻辑
        throw new Error("后端接口未就绪");
      }

    } catch (error) {
      console.error("支付异常，进入模拟流程:", error);
      
      // 3. 完美模拟支付弹窗（用于演示和测试）
      wx.showModal({
        title: '支付确认',
        content: `需支付 ¥${totalPrice}，是否模拟支付成功？`,
        confirmText: '模拟成功',
        cancelText: '取消支付',
        confirmColor: '#07c160',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: '模拟支付成功', icon: 'success' });
            this.saveOrderToLocal(1); // 模拟成功 -> 待发货
          } else {
            wx.showToast({ title: '已存入待支付', icon: 'none' });
            this.saveOrderToLocal(0); // 模拟取消 -> 待支付
          }
        }
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 统一保存订单信息到本地缓存
   * @param {Number} status 订单状态：0待支付，1待发货
   */
  saveOrderToLocal(status) {
    const { goodsInfo, num, totalPrice, address } = this.data;
    
    const newOrder = {
      orderNo: "ORD" + Date.now(),
      createTime: new Date().toLocaleString(),
      status: status, 
      totalPrice: totalPrice,
      totalNum: num,
      address: address,
      goodsList: [{
        id: goodsInfo.id,
        name: goodsInfo.title,
        pic: goodsInfo.url || goodsInfo.topimage,
        price: goodsInfo.price,
        num: num
      }]
    };

    // 获取并更新本地订单列表
    let orderList = wx.getStorageSync("orderList") || [];
    orderList.unshift(newOrder); // 最新订单排在最前面
    wx.setStorageSync("orderList", orderList);

    // 延迟跳转，让用户看清提示
    setTimeout(() => {
      // 直接跳转到订单页，并传入当前订单的状态，方便页面自动切换到对应 Tab
      wx.redirectTo({ 
        url: `/pages/order/order?status=${status}` 
      });
    }, 1500);
  }
});