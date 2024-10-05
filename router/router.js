const express = require('express')
const router = express.Router()
const repository = require("../database/queries")
const bcrypt = require("bcryptjs")
const { Controller } = require('../controllers/controller')
const controller = new Controller(repository, bcrypt)
const { validateUser, validateResults, validateAnswer, validateMessage, validateAdminAnswer, checkAnswer2 } = require("../middleware/express-validator")
const authChecker = require('../middleware/auth')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', controller.indexGET)
router.get('/signup', controller.signUpGET)
router.post('/sign-up', validateUser, validateResults, controller.signUpPOST)
router.get('/login', controller.loginGET)
router.post("/login", controller.loginPOST)
router.get("/logout", controller.logoutPOST)
router.get("/member", authChecker, controller.memberGET)
router.post("/member", authChecker, validateAnswer, validateResults, controller.memberPOST)
router.post("/message", authChecker, validateMessage, validateResults, controller.messagePOST);
router.get("/admin", authChecker, controller.adminGET)
router.post("/admin", authChecker, validateAnswer, validateResults, controller.adminPOST)
router.get("/delete/:id",checkAdmin, controller.deletePost);
module.exports = router;