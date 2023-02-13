        
const Signup_contr = require('../controllers/signup.controller')
const router = require('express').Router()

const body_parser = require('body-parser').urlencoded({extended:true})



router.get('/' , (req , res , next)=>res.render('signup'))
router.post('/' ,body_parser,Signup_contr.signupController)


module.exports = router