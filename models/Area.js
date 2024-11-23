const mongoose = require('mongoose');

const AreaSchema = mongoose.Schema({
    IdArea: {
        type: Number,
        required: true,
        unique: true  // Asegura que el Id del área sea único
    },
    Nombre: {
        type: String,
        required: true
    },
    Edificio: {
        type: String,
        required: true
    }
}, { versionKey: false });  // Deshabilitar el campo __v de versiones

// Crear el modelo de Mongoose para la colección 'Área'
const Area = mongoose.model('Area', AreaSchema);

// Exportar el modelo para que pueda ser usado en otros archivos
module.exports = Area;
