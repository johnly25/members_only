const { body, validationResult, check } = require("express-validator")
const repository = require('../database/queries')
const checkPasswordConfirm = (req, res, next) =>
    body('password-confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords confirmation does not match password')
        }
        return true
    })

const checkUsername = (req, res, next) =>
    body('username').custom(async value => {
        const user = await repository.getUser(value)
        if (user.length > 0) {
            throw new Error('Username exists already')
        }
        return true
    })


exports.validateAdminAnswer = [
    body('answer')
        .notEmpty().withMessage('answer required')
        .isAlpha().withMessage('needs to be in letters')
        .toLowerCase()
        .trim(),
]

exports.validateMessage = [
    body('message')
        .notEmpty()
]

exports.validateAnswer = [
    body('answer')
        .notEmpty().withMessage('answer required')
        .isAlpha().withMessage('needs to be in letters')
        .toLowerCase()
        .trim(),
]

exports.validateUser = [
    body('first-name')
        .notEmpty().withMessage('name required'),
    body('last-name')
        .notEmpty(),
    body('username')
        .notEmpty(),
    body('password')
        .notEmpty(),
    body('password-confirm')
        .notEmpty(),
    checkPasswordConfirm(),
    checkUsername()
]

exports.validateResults = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        // return res.status(200).json({ errors: errors.array() });
        res.locals.errors = errors.array()
    next()
}
