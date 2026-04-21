function request(url, method, data) {
  wx.showLoading({ title: '加载中...' });

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log("接口完整返回：", res); // 打印完整返回
        resolve(res);
      },
      fail(err) {
        console.error("接口失败详情：", err);
        reject(err);
      },
      complete() {
        wx.hideLoading();
      }
    });
  });
}

// 🌟 关键：替换成老师提供的在线测试接口
const baseUrl = "http://iwenwiki.com:3001"; 
const banner = "/api/banner";
const goods = "/api/goods";

export function getBanner(data) {
  return request(baseUrl + banner, "GET", data);
}

export function getGoods(data) {
  return request(baseUrl + goods, "GET", data);
}