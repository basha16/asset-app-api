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
    const sql = `SELECT * FROM public.user WHERE email = $1 AND password = $2 LIMIT 1`
    const  result= await db.query(sql, [user.email, user.password]);
    console.log(result)
    return result.rows
}

async function createNewUser(user) {
    const sql = ` INSERT INTO public.user 
    (first_name, last_name, email, password, position, team) 
    VALUES ($1, $2, $3, $4, $5, $6)`;

    const sql2 = `SELECT * FROM public.user WHERE email = $1 LIMIT 1`

    const params = [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        'admin',
        'AA'
      ];
      
    try {
        await db.query(sql, params);
        const result = await db.query(sql2, [user.email]);
        return result.rows;
    } catch (error) {
        console.error('Error creating a new user:', error.message);
        return false
    } finally {
        // db.release(); 
    }
}

module.exports = { authendicateToken, checkUserIsCorrect,createNewUser };
