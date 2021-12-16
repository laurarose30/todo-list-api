const express =require('express')
const router = express.Router();
const booksController = require('./booksController')

router.put('/book/:id',booksController.update)
router.delete('/book/:id',booksController.delete)

router.get('/author/author', booksController.index)

router.get('/book',booksController.index)
router.post('/book/create',booksController.create)
router.get('/book/:id',booksController.show)

module.exports = router;
