// 商品列表
app.get('/getGoods', (req, res) => {
  db.query('SELECT * FROM goods', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 加入购物车
app.get('/addCart', (req, res) => {
  const { title, image, price, currentID } = req.query;
  const sql = 'INSERT INTO cart (title, image, price, currentID) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, image, price, currentID], (err, result) => {
    if (err) return res.json({ code: 0, msg: err });
    res.json({ code: 1, msg: '加入成功' });
  });
});

// 获取购物车
app.get('/getCart', (req, res) => {
  db.query('SELECT * FROM cart', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 删除购物车
app.get('/deleteCart', (req, res) => {
  const id = req.query.id;
  db.query('DELETE FROM cart WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});