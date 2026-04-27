const express = require("express");
const router = express.Router();
const SQLConnect = require("./SQLConnect.js");

// 首页商品列表 (从 goods 表取)
router.get("/goods", (req, res) => {
    const page = req.query.page || 1;
    const sql = "select * from goods limit 14"; // 直接取你数据库里的14条
    SQLConnect(sql, [], (result) => {
        if (result.length > 0) {
            res.send({ status: 200, data: { result: result } });
        } else {
            res.send({ status: 500, msg: "暂无数据" });
        }
    })
});

/**
 * 🌟 核心：商品详情 (主表 + 详情表 强行对齐版)
 */
router.get("/goods/details", (req, res) => {
    const id = req.query.id;
    
    // 逻辑：先拿主表的基本信息(title, price, url)，再拿详情表的详情图(details)
    const sqlMain = "select * from goods where id = ?";
    SQLConnect(sqlMain, [id], (mainRes) => {
        if (mainRes && mainRes.length > 0) {
            const basicInfo = mainRes[0];
            
            // 去详情表拿详情长图
            const sqlDetail = "select details, topimage from goodsdetails where id = ?";
            SQLConnect(sqlDetail, [id], (detailRes) => {
                let finalData = { ...basicInfo };
                if (detailRes && detailRes.length > 0) {
                    // 如果详情表有图，用详情表的，没有就用主表的
                    finalData.detailsImg = detailRes[0].details;
                    finalData.topImg = detailRes[0].topimage || basicInfo.url;
                } else {
                    finalData.detailsImg = basicInfo.url; // 兜底
                    finalData.topImg = basicInfo.url;
                }
                res.send({ status: 200, data: [finalData] });
            });
        } else {
            res.send({ status: 500, msg: "商品不存在" });
        }
    });
});

module.exports = router;