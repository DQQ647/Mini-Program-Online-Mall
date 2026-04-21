const express = require('express')
const app = express()
// 跨域
const cors = require('cors')
app.use(cors())
// 解析参数
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 测试路由
app.get('/', (req, res) => {
  res.send('服务器启动成功')
})

// 导入数据库连接
const db = require('./SQLConnect.js')

// 轮播图接口
app.get('/api/banner', (req, res) => {
  const sql = 'select * from banner'
  db.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, msg: '失败' })
    res.json({ status: 200, data: { result } })
  })
})

// 启动端口 3001
app.listen(3001, () => {
  console.log('服务器运行在 3001 端口上')
})