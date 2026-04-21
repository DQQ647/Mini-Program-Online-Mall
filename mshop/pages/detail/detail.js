Page({
  data: {
    detailData: {}
  },

  onLoad(options) {
    // options.id 是从首页传过来的商品id
    this.getDetailData(options.id);
  },

  // 模拟获取商品详情数据（可替换为真实接口）
  getDetailData(id) {
    // 这里用模拟数据，后续可替换为真实接口请求
    const mockData = {
      id: id,
      name: "商品名称",
      price: 999,
      image: "https://img14.360buyimg.com/n1/jfs/t1/208024/33/25333/131113/647d2308F901c8370/2c3b2d083d080856.jpg"
    };
    this.setData({
      detailData: mockData
    });
  },

  // 加入购物车（使用本地存储）
  handleAddCart() {
    const goods = this.data.detailData;
    // 从本地存储获取购物车列表
    let cartList = wx.getStorageSync("cartList") || [];
    // 判断商品是否已在购物车
    const index = cartList.findIndex(item => item.id === goods.id);
    if (index === -1) {
      // 不在购物车，直接添加
      goods.count = 1;
      cartList.push(goods);
    } else {
      // 已在购物车，数量+1
      cartList[index].count += 1;
    }
    // 保存到本地存储
    wx.setStorageSync("cartList", cartList);
    wx.showToast({
      title: "加入购物车成功",
      icon: "success"
    });
  }
});