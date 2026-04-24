Page({
  data: {
    goods: {}
  },

  onLoad(options) {
    let id = options.id;
    this.getGoodsById(id);
  },

  // 根据商品ID自动显示详情（本地写死，不依赖后端）
  getGoodsById(id) {
    let goodsList = [
      {
        id: 1,
        title: "松下DC-BS1HGK微单相机",
        price: "21298",
        url: "/images/1.png",
        detailText: "专业级微单相机，高清摄像，直播多机位，电影级画质。"
      },
      {
        id: 2,
        title: "南孚5号充电锂电池4粒套装",
        price: "159",
        url: "/images/2.png",
        detailText: "1.5V恒压快充，适用游戏手柄、话筒、血压计、键鼠等。"
      },
      {
        id: 3,
        title: "佳能5d4 Mark IV单反相机",
        price: "15988",
        url: "/images/3.png",
        detailText: "全画幅专业级4K高清视频数码单反相机，专业摄影首选。"
      },
      {
        id: 4,
        title: "倍思氮化镓100W充电器",
        price: "199",
        url: "/images/4.png",
        detailText: "多口快充，PD快充，适用苹果、华为、小米、笔记本。"
      },
      {
        id: 5,
        title: "佳能5d4相机套餐",
        price: "60499",
        url: "/images/5.png",
        detailText: "专业全套摄影设备，包含镜头、闪光灯、兔笼、配件全套。"
      },
      {
        id: 6,
        title: "小提琴弱音器",
        price: "68",
        url: "/images/6.png",
        detailText: "专业静音配件，减小音量，不打扰他人，提琴通用。"
      },
      {
        id: 7,
        title: "佳能5D4兔笼",
        price: "310",
        url: "/images/7.png",
        detailText: "全包防摔保护框，多接口拓展，摄影必备配件。"
      },
      {
        id: 8,
        title: "Apple iPhone 11 128GB",
        price: "4099",
        url: "/images/8.png",
        detailText: "全网通4G手机，双卡双待，流畅耐用。"
      },
      {
        id: 9,
        title: "ROKID Air智能眼镜",
        price: "2999",
        url: "/images/9.png",
        detailText: "AR眼镜，手机投屏，3D大屏，虚拟显示。"
      },
      {
        id: 10,
        title: "倍思65W氮化镓充电器",
        price: "118",
        url: "/images/10.png",
        detailText: "迷你快充头，多口PD快充，手机笔记本通用。"
      },
      {
        id: 11,
        title: "斯莫格佳能5D4兔笼",
        price: "699",
        url: "/images/11.png",
        detailText: "专业相机拓展套件，竖拍、全包、防摔。"
      },
      {
        id: 12,
        title: "南孚5号电池",
        price: "29",
        url: "/images/12.png",
        detailText: "碱性电池，玩具、鼠标、键盘、血糖仪通用。"
      },
      {
        id: 13,
        title: "潘多拉幽蓝星河串饰",
        price: "348",
        url: "/images/13.png",
        detailText: "925银琉璃串饰，精美饰品，送礼佳品。"
      },
      {
        id: 14,
        title: "iPhone 13 Pro Max",
        price: "8699",
        url: "/images/14.png",
        detailText: "5G手机，远峰蓝色，双卡双待，高清摄像。"
      }
    ];

    let goods = goodsList.find(item => item.id == id);
    this.setData({ goods });
  },

  // 加入购物车
  addCart() {
    const goods = this.data.goods;
    let cart = wx.getStorageSync('cart') || [];

    let has = cart.find(item => item.id == goods.id);
    if (has) {
      wx.showToast({ title: '已在购物车', icon: 'none' });
      return;
    }

    cart.push(goods);
    wx.setStorageSync('cart', cart);
    wx.showToast({ title: '加入成功' });
  }
});