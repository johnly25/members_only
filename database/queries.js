const pool = require("./pool")

exports.insertUser = async (firstName, lastName, username, password) => {
    await pool.query(
        `
        INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)
    `, [firstName + ' ' + lastName, username, password]
    )
}

exports.addMembership = async (id) => {
    await pool.query(
        `
            UPDATE users 
                SET membership = true
            WHERE id = $1
        `, [id]
    )
}

exports.addAdmin = async (id) => {
    await pool.query(
        `
            UPDATE users 
                SET admin = true
            WHERE id = $1
        `, [id]
    )
}

exports.addMessage = async (id, message) => {
    await pool.query(
        `
            INSERT INTO messages (userid, text)
                VALUES ($1, $2)
        `, [id, message]
    )
}

exports.getAllMessages = async () => {
    const { rows } = await pool.query(
        `
            SELECT messages.id, messages.text, to_char(timestamp,'FMMONTH FMDD YYYY HH:MM') as date_formatted, split_part(full_name, ' ', 1) as firstName, users.id as id2
            FROM messages
            JOIN users ON messages.userid = users.id
        `
    )
    return rows;
}

exports.getUser = async (username) => {
    const { rows } = await pool.query(
        `
        SELECT id
        FROM users
        where username = $1
        `, [username]
    )
    return rows;
}

exports.deletePost = async (id) => {
    await pool.query(
        `
        DELETE from messages WHERE id = $1
         `,
        [id]
    )
}