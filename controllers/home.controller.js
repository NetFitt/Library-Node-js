
const book_model =require('../models/book.model')

exports.getThreeBooksController=(req,res,next)=>{
    book_model.getThreeBooks().then(books=>{
        res.render('index',{books:books})
    })
    
}