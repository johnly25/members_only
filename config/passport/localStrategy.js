const LocalStrategy = require('passport-local')
const pool = require('../../database/pool')
const bcrypt = require('bcryptjs')

module.exports = new LocalStrategy(async (username, password, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        const user = rows[0];

        if (!user) {
            return done(null, false, { message: "Incorrect username" })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, { message: "Incorrect password" })
        }

        return done(null, user)

    } catch (err) {
        return done(err)
    }
})