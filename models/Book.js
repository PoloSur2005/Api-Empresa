const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String
    }
},{ versionKey: false})

const Book = mongoose.model('Book', BookSchema);

//Importar el Esquema para que pueda ser usado en diferentes modelos
module.exports = Book;