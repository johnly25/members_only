module.exports = (req, res, next) => {
    const user = res.locals.currentUser
    if (user && user.admin) {
        next()
    } else {
        (console.log('notadmin'))
        res.redirect('/')
    }
}