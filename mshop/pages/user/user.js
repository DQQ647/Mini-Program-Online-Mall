Page({
  data: {
    userInfo: {
      avatar: "/images/avatar.png",
      nickname: "Apple User",
      desc: "Apple 生态爱好者"
    },
    menuList: [
      { icon: "📱", name: "我的订单" },
      { icon: "🎧", name: "我的设备" },
      { icon: "⭐", name: "我的收藏" },
      { icon: "📦", name: "收货地址" },
      { icon: "⚙️", name: "账户设置" },
      { icon: "ℹ️", name: "关于商城" }
    ]
  },

  goPage(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({
      title: name,
      icon: "none"
    })
  },

  logout() {
    wx.showModal({
      title: "退出登录",
      content: "确定要退出当前账户吗？",
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: "退出成功" })
        }
      }
    })
  }
})