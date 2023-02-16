const book_model =require('../models/book.model')




exports.getAllBooksController=(req,res,next)=>{
    book_model.getAllBooks().then(books=>{
        res.render('books',{books:books,verifUser:req.session.userId})
    })
    
}
exports.getOneBookController=(req,res,next)=>{
    let id = req.params.id
    

    book_model.getOneBookDetails(id).then(books=>{
        res.render('details',{book:books ,verifUser:req.session.userId})
    })
    
}

exports.getAddBookPage=(req,res,next)=>{
    res.render('bookadd' , {verifUser:req.session.userId , succes:req.flash('SuccessMessage')[0],error:req.flash('ErrorMessage')[0]})
}

exports.postOneBookController=(req,res,next)=>{

    let title = req.body.title
    let auther = req.body.auther
    let description = req.body.description
    let price = req.body.price
    let image = req.file.filename
    let userId = req.session.userId


    book_model.postOneBook(title ,auther ,price ,description ,image ,userId).then(resulet=>{
        req.flash('SuccessMessage' ,resulet)
      
        res.redirect('/books/addbooks')

    }).catch(err=>{
        
        req.flash('ErrorMessage' ,err.toString())
      
        res.redirect('/books/addbooks')
    })

}

// MY BOOKS

exports.getMyBooksController=(req,res,next)=>{
    let userId = req.session.userId

    book_model.getMybooks(userId).then(books=>{
        console.log(books);
        res.render('mybooks', {books:books,verifUser:req.session.userId})
    }).catch(err=>{
        console.log(err);
    })

}
