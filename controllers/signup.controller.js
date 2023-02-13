const Signup_model =require('../models/signup.model')



exports.signupController=(req,res,next)=>{
    let name = req.body.name
    let email = req.body.email
    let psw =req.body.psw

    Signup_model.signup_model(name ,email , psw).then((result)=>{
        res.redirect('/login')
        console.log(result);
    }).catch((err)=>{
        console.log(err);
        res.redirect('signup')
    })
    
}
