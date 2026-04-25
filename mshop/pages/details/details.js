Page({
  data: {
    goods: {},
    buyNum: 1
  },

  onLoad(options) {
    let id = options.id;
    this.getGoodsById(id);
  },

  getGoodsById(id) {
    let goodsList = [
      { id: 1, title: "松下DC-BS1HGK微单相机", price: "21298", url: "http://localhost:3001/images/goods/1.webp", detailText: "专业级微单相机，高清摄像，直播多机位，电影级画质。" },
      { id: 2, title: "南孚5号充电锂电池4粒套装", price: "159", url: "http://localhost:3001/images/goods/2.webp", detailText: "1.5V恒压快充，适用游戏手柄、话筒、血压计、键鼠等。" },
      { id: 3, title: "佳能5d4 Mark IV单反相机", price: "15988", url: "http://localhost:3001/images/goods/3.webp", detailText: "全画幅专业级4K高清视频数码单反相机，专业摄影首选。" },
      { id: 4, title: "倍思氮化镓100W充电器", price: "199", url: "http://localhost:3001/images/goods/4.webp", detailText: "多口快充，PD快充，适用苹果、华为、小米、笔记本。" },
      { id: 5, title: "佳能5d4相机套餐", price: "60499", url: "http://localhost:3001/images/goods/5.webp", detailText: "专业全套摄影设备，包含镜头、闪光灯、兔笼、配件全套。" },
      { id: 6, title: "小提琴弱音器", price: "68", url: "http://localhost:3001/images/goods/6.webp", detailText: "专业静音配件，减小音量，不打扰他人，提琴通用。" },
      { id: 7, title: "佳能5D4兔笼", price: "310", url: "http://localhost:3001/images/goods/7.webp", detailText: "全包防摔保护框，多接口拓展，摄影必备配件。" },
      { id: 8, title: "Apple iPhone 11 128GB", price: "4099", url: "http://localhost:3001/images/goods/8.webp", detailText: "全网通4G手机，双卡双待，流畅耐用。" },
      { id: 9, title: "ROKID Air智能眼镜", price: "2999", url: "http://localhost:3001/images/goods/9.webp", detailText: "AR眼镜，手机投屏，3D大屏，虚拟显示。" },
      { id: 10, title: "倍思65W氮化镓充电器", price: "118", url: "http://localhost:3001/images/goods/10.webp", detailText: "迷你快充头，多口PD快充，手机笔记本通用。" },
      { id: 11, title: "斯莫格佳能5D4兔笼", price: "699", url: "http://localhost:3001/images/goods/11.webp", detailText: "专业相机拓展套件，竖拍、全包、防摔。" },
      { id: 12, title: "南孚5号电池", price: "29", url: "http://localhost:3001/images/goods/12.webp", detailText: "碱性电池，玩具、鼠标、键盘、血糖仪通用。" },
      { id: 13, title: "潘多拉幽蓝星河串饰", price: "348", url: "http://localhost:3001/images/goods/13.webp", detailText: "925银琉璃串饰，精美饰品，送礼佳品。" },
      { id: 14, title: "iPhone 13 Pro Max", price: "8699", url: "http://localhost:3001/images/goods/14.webp", detailText: "5G手机，远峰蓝色，双卡双待，高清摄像。" }
    ];
    let goods = goodsList.find(item => item.id == id);
    this.setData({ goods });
  },

  // 数量增减
  setNum(e) {
    let type = e.currentTarget.dataset.type;
    let num = this.data.buyNum;
    if (type == 'minus') {
      if (num > 1) num--;
    } else {
      num++;
    }
    this.setData({ buyNum: num });
  },

  // 加入购物车
  addCart() {
    const goods = this.data.goods;
    const num = this.data.buyNum;
    let cart = wx.getStorageSync('cart') || [];
    let idx = cart.findIndex(i => i.id == goods.id);
    if (idx > -1) {
      cart[idx].num += num;
    } else {
      cart.push({ ...goods, num });
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({ title: '加入成功' });
  },

  // 去确认订单
  goConfirm() {
    let goods = this.data.goods;
    let num = this.data.buyNum;
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?goodsInfo=${encodeURIComponent(JSON.stringify(goods))}&num=${num}`
    });
  }
});