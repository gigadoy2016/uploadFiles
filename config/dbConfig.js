// const mysql = require('mysql2/promise');
const mysql = require('mysql2');
const HOSTIP = '192.168.68.54:3000';

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '9161133',
    database : 'wcc_intra'
}).promise();
const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '9161133',
  database : 'wcc_intra'
}).promise();

module.exports = { conn,dbConnection,HOSTIP }