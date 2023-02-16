
const All_books_contr = require('../controllers/books.controller')
const router = require('express').Router()
const guard_auth = require('./guardAuth')

// MULTER
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'assets/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({storage:storage})

// detail page

router.get('/' ,guard_auth.isAuth, All_books_contr.getAllBooksController )
router.get('/detail/:id' ,guard_auth.isAuth, All_books_contr.getOneBookController)

// adding books
router.get('/addbooks', guard_auth.isAuth ,All_books_contr.getAddBookPage )
router.post('/addbooks',guard_auth.isAuth ,upload.single('image') ,All_books_contr.postOneBookController)

// my books
router.get('/mybooks' , guard_auth.isAuth ,All_books_contr.getMyBooksController )

module.exports = router