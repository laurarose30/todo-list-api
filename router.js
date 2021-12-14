const express =require('express')
const router = express.Router();
const todosController = require('./todosController')

router.put('/todo/:id',todosController.update)
router.delete('/todo/:id',todosController.delete)


router.get('/todo',todosController.index)
router.post('/todo/create',todosController.create)
router.get('/todo/:id',todosController.show)

module.exports = router;
