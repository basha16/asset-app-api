const { db } = require('../database');

async function getAllUserAssests() {
    const sql = `SELECT A.*, B.first_name, B.last_name FROM public.user_assets A INNER JOIN public.user B ON A.assignee = B.id`
    const {rows} = await db.query(sql);
    return rows
}

async function getUserAssests(userId) {
    const sql = `SELECT A.*, B.first_name, B.last_name FROM public.user_assets A INNER JOIN public.user B ON A.assignee = B.id WHERE A.assignee = $1`
    const {rows} = await db.query(sql, [userId]);
    return rows
}

async function assignUserAssest(values) {
    const sql = `INSERT INTO public.user_assets 
        (name, description, quantity, assignee, status) 
        VALUES ($1, $2, $3, $4, $5)`;

    const params = [
        values.name,
        values.description,
        values.quantity,
        values.assignee,
        values.status
    ];
    const ResultSetHeader = await db.query(sql, params);
    return ResultSetHeader.rowCount > 0
}

async function updateAssignedUser(values) {
    const sql = `UPDATE public.user_assets 
        SET 
            name = $1,
            description = $2,
            quantity = $3,
            assignee = $4,
            status = $5
        WHERE id = $6`;

    const params = [
        values.name,
        values.description,
        values.quantity,
        values.assignee,
        values.status,
        values.id
    ];

    const ResultSetHeader = await db.query(sql, params);
    return ResultSetHeader.rowCount > 0;
}

async function deleteAssetUser(assetId) {
    const sql = `DELETE FROM public.user_assets WHERE id = $1`
    const rows = await db.query(sql, [assetId]);
    return rows.rowCount>0
}

module.exports = { getAllUserAssests, getUserAssests, assignUserAssest, updateAssignedUser, deleteAssetUser };
