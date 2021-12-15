const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./router')
const mongoose = require('mongoose');

app.use(express.json())
app.use(router)
const uri = "mongodb+srv://mongo-colin:p4ssw0rd@cluster0.ywlkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri);

app.listen(port, () =>{
    console.log(`example app listening a http://localhost:${port}`)
})

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected")
})