const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 你的数据库用户名
  password: 'wzq060317', // 你的数据库密码
  database: 'mpshop' // 你的数据库名
});

connection.connect((err) => {
  if (err) {
    console.error('❌ 数据库连接失败: ' + err.stack);
    return;
  }
  console.log('✅ 数据库连接成功，线程ID: ' + connection.threadId);
});

module.exports = connection;