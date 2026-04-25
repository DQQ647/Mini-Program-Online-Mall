const express = require("express");
const router = express.Router();
const SQLConnect = require("./SQLConnect.js");
const url = require("url");
const request = require("request");

// 微信支付需要的包
const crypto = require('crypto');
const xml2js = require('xml2js');
const axios = require('axios');

// ================== 微信小程序登录配置 ==================
const authorization_code = "authorization_code"
const appid = "wx510280a0ce5eaad5"
const secret = "cc6c2a3f92b3538aef9d84e836828bde"

// ================== 微信支付配置（你自己填写） ==================
const WX_APPID = "wx510280a0ce5eaad5";
const WX_MCHID = "你的商户号";
const WX_API_KEY = "你的商户API密钥";
const WX_NOTIFY_URL = "https://你的域名/api/pay/notify";

// ================== 工具函数 ==================
function nonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

function paysign(params, key) {
  let str = Object.keys(params).sort().map(k => k + "=" + params[k]).join("&");
  str += "&key=" + key;
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
}

function toXml(obj) {
  let xml = "<xml>";
  for (let k in obj) {
    xml += "<" + k + "><![CDATA[" + obj[k] + "]]></" + k + ">";
  }
  xml += "</xml>";
  return xml;
}

// ================== 你的原有接口 ==================
/**
 * banner接口地址
 */
router.get("/banner", (req, res) => {
    const sql = "select * from banner";
    SQLConnect(sql, [], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * 推荐商品
 */
router.get("/goods", (req, res) => {
    var page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from goods limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql, [page], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * 搜索，模糊查询
 */

router.get("/goods/search", (req, res) => {
    var search = url.parse(req.url, true).query.search;
    const sql = "select * from goods where title like '%" + search + "%'";
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
});

/**
 * search keywords
 */
router.get("/keywords", (req, res) => {
    const sql = "select * from keywords";
    SQLConnect(sql, [], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * goodsdetails
 */
router.get("/goods/details", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "select * from goodsdetails where id=?";
    SQLConnect(sql, [id], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
});

/**
 * 加入购物车
 */

router.get("/cart/add", (req, res) => {
    var title = url.parse(req.url, true).query.title;
    var price = url.parse(req.url, true).query.price;
    var image = url.parse(req.url, true).query.image;
    var currentID = url.parse(req.url, true).query.currentID;
    const sql = "insert into cart values (null,?,?,?,?)";
    SQLConnect(sql, [title, image, price, currentID], (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true,
                msg: "添加成功"
            })
        } else {
            res.status(500).send({
                status: 500,
                msg: "添加失败"
            });
        }
    })
});

/**
 * 购物车
 */
router.get("/cart", (req, res) => {
    const sql = "select * from cart";
    SQLConnect(sql, [], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
});

/**
 * 删除购物车
 */
router.get("/cart/del", (req, res) => {
    var id = url.parse(req.url, true).query.currentID;
    const sql = "DELETE FROM cart WHERE id=?";
    SQLConnect(sql, [id], (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
});

/**
 * 购买商品查询
 */
router.get("/buy", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "select * from goods where id=?";
    SQLConnect(sql, [id], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
});

/**
 * 类别
 */
router.get("/category", (req, res) => {
    var tag = url.parse(req.url, true).query.tag;
    const sql = "select * from category where cate=?";
    SQLConnect(sql, [tag], (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
});


/**
 * 登录
 */
router.post("/login", (req, res) => {
    const { code } = req.body;
    request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${authorization_code}`, (err, response, body) => {
        if (err) console.log(err);
        const data = JSON.parse(body);
        const token = `mock_token_for_${data.openid}_${Date.now()}`; 
        const sql = "insert into user values (null,?,?)"
        if(data.openid && data.session_key){
            SQLConnect(sql, [data.openid,data.session_key], (result) => {
                if (result.affectedRows > 0) {
                    res.send({
                        status: 200,
                        data: {openid:data.openid,token:token},
                        msg: "添加成功"
                    })
                } else {
                    res.status(500).send({
                        status: 500,
                        msg: "添加失败"
                    });
                }
            })
        }else{
            res.send({
                status:500,
                msg:"登录失败"
            })
        }
    })
})

// ================== 微信支付接口（新增） ==================
router.post("/unified-order", async (req, res) => {
  try {
    let { orderId, totalFee, body, openid } = req.body;

    let params = {
      appid: WX_APPID,
      mch_id: WX_MCHID,
      nonce_str: nonceStr(),
      body: body,
      out_trade_no: orderId,
      total_fee: totalFee,
      spbill_create_ip: "127.0.0.1",
      notify_url: WX_NOTIFY_URL,
      trade_type: "JSAPI",
      openid: openid
    };

    params.sign = paysign(params, WX_API_KEY);
    let xml = toXml(params);
    
    let { data } = await axios.post("https://api.mch.weixin.qq.com/pay/unifiedorder", xml, {
      headers: { "Content-Type": "application/xml" }
    });

    const result = await xml2js.parseStringPromise(data, { explicitArray: false });
    const xmlData = result.xml;

    if (xmlData.return_code == "SUCCESS" && xmlData.result_code == "SUCCESS") {
      let payParams = {
        timeStamp: (Date.now() / 1000 + "").split(".")[0],
        nonceStr: nonceStr(),
        package: "prepay_id=" + xmlData.prepay_id,
        signType: "MD5"
      };
      payParams.paySign = paysign({ appId: WX_APPID, ...payParams }, WX_API_KEY);
      return res.json({ success: true, payParams });
    } else {
      return res.json({ success: false, message: xmlData.return_msg || xmlData.err_code_des });
    }
  } catch (err) {
    return res.json({ success: false, message: "支付下单失败" });
  }
});

router.post("/pay/notify", async (req, res) => {
  try {
    let xml = req.body.toString();
    const result = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const data = result.xml;

    if (data.return_code == "SUCCESS" && data.result_code == "SUCCESS") {
      console.log("✅ 支付成功：订单号 =", data.out_trade_no);
    }
    res.send("<xml><return_code>SUCCESS</return_code></xml>");
  } catch (e) {
    res.send("<xml><return_code>FAIL</return_code></xml>");
  }
});

module.exports = router;