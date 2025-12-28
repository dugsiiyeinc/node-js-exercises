
const express=require('express');
const { createManyBook, getAllBooks, getOneBookInfo, updateBook, deleteBook } = require('../Controllers/book');
const router=express.Router();

router.post('/create',createManyBook)
router.get('/',getAllBooks)
router.get('/:id',getOneBookInfo)
router.put('/:id',updateBook)
router.delete('/:id',deleteBook)


module.exports=router