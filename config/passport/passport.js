const localStrategy = require('./localStrategy')
const pool = require('../../database/pool')

module.exports = (passport) => {
    passport.use(localStrategy)

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            const user = rows[0];
            done(null, user);
        } catch (err) {
            done(err);
        }
    })
}


