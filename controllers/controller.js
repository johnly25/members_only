const { isEmpty } = require('../services/utils')
const UserService = require('../services/UserService')
const passport = require('passport')

exports.Controller = class Controller {
    constructor(repository, bcrypt) {
        this.userService = new UserService(repository, bcrypt);
        this.repository = repository;
    }

    indexGET = async (req, res) => {
        const messages = await this.repository.getAllMessages();
        res.render("index", { user: res.locals.currentUser, messages: messages })
    }

    loginGET = (req, res) => {
        const message = req.flash('error')
        res.render("login", { message: message })
    }

    signUpGET = (req, res) => {
        res.render("signup")
    }

    memberGET = (req, res) => {
        res.render("member", { user: res.locals.currentUser })
    }

    memberPOST = (req, res) => {
        const errors = res.locals.errors
        if (!isEmpty(errors)) {
            return res.status(400).render("member", { errors: errors, user: res.locals.currentUser })
        }

        if (req.body.answer == 'zoro') {
            const userid = res.locals.currentUser.id
            this.userService.membershipSignUp(userid)
            res.redirect('/')
        } else {
            res.render("member", { user: res.locals.currentUser, errors: [{ msg: 'wrong answer' }] })
        }
    }

    adminGET = (req, res) => {
        res.render("admin", { user: res.locals.currentUser })
    }

    adminPOST = (req, res) => {
        const errors = res.locals.errors
        if (!isEmpty(errors)) {
            return res.status(400).render("admin", { errors: errors, user: res.locals.currentUser })
        }
        if (req.body.answer == 'luffy') {
            const userid = res.locals.currentUser.id
            this.userService.becomeAdmin(userid)
            res.redirect('/')
        } else {
            res.render("admin", { user: res.locals.currentUser, errors: [{ msg: 'wrong answer' }] })
        }
    }

    signUpPOST = async (req, res) => {
        const errors = res.locals.errors
        if (!isEmpty(errors)) {
            return res.status(400).render("signup", { errors: errors })
        }
        const { "first-name": firstName, "last-name": lastName, username, password } = req.body
        this.userService.signUp(firstName, lastName, username, password)
        res.redirect('/')
    }

    loginPOST =
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })

    logoutPOST = (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            res.redirect("/")
        })
    }

    deletePost = (req, res, next) => {
        console.log('enter!!')
        const id = req.params.id
        console.log(id)
        this.userService.deletePost(id)
        res.redirect("/")
    }
    messagePOST = (req, res, next) => {
        const errors = res.locals.errors
        if (!isEmpty(errors)) {
            return res.status(400).render("index", { errors: errors })
        }
        const { message } = req.body
        const { id: userid } = res.locals.currentUser
        this.userService.addMessage(userid, message)
        res.redirect('/')
    }
}
