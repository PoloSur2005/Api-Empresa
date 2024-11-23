const mongoose = require('mongoose');

const EncargadoSchema = mongoose.Schema({
    IdEncargado: {
        type: Number,
        required: true,
        unique: true   // Asegura que el Id del encargado sea único
    },
    Nombre: {
        type: String,
        required: true
    },
    Estudio: {
        type: String,
        required: true
    },
    Turno: {
        type: String,
        required: true
    }
}, { versionKey: false });  // Deshabilitar el campo __v de versiones

// Crear el modelo de Mongoose para la colección 'Encargado'
const Encargado = mongoose.model('Encargado', EncargadoSchema);

// Exportar el modelo para que pueda ser usado en otros archivos
module.exports = Encargado;
