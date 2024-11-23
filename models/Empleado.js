const mongoose = require('mongoose');
const Departamento = require('./Departamento');

const EmpleadoSchema = mongoose.Schema({
    NumeroEmpleado:{
        type: Number,
        require: true,
        unique:true
    },
    Nombre:{
        type: String,
        require:true
    },
    Apellido:{
        type: String,
        require:true
    },
    Edad:{
        type: Number,
        require:true
    },
    Genero:{
        type: String,
        require:true
    },
    Departamento1Id:{
        type: Number,
        require:true,
        validate: {
            validator: async function (value) {
                const departamento = await Departamento.findOne({ NumeroDepartamento: value});
                return departamento !== null;
            },
            message: 'El ID del departamento no existe'
        }
    },
    Departamento2Id:{
        type: Number,
        require:true,
        validate: {
            validator: async function (value) {
                const departamento = await Departamento.findOne({ NumeroDepartamento: value});
                return departamento !== null;
            },
            message: 'El ID del departamento no existe'
        }
    },
    Departamento3Id:{
        type: Number,
        require:true,
        validate: {
            validator: async function (value) {
                const departamento = await Departamento.findOne({ NumeroDepartamento: value});
                return departamento !== null;
            },
            message: 'El ID del departamento no existe'
        }
    }
},{ versionKey: false})

const Empleado = mongoose.model('Empleado', EmpleadoSchema);

//Importar el Esquema para que pueda ser usado en diferentes modelos
module.exports = Empleado;