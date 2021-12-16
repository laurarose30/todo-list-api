const createError = require("http-errors")
const  ObjectId = require('mongodb').ObjectId;
const {Book, book} = require('./models/books')
//let todoList = []
//let idno = 0

exports.index = async function(req,res){
   
    Book.find()
        .then( books => res.send(books))
   
}

exports.create = async function (req,res,next){
    if(!req.body.author){
        return (next(createError(400,"author is required")))
    }

    const todo = new Book({
        author:req.body.author,
        title: req.body.title,
        status: req.body.status
    })
    todo.save()
    .then( () => res.send({result:true}) )

    
   
}

exports.show = async function (req,res,next) {

    Book.findOne({ _id: ObjectId( req.params.id)})
    .then( (bookItem)=> {
        if(!bookItem){
            return (next(createError(404,"no book with that id")))
            }
            res.send(bookItem);

    })

}

exports.update = async function (req,res,next){


    Book.findOne({ _id: ObjectId( req.params.id)})
    .then( (bookItem)=> {
        if(!bookItem){
            return (next(createError(404,"no book with that id")))
            }
           
            bookItem.author = req.body.author
            bookItem.title = req.body.title
            bookItem.status = req.body.status
            bookItem.save()
            .then (() => res.send({result:true}))

    })

}

exports.delete = function (req,res,next) {

    Book.deleteOne({ _id: ObjectId(req.params.id)})
    .then( (r) =>{
        if(r.deletedCount){
            return res.send({result:true});
        }
        return (next(createError(404,"no book with that id")))

    })
    .catch( (err)  => console.log(err))
    
}