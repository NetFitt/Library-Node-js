const { Schema, SchemaType } = require('mongoose');

const mongoose = require('mongoose').set('strictQuery' , false)

const url = 'mongodb://127.0.0.1:27017/Library';


const bookschema = mongoose.Schema({
    
    title:String,
    description:String,
    price:Number,
    auther:String,
    image:String,
    userId:String

})

let Book = mongoose.model('books' , bookschema)

// getting all books for all books page

exports.getAllBooks=()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            return Book.find({})
        }).then(books =>{
            mongoose.disconnect();
            resolve(books)
        }).catch(err=> {
            reject(err)
        })
    })

}

// getting only 3 books for home page

exports.getThreeBooks=()=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            return Book.find({}).limit(3)
        }).then(books =>{
            mongoose.disconnect();
            resolve(books)
        }).catch(err=> {
            reject(err)
        })
    })

}

// get the details about spesific book

exports.getOneBookDetails=(id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
            
            return Book.findById(id)
        }).then(books =>{
            console.log(books);
            mongoose.disconnect();
            resolve(books)
        }).catch(err=> {
            reject(err)
        })
    })

}

// posting books for addbooks page

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

exports.getMybooks=(userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(url).then(()=>{
           
            return Book.find({userId:userId})
        }).then(books =>{
            
            mongoose.disconnect()
            resolve(books)
            
        }).catch(err=>{
            reject(err)
        })
    })

}