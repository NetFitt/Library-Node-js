
const All_books_contr = require('../controllers/books.controller')
const router = require('express').Router()
const guard_auth = require('./guardAuth')



router.get('/' ,guard_auth.isAuth, All_books_contr.getAllBooksController )
router.get('/detail/:id' ,guard_auth.isAuth, All_books_contr.getOneBookController)

module.exports = router