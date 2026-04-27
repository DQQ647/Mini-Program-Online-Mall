Page({
  data: {
    isAgree: false
  },

  // 勾选协议
  onAgreeChange(e) {
    this.setData({ isAgree: !!e.detail.value.length });
  },

  // 模拟登录逻辑
  handleLogin() {
    if (!this.data.isAgree) {
      wx.showToast({ title: '请先阅读并同意用户协议', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '登录中...' });

    // 实际开发中调用 wx.login 获取 code，传给后端
    wx.login({
      success: (res) => {
        if (res.code) {
          // 模拟后端返回成功
          setTimeout(() => {
            wx.hideLoading();
            // 存入模拟数据
            wx.setStorageSync('token', 'mock_token_' + Date.now());
            wx.setStorageSync('userInfo', {
              nickName: '商场用户',
              avatarUrl: '/images/avatar.jpg'
            });

            wx.showToast({ title: '登录成功', icon: 'success' });
            
            // 登录成功后返回上一页
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }, 1000);
        }
      }
    });
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },

  showProtocol() {
    wx.showModal({ title: '用户协议', content: '这里是用户协议的具体内容...', showCancel: false });
  },

  showPrivacy() {
    wx.showModal({ title: '隐私政策', content: '这里是隐私政策的具体内容...', showCancel: false });
  }
});