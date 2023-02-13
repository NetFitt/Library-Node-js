const { Schema } = require('mongoose');

const mongoose = require('mongoose').set('strictQuery' , false)

const url = 'mongodb://127.0.0.1:27017/Library';


const bookschema = mongoose.Schema({
    
    title:String,
    description:String,
    price:Number,
    auther:String,
    img:String

})

let book = mongoose.model('books' , bookschema)

exports.getAllBooks=()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            return book.find({})
        }).then(books =>{
            mongoose.disconnect();
            resolve(books)
        }).then(err=> {
            reject(err)
        })
    })
    

}

exports.getThreeBooks=()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            return book.find({}).limit(3)
        }).then(books =>{
            mongoose.disconnect();
            resolve(books)
        }).then(err=> {
            reject(err)
        })
    })

}

exports.getOneBookDetails=(id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            
            return book.findById(id)
        }).then(books =>{
            console.log(books);
            mongoose.disconnect();
            resolve(books)
        }).then(err=> {
            reject(err)
        })
    })

}
