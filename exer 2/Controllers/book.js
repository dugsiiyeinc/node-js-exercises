const Book=require('../models/book')

exports.createManyBook=async (req,res)=>{
    try {
        const books=await Book.insertMany(req.body)
        res.status(201).json(books)
        
    } catch (error) {
        res.status(500).json("server error: ",error);
    }
}

exports.getAllBooks=async (req,res)=>{
    const books=await Book.find()
    res.json(books)
}

exports.getOneBookInfo=async (req,res)=>{
    const book=await Book.findById(req.params.id)
    if(!book) return res.status(404).send('book not found');

    res.json(book)
}

exports.updateBook=async (req,res)=>{
    const { id }=req.params;

    try {
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedBook) return res.status(404).send('book not found');

        res.json(updatedBook)
        
    } catch (error) {
        res.status(500).send('server error:',error)
    }
}

exports.deleteBook=async (req,res)=>{
    const { id }=req.params;

    try {
        const deletedBook=await Book.findByIdAndDelete(id)

        if(!deletedBook) return res.status(404).send('book not found');

        res.send(` book with id ${id} deleted successfully`)
    } catch (error) {
        res.status(500).send('server error:',error)
    }
}