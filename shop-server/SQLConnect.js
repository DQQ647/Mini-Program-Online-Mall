const mysql = require('mysql')

const MySQLObj = {
    host:"127.0.0.1",
    port: 3306,      
    user:"root",
    password:"wzq060317",
    database:"mpshop"   
}

const db = mysql.createConnection(MySQLObj)
module.exports = db