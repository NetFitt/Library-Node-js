const book_model =require('../models/book.model')

exports.getAllBooksController=(req,res,next)=>{
    book_model.getAllBooks().then(books=>{
        res.render('products',{books:books})
    })
    
}
exports.getOneBookController=(req,res,next)=>{
    let id = req.params.id
    

    book_model.getOneBookDetails(id).then(books=>{
        res.render('details',{books:books})
    })
    
}

