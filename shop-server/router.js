const express = require("express");
const router = express.Router();
const SQLConnect = require("./SQLConnect.js");
const url = require("url");
const request = require("request");
// const authorization_code = "itbaizhan"

// const appid = "wxe4135ba344b525f4"
// const secret = "a3e4a228cf68dbd055f63487352b582b"
//qsls测试号
const authorization_code = "authorization_code"
const appid = "wx510280a0ce5eaad5"
const secret = "cc6c2a3f92b3538aef9d84e836828bde"



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
	console.log(" 传入临时登录凭证js_code，返回当前用户的openid和session_key ")
	console.log(" 微信接口 https://api.weixin.qq.com/sns/jscode2session ")
	console.log(" 临时凭证 js_code   =",code)
	console.log(" 临时凭证 appid     =",appid)
	console.log(" 临时凭证 secret    =",secret)
	console.log(" 临时凭证 grant_type=",authorization_code)
	
    request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${authorization_code}`, (err, response, body) => {
        if (err) console.log(err);
        const data = JSON.parse(body);
		console.log("返回值openid  = ",data.openid)
		console.log("返回值session_key  = ",data.session_key)
		
		// 生成token，实际生成环境一般用JWT生成
		const token = `mock_token_for_${data.openid}_${Date.now()}`; 
		
		console.log("将openid存入user表");
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


module.exports = router;