        
const auth_contr = require('../controllers/auth.controller')
const guard_auth = require('./guardAuth')
const router = require('express').Router()
const body_parser = require('body-parser').urlencoded({extended:true})

//Sign Up
router.get('/signup' ,guard_auth.isNotAuth, auth_contr.getSignupPage)
router.post('/signup' ,body_parser,auth_contr.signupController)

// Login page
router.get('/login' ,guard_auth.isNotAuth, auth_contr.getLoginPage)
router.post('/login',body_parser, auth_contr.loginController)

router.post('/logout' , auth_contr.logoutController)

module.exports = router