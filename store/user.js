const { db } = require('../database');

async function getUsers(currentUserId) {
    const connection = await db.getConnection();
    const sql = `SELECT * FROM user WHERE id NOT IN (?)`
    const [rows, fields] = await connection.query(sql, [currentUserId]);
    return rows
}

async function getUser(currentUserId) {
    const connection = await db.getConnection();
    const sql = `SELECT * FROM user WHERE id = ?`
    const [rows, fields] = await connection.query(sql, [currentUserId]);
    return rows
}


async function getNormalUsers() {
    const connection = await db.getConnection();
    const params = ['normal']
    const sql = `SELECT id, CONCAT(first_name, ' ', last_name) as name FROM user WHERE position = ?`
    const [rows, fields] = await connection.query(sql, params);
    return rows
}

async function createUser(values) {
    try {
        const connection = await db.getConnection();
        const sql = `INSERT INTO user 
        (id, first_name, last_name, email, password, position, team, created_at) 
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW())`;

        const params = [
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.position,
            values.team
        ];
        const [ResultSetHeader] = await connection.query(sql, params);
        return ResultSetHeader.affectedRows > 0
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateUser(values) {
    const connection = await db.getConnection();
    const sql = `UPDATE user 
        SET 
            first_name = ?,
            last_name = ?,
            email = ?,
            password = ?,
            position = ?,
            team = ?,
            updated_at = NOW()
        WHERE id = ?`;

    const params = [
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.position,
        values.team,
        values.id
    ];

    const [ResultSetHeader] = await connection.query(sql, params);
    return ResultSetHeader.affectedRows > 0;
}

async function checkUserIsExists(email) {
    const connection = await db.getConnection();
    const sql = `SELECT * FROM user WHERE email = ?`
    const [rows, fields] = await connection.query(sql, [email]);
    return rows.length > 0
}

async function deleteUser(userId) {
    const connection = await db.getConnection();
    const sql = `DELETE FROM user WHERE id = ?`
    const [rows, fields] = await connection.query(sql, [userId]);
    return rows
}


module.exports = { getUser, getUsers, getNormalUsers, createUser, updateUser, checkUserIsExists, deleteUser };
