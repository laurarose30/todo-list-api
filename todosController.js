const createError = require("http-errors")
const  ObjectId = require('mongodb').ObjectId;
let todoList = []
let idno = 0

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mongo-colin:p4ssw0rd@cluster0.ywlkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const uri = "mongodb+srv://Sazzle:sazzlemongo1@cluster0.opbm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


exports.index = async function(req,res){
   
    client.connect(async (err) => {
        const collection = client.db("bliss-bakery").collection("todo");
        // perform actions on the collection object
        
        const findPromise = collection.find()
        res.send(await findPromise.toArray())
        
        
      });
}

exports.create = async function (req,res,next){
    if(!req.body.name){
        return (next(createError(400,"name is required")))
    }

    client.connect(async (err) => {
        const collection = client.db("bliss-bakery").collection("todo");
        // perform actions on the collection object
        collection.insertOne(
            {
                name: req.body.name,
                description: req.body.description
            }
        )
        .then(() => res.send({result: "true"}))
        
        
    });
    
    /*todoList.push({
        id: idno,
        name: req.body.name,
        description: req.body.description
    });*/
    idno++;
    //res.send({result: "true"})
}

exports.show = async function (req,res,next) {

    client.connect(async (err) => {
        const collection = client.db("bliss-bakery").collection("todo");
        // perform actions on the collection object
        collection.findOne({ _id: ObjectId( req.params.id)})
        .then( (todoItem) => {
            if(!todoItem){
            return (next(createError(404,"no todo with that id")))
            }
            res.send(todoItem);

        })
        .catch ( err => console.log(err))

       
});  /*
    const todoItem = todoList.find( (item) => item.id == req.params.id )
    if(!todoItem) {
        return (next(createError(404,"no todo with that id")))
    }

    res.send(todoItem)*/

}

exports.update = async function (req,res,next){

    client.connect(async (err) => {
        const collection = client.db("bliss-bakery").collection("todo");
        // perform actions on the collection object
        const r = await (await collection).updateOne({ _id: ObjectId(req.params.id)},{ $set: {name:req.body.name, description:req.body.description,completed: req.body.completed}})
        if(r.matchedCount){
            return res.send({result:true})
        }
        return (next(createError(404,"no todo with that id")))

      
}); 
    
}

exports.delete = function (req,res,next) {
    //verifying
    client.connect(async (err) => {
        const collection = client.db("bliss-bakery").collection("todo");
        // perform actions on the collection object
        collection.deleteOne({ _id: ObjectId(req.params.id)})
        .then ((r) => {
            if(r.deletedCount){
                return res.send({result:true});
            }
            return (next(createError(404,"no todo with that id")))
        })
       
    }); 
    
    
}