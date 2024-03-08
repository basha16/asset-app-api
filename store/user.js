const { db } = require('../database');

async function getUsers(currentUserId) {
    const sql = `SELECT * FROM public.user WHERE id NOT IN ($1)`
    const {rows} = await db.query(sql, [currentUserId]);
    return rows
}

async function getUser(currentUserId) {
    const sql = `SELECT * FROM public.user WHERE id = $1`
    const  {rows} = await db.query(sql, [currentUserId]);
    return rows
}


async function getNormalUsers() {
    const params = ['normal']
    const sql = `SELECT id, CONCAT(first_name, ' ', last_name) as name FROM public.user WHERE position = $1`
    const {rows} = await db.query(sql, params);
    return rows
}

async function createUser(values) {
    try {
        const sql = `INSERT INTO public.user 
        (first_name, last_name, email, password, position, team) 
        VALUES ($1, $2, $3, $4, $5, $6)`;

        const params = [
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.position,
            values.team
        ];
        const Result = await db.query(sql, params);
        return Result.rowCount > 0
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateUser(values) {
    const sql = `UPDATE public.user 
        SET 
            first_name = $1,
            last_name = $2,
            email = $3,
            password = $4,
            position = $5,
            team = $6        
        WHERE id = $7`;

    const params = [
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.position,
        values.team,
        values.id
    ];

    const ResultSetHeader = await db.query(sql, params);
    return ResultSetHeader.rowCount > 0;
}

async function checkUserIsExists(email) {
    try {
        const sql = 'SELECT * FROM public.user WHERE email = $1'
        const results = await db.query(sql, [email]);
        return results.rows.length > 0
    } catch (error) {
        console.log(error)
    }

}

async function deleteUser(userId) {
    const sql = `DELETE FROM public.user WHERE id = $1`
    const rows = await db.query(sql, [userId]);
    return rows.rowCount>0
}


module.exports = { getUser, getUsers, getNormalUsers, createUser, updateUser, checkUserIsExists, deleteUser };
