const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    author: String,
    title: String,
    status: String

})

module.exports.Book = mongoose.model('book',bookSchema,'book')