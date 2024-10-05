const express = require("express")
const path = require('path')
const app = express()
const port = process.env.PORT || '3000'
const router = require('./router/router')
const passport = require('passport')
const session = require('express-session')
const sessionMiddleware = require('./config/session')(session)
const flash = require('express-flash')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sessionMiddleware)
app.use(flash())
app.use(passport.session())
require('./config/passport/passport')(passport)

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use('/', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
