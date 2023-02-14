const auth_model =require('../models/auth.model')

exports.getSignupPage=((req,res,next)=>{
    res.render('signup')
})

exports.getLoginPage=((req,res,next)=>{
    res.render('login')
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
        res.redirect('signup')
    })
    
}

exports.loginController=(req,res,next)=>{
    let email = req.body.email
    let psw = req.body.psw

    auth_model.login_model(email,psw).then(id=>{
        console.log(id);
        req.session.userId = id;
        res.redirect('/');
        
        
        
    }).catch((err)=>{
        console.log(err);
    })

}

