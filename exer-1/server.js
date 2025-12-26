
let books = [
  { id: 1, title: "The Silent Code", author: "James Carter" },
  { id: 2, title: "Beyond the Horizon", author: "Emily Stone" },
  { id: 3, title: "Node.js Basics", author: "Michael Brown" },
  { id: 4, title: "The Last Algorithm", author: "Sarah Wilson" },
];

const express=require('express')

const app=express();

app.use(express.json());

// get all books
app.get('/books',(req,res)=>{
    res.send(books)
})

// get single book
app.get('/books/:id',(req,res)=>{
    const book=books.find(b => b.id == req.params.id)

    if(!book) return res.status(404).send('book not found');

    res.json(book)
})

//add a book
app.post('/books',(req,res)=>{
    const newBooK={
        id:books.length+1,
        title:req.body.title,
        author:req.body.author
    }

    books.push(newBooK)

    res.json(newBooK)
})

// update a book
app.put('/books/:id',(req,res)=>{
    const book=books.find(b => b.id == req.params.id)

    if(!book) return res.status(404).send('book not found');

    book.title=req.body.title

    res.json(book)

})

// delete a book
app.delete('/books/:id',(req,res)=>{
    books=books.filter(b => b.id != req.params.id)

    res.json(`book ${req.params.id} deleted successfully`)
})

app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})

