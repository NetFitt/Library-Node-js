const session = require('express-session')
const auth_model =require('../models/auth.model')

exports.getSignupPage=((req,res,next)=>{
    res.render('signup' , {verifUser:req.session.userId , message:req.flash('message')[0]})
})

exports.getLoginPage=((req,res,next)=>{
    res.render('login' , {verifUser:req.session.userId , message:req.flash('message')[0]})
})

exports.signupController=(req,res,next)=>{
    let name = req.body.name
    let email = req.body.email
    let psw =req.body.psw

    auth_model.signup_model(name ,email , psw).then((result)=>{
        res.redirect('/login')
        console.log(result);
    }).catch((err)=>{
        console.log(err);
        req.flash('message',err.toString().replace('Error:' , ''))

        res.redirect('/signup')
    })
    
}

exports.loginController=(req,res,next)=>{
    let email = req.body.email
    let psw = req.body.psw

    auth_model.login_model(email,psw).then(id=>{

        req.session.userId = id;
        res.redirect('/');
    }).catch((err)=>{
        console.log('hellow 2')
        
        req.flash('message',err.toString().replace('Error:' , ''))
        res.redirect('/login')
       
    })

}


exports.logoutController=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
    
}
