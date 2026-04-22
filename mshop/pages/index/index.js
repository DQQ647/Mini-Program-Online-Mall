Page({
  data: {
    bannerList: [
      { id: 1, url: "/images/banner-iphone16.jpg" },
      { id: 2, url: "/images/banner-macbookpro.jpg" },
      { id: 3, url: "/images/banner-ipadpro.jpg" },
      { id: 4, url: "/images/banner-airpods.jpg" },
    ],
    goodsList: [
      // 手机
      { id: 1, name: "iPhone 16 Pro Max", desc: "钛金属 A18 Pro 芯片", price: 9999, image: "/images/iphone16promax.png" },
      { id: 2, name: "iPhone 16 Pro", desc: "轻盈耐用 专业级体验", price: 8999, image: "/images/iphone16pro.png" },
      { id: 3, name: "iPhone 16", desc: "灵动岛 4800万像素", price: 6999, image: "/images/iphone16.png" },
      { id: 4, name: "iPhone 15 Pro Max", desc: "钛金属设计 性能强劲", price: 8499, image: "/images/iphone15promax.png" },
      { id: 5, name: "iPhone 15 Pro", desc: "A17 Pro 首款3nm芯片", price: 7499, image: "/images/iphone15pro.png" },
      { id: 6, name: "iPhone 15", desc: "多彩配色 强劲续航", price: 5499, image: "/images/iphone15.png" },

      // 电脑
      { id: 7, name: "MacBook Pro 16 M4", desc: "专业创作 超强性能", price: 19999, image: "/images/macbookpro16m4.png" },
      { id: 8, name: "MacBook Air 15 M3", desc: "轻薄长续航 静音无风扇", price: 11999, image: "/images/macbookair15m3.png" },
      { id: 9, name: "iMac 24 M3", desc: "多彩一体 惊艳表现", price: 10999, image: "/images/imac24.png" },
      { id: 10, name: "Mac Mini M4", desc: "小身材 大能力", price: 5299, image: "/images/macmini.png" },

      // 平板 & 穿戴
      { id: 11, name: "iPad Pro M4", desc: "桌面级体验 超薄机身", price: 8999, image: "/images/ipadpro13m4.png" },
      { id: 12, name: "Apple Watch Ultra 3", desc: "专业户外 坚固耐用", price: 6499, image: "/images/watchultra3.png" },
      { id: 13, name: "AirPods Pro 3", desc: "主动降噪 空间音频", price: 1899, image: "/images/airpodspro3.png" },
      { id: 14, name: "AirPods Max", desc: "高保真 头戴式降噪", price: 3999, image: "/images/airpodsmax.png" },

      // 音响
      { id: 15, name: "HomePod mini", desc: "桌面智能音响 空间音频", price: 749, image: "/images/homepodmini.png" },
      { id: 16, name: "HomePod 2", desc: "强劲低音 全屋立体声", price: 2299, image: "/images/homepod.png" },

      // 配件
      { id: 17, name: "iPhone 16 透明手机壳", desc: "MagSafe 防摔保护壳", price: 299, image: "/images/iphone-case.png" },
      { id: 18, name: "20W USB‑C 充电器", desc: "苹果原装 快充头", price: 149, image: "/images/20w-charger.png" },
      { id: 19, name: "USB‑C to Lightning 线", desc: "1米快充线 原装正品", price: 145, image: "/images/lightning-cable.png" },
      { id: 20, name: "MagSafe 外接电池", desc: "磁吸无线充电宝", price: 749, image: "/images/magsafe-battery.png" },
    ]
  },

  addCart(e) {
    const item = e.currentTarget.dataset.item;
    let cartList = wx.getStorageSync('cartList') || [];
    const index = cartList.findIndex(i => i.id === item.id);
    if (index > -1) {
      cartList[index].count += 1;
    } else {
      cartList.push({ ...item, count: 1, selected: true });
    }
    wx.setStorageSync('cartList', cartList);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  }
})