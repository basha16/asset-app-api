const { db } = require('../database');

async function getAllUserAssests() {
    const connection = await db.getConnection();
    const sql = `SELECT A.*, B.first_name, B.last_name FROM user_assets A INNER JOIN user B ON A.assignee = B.id`
    const [rows, fields] = await connection.query(sql);
    return rows
}

async function getUserAssests(userId) {
    const connection = await db.getConnection();
    const sql = `SELECT A.*, B.first_name, B.last_name FROM user_assets A INNER JOIN user B ON A.assignee = B.id WHERE A.assignee = ?`
    const [rows, fields] = await connection.query(sql, [userId]);
    return rows
}

async function assignUserAssest(values) {
    const connection = await db.getConnection();
    const sql = `INSERT INTO user_assets 
        (id, name, description, quantity, assignee, status, created_at) 
        VALUES (UUID(), ?, ?, ?, ?, ?, NOW())`;

    const params = [
        values.name,
        values.description,
        values.quantity,
        values.assignee,
        values.status
    ];
    const [ResultSetHeader] = await connection.query(sql, params);
    return ResultSetHeader.affectedRows > 0
}

async function updateAssignedUser(values) {
    const connection = await db.getConnection();
    const sql = `UPDATE user_assets 
        SET 
            name = ?,
            description = ?,
            quantity = ?,
            assignee = ?,
            status = ?,
            updated_at = NOW()
        WHERE id = ?`;

    const params = [
        values.name,
        values.description,
        values.quantity,
        values.assignee,
        values.status,
        values.id
    ];

    const [ResultSetHeader] = await connection.query(sql, params);
    return ResultSetHeader.affectedRows > 0;
}

async function deleteAssetUser(assetId) {
    const connection = await db.getConnection();
    const sql = `DELETE FROM user_assets WHERE id = ?`
    const [rows, fields] = await connection.query(sql, [assetId]);
    return rows
}

module.exports = { getAllUserAssests, getUserAssests, assignUserAssest, updateAssignedUser, deleteAssetUser };
