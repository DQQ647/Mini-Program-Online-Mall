/**
 * 🌟 统一网络请求封装
 */
export function request(options) {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中...', mask: true });

    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        ...options.header 
      },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data); 
        } else {
          if (options.showMsg !== false) {
            wx.showToast({ title: '服务器开小差', icon: 'none' });
          }
          reject(res);
        }
      },
      fail(err) {
        if (options.showMsg !== false) {
          wx.showToast({ title: '网络连接失败', icon: 'none' });
        }
        reject(err);
      },
      complete() {
        wx.hideLoading();
      }
    });
  });
}

const baseUrl = "http://localhost:3001/api"; 

export function getBanner() { return request({ url: baseUrl + "/banner" }); }
export function getGoods(page = 1) { return request({ url: baseUrl + "/goods", data: { page } }); }
export function getGoodsDetail(id) { return request({ url: baseUrl + "/goods/details", data: { id } }); }