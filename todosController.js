const createError = require("http-errors")
const  ObjectId = require('mongodb').ObjectId;
const {Todo} = require('./models/todos')
//let todoList = []
//let idno = 0

exports.index = async function(req,res){
   
    Todo.find()
        .then( todos => res.send(todos))
   
}

exports.create = async function (req,res,next){
    if(!req.body.name){
        return (next(createError(400,"name is required")))
    }

    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    })
    todo.save()
    .then( () => res.send({result:true}) )

    
   
}

exports.show = async function (req,res,next) {

    Todo.findOne({ _id: ObjectId( req.params.id)})
    .then( (todoItem)=> {
        if(!todoItem){
            return (next(createError(404,"no todo with that id")))
            }
            res.send(todoItem);

    })

}

exports.update = async function (req,res,next){


    Todo.findOne({ _id: ObjectId( req.params.id)})
    .then( (todoItem)=> {
        if(!todoItem){
            return (next(createError(404,"no todo with that id")))
            }
           
            todoItem.name = req.body.name
            todoItem.description = req.body.description
            todoItem.completed = req.body.completed
            todoItem.save()
            .then (() => res.send({result:true}))

    })

}

exports.delete = function (req,res,next) {

    Todo.deleteOne({ _id: ObjectId(req.params.id)})
    .then( (r) =>{
        if(r.deletedCount){
            return res.send({result:true});
        }
        return (next(createError(404,"no todo with that id")))

    })
    .catch( (err)  => console.log(err))
    
}