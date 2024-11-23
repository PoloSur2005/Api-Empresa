const mongoose = require('mongoose');
const Encargado = require('./Encargado');  // Importar el modelo de Encargado
const Area = require('./Area')

const DepartamentoSchema = mongoose.Schema({
    NumeroDepartamento: {
        type: Number,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true
    },
    IdEncargado: {
        type: Number,  // ID numérico del encargado
        required: true,
        validate: {
            validator: async function(value) {
                // Validación personalizada para verificar que el ID numérico existe
                const encargado = await Encargado.findOne({ IdEncargado: value });  // Buscar por el campo numérico
                return encargado !== null;  // Si no se encuentra un encargado, la validación falla
            },
            message: 'El ID del encargado no existe'
        }
    },
    IdArea: {
        type: Number,
        required: true,
        validate: {
            // Suponiendo que el IdArea también es numérico
            validator: async function(value) {
                const area = await Area.findOne({ IdArea: value });  // Validación para el área
                return area !== null;
            },
            message: 'El ID del área no existe'
        }
    }
}, { versionKey: false });

const Departamento = mongoose.model('Departamento', DepartamentoSchema);

module.exports = Departamento;

