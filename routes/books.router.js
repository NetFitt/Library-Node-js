
const All_books_contr = require('../controllers/books.controller')
const router = require('express').Router()



router.get('/' , All_books_contr.getAllBooksController )
router.get('/detail/:id' , All_books_contr.getOneBookController)

module.exports = router