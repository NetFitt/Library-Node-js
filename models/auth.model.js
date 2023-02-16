
const mongoose = require('mongoose').set('strictQuery' , true)
const bcrypt = require('bcrypt');
const { resolve } = require('path');

const url = 'mongodb://127.0.0.1:27017/Library';

const user_schema = mongoose.Schema({
    email:String,
    name:String,
    password:String
})

let User = mongoose.model('user',user_schema)

// FOR SIGN UP

exports.signup_model = (name , email, psw)=>{
    
    // this is responsable for registering a none existing user
    
    return new Promise((resolve , reject)=>{

        mongoose.connect(url).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            
            if(user){
                mongoose.disconnect()
                throw new Error('Email exist')
                
            }else{
                return bcrypt.hash(psw , 10)   
            }
        }).then((psw_hash)=>{
            
            let user = new User({
                email:email,
                name:name,
                password:psw_hash
            })
            
            return user.save()
        }).then((user)=>{

            mongoose.disconnect()
            resolve('registerd!!!')

        }).catch((err)=>{
            reject(err)
        })
    })
    
}


// FOR LOGIN


exports.login_model=(email , psw)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
           
            return User.findOne({email:email})
        }).then((user)=>{
            
            if(user){
                // bcrypt promise
                bcrypt.compare(psw,user.password).then((result)=>{
                    if(result){
                        mongoose.disconnect()
                       
                        resolve(user._id)
                    }else{
                        mongoose.disconnect()
                        throw new Error('wrong password')
                    }
                }).catch(err=>{
                    reject(err)
                })
                // wrong email
            }else{
                mongoose.disconnect()
                throw new Error('wrong email')
            }
            
        }).catch((err)=>{
            
            reject(err)
        })
    })

}