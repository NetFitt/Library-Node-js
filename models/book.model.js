const { Schema, SchemaType } = require('mongoose');

const mongoose = require('mongoose').set('strictQuery' , false)

const url = 'mongodb://127.0.0.1:27017/Library';


const bookschema = mongoose.Schema({
    
    title:String,
    description:String,
    price:Number,
    auther:String,
    image:String,
    userId:Schema.Types.ObjectId

})

let Book = mongoose.model('books' , bookschema)

exports.getAllBooks=()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            return Book.find({})
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
            return Book.find({}).limit(3)
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
            
            return Book.findById(id)
        }).then(books =>{
            console.log(books);
            mongoose.disconnect();
            resolve(books)
        }).then(err=> {
            reject(err)
        })
    })

}

exports.postOneBook=(title , auther ,price ,description, image ,userId)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(()=>{
            return Book.findOne({title:title})
        }).then((book)=>{
            if(book){
                mongoose.disconnect()
                throw new Error('this book exist')
            }else{
                let new_book = new Book({
                    title:title,
                    description:description,
                    price:price,
                    auther:auther,
                    image:image,
                    userId:userId,
                })
                new_book.save().then(result=>{
                    resolve('book has been added')
                }).catch(err=>{
                    reject(err)
                })
                
            }
        }).catch(err=>{
            reject(err)
        })
    })
}
