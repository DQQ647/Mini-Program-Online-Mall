const express = require('express');
const app = express();
const db = require('./SQLConnect.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// 静态文件托管，让图片能访问
app.use('/images', express.static('public/images'));

// 1. 获取轮播图接口
app.get('/getBanner', (req, res) => {
  db.query('SELECT * FROM banner', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 2. 获取商品列表接口
app.get('/getGoods', (req, res) => {
  db.query('SELECT * FROM goods', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 3. 获取商品详情接口
app.get('/getGoodsDetail', (req, res) => {
  const id = req.query.id;
  db.query('SELECT * FROM goodsdetails WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`🚀 服务器运行在 http://localhost:${port}`);
});