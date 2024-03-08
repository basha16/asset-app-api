// const mysql = require('mysql2/promise')
const { Pool } = require('pg')
require('dotenv').config();

// const db = mysql.createPool({
//     host: "bt0go6k3nyorqwaxml2m-mysql.services.clever-cloud.com",
//     user: 'uxitvvnxsxbh3p7q',
//     password: 'h7l7wpBhwdIg7tGaqvpg',
//     database: 'bt0go6k3nyorqwaxml2m',
//     connectionLimit: 10,
//     queueLimit: 0,
//     port: 3306
// })

const db = new Pool({
  user: 'asset_v84x_user',
  host: 'dpg-cnkv5aud3nmc73bpndu0-a.oregon-postgres.render.com',
  database: 'asset_v84x',
  password: 'WqGnxNGLaRaQaF6uFd4PxL9eRV1vBfer',
  port: 5432,
  ssl:true
})
db.connect(function (err) {
  if (err) console.log(err);
  console.log("Connected!");
});

// db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting MySQL connection:', err.message);
//       return;
//     }

//     console.log('Connected to MySQL database');

//     // Check if the connection is still alive
//     connection.ping((pingErr) => {
//       if (pingErr) {
//         console.error('Error checking MySQL connection:', pingErr.message);
//         return;
//       }
//       console.log('MySQL connection is active');

//       // Release the connection back to the pool (important!)
//       connection.release();
//     });
//   });

module.exports = {
  db
}