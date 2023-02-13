
const three_book_controler = require('../controllers/home.controller')

const router = require('express').Router()

router.get('/' , three_book_controler.getThreeBooksController )


module.exports = router
