        
const auth_contr = require('../controllers/auth.controller')
const router = require('express').Router()
const body_parser = require('body-parser').urlencoded({extended:true})

//Sign Up
router.get('/signup' , auth_contr.getSignupPage)
router.post('/signup' ,body_parser,auth_contr.signupController)

// Login page
router.get('/login' , auth_contr.getLoginPage)
router.post('/login',body_parser, auth_contr.loginController)

module.exports = router