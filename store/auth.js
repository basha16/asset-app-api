const jwt = require('jsonwebtoken');
const { db } = require('../database');

async function authendicateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}

async function checkUserIsCorrect(user) {
    const connection = await db.getConnection();
    const sql = `SELECT * FROM user WHERE email = ? AND password = ? LIMIT 1`
    const [rows, fields] = await connection.query(sql, [user.email, user.password]);
    return rows
}

async function createNewUser(user) {
    const connection = await db.getConnection();
    const sql = `INSERT INTO user 
    (id, first_name, last_name, email, password, position, team, created_at) 
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW())`;
    const sql2 = `SELECT * FROM user WHERE email = ? LIMIT 1`
    const params = [user.firstName, user.lastName, user.email, user.password ,'admin', 'AA']
    try {
         await connection.query(sql, params);
        const [rows, fields] = await connection.query(sql2, [user.email]);
        return rows;
    } catch (error) {
        console.error('Error creating a new user:', error.message);
        return false
    } finally {
        connection.release(); 
    }

    return rows
}

module.exports = { authendicateToken, checkUserIsCorrect,createNewUser };
