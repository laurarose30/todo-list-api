const createError = require("http-errors")
let todoList = []
let idno = 0
exports.index = function(req,res){
    res.send(todoList)

}

exports.create = function (req,res,next){
    if(!req.body.name){
        return (next(createError(400,"name is required")))
    }

    todoList.push({
        id: idno,
        name: req.body.name,
        description: req.body.description
    });
    idno++;
    res.send({result: "true"})
}

exports.show = function (req,res,next) {
    const todoItem = todoList.find( (item) => item.id == req.params.id )
    if(!todoItem) {
        return (next(createError(404,"no todo with that id")))
    }

    res.send(todoItem)

}

exports.update = function (req,res,next){
    //verifying
    const todoItem = todoList.find( (item) => item.id == req.params.id )
    
    if(!req.body.name){
        return (next(createError(400,"name is required")))
    }

    if(!todoItem) {
        return (next(createError(404,"no todo with that id")))
    }
//updating
    todoList = todoList.map ((item) => {
        if(item.id == req.params.id){
            item.name = req.body.name,
            item.description = req.body.description
        }
        
        return item;

    } )

    res.send({result: true})
}

exports.delete = function (req,res,next) {
    //verifying
    const todoItem = todoList.find( (item) => item.id == req.params.id )

    if(!todoItem) {
        return (next(createError(404,"no todo with that id")))
    }

    //deleting
    todoList = todoList.filter( (item) => item.id != req.params.id)
    res.send({result:true})
}