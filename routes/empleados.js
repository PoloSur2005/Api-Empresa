const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');
const { getAllDepartamento } = require('./departamentos');

// Función auxiliar para obtener la información completa de un empleado, incluyendo los departamentos asociados
async function getAllEmpleado(id) {
  try {
    const empleado = await Empleado.findOne({ NumeroEmpleado: id });
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }

    let respuesta = empleado.toObject();
    respuesta.departamento1 = await getAllDepartamento(respuesta.Departamento1Id);
    respuesta.departamento2 = await getAllDepartamento(respuesta.Departamento2Id);
    respuesta.departamento3 = await getAllDepartamento(respuesta.Departamento3Id);

    // Eliminamos los identificadores de departamentos
    delete respuesta.Departamento1Id;
    delete respuesta.Departamento2Id;
    delete respuesta.Departamento3Id;

    return respuesta;

  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    throw error;
  }
}

/**
 * @swagger
 * tags:
 *   name: Empleado
 *   description: API para gestionar empleados en la empresa
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     tags: [Empleado]
 *     summary: Obtener todos los empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   NumeroEmpleado:
 *                     type: integer
 *                   Nombre:
 *                     type: string
 *                   Apellido:
 *                     type: string
 *                   Edad:
 *                     type: integer
 *                   Genero:
 *                     type: string
 *                   Departamento1Id:
 *                     type: integer
 *                   Departamento2Id:
 *                     type: integer
 *                   Departamento3Id:
 *                     type: integer
 */
router.get('/', (req, res) => {
  Empleado.find()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener los empleados', error: e });
    });
});

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     tags: [Empleado]
 *     summary: Crear un nuevo empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             NumeroEmpleado: 1
 *             Nombre: "Juan"
 *             Apellido: "Pérez"
 *             Edad: 30
 *             Genero: "Masculino"
 *             Departamento1Id: 101
 *             Departamento2Id: 102
 *             Departamento3Id: 103
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 NumeroEmpleado:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Apellido:
 *                   type: string
 *                 Edad:
 *                   type: integer
 *                 Genero:
 *                   type: string
 *                 Departamento1Id:
 *                   type: integer
 *                 Departamento2Id:
 *                   type: integer
 *                 Departamento3Id:
 *                   type: integer
 */
router.post('/', (req, res) => {
  const { NumeroEmpleado, Nombre, Apellido, Edad, Genero, Departamento1Id, Departamento2Id, Departamento3Id } = req.body;

  const newEmpleado = new Empleado({
    NumeroEmpleado,
    Nombre,
    Apellido,
    Edad,
    Genero,
    Departamento1Id,
    Departamento2Id,
    Departamento3Id
  });

  newEmpleado.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al crear el empleado', error: e });
    });
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     tags: [Empleado]
 *     summary: Obtener un empleado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 NumeroEmpleado:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Apellido:
 *                   type: string
 *                 Edad:
 *                   type: integer
 *                 Genero:
 *                   type: string
 *                 departamento1:
 *                   type: object
 *                 departamento2:
 *                   type: object
 *                 departamento3:
 *                   type: object
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  getAllEmpleado(id)
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener el empleado', error: e });
    });
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   patch:
 *     tags: [Empleado]
 *     summary: Actualizar un empleado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre: "Carlos"
 *             Apellido: "Gómez"
 *             Edad: 35
 *             Genero: "Masculino"
 *             Departamento1Id: 104
 *             Departamento2Id: 105
 *             Departamento3Id: 106
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 *       400:
 *         description: Campos faltantes o inválidos
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellido, Edad, Genero, Departamento1Id, Departamento2Id, Departamento3Id } = req.body;

  const updateData = {};
  const promises = [];

  // Validación para Departamento1Id
  if (Departamento1Id) {
    const departamento1Promise = Departamento.findOne({ NumeroDepartamento: Departamento1Id })
      .then(departamento => {
        if (!departamento) {
          throw new Error('El ID del Departamento1 no existe');
        }
        updateData.Departamento1Id = Departamento1Id;
      });
    promises.push(departamento1Promise); // Agregar la promesa a la lista
  }

  // Validación para Departamento2Id
  if (Departamento2Id) {
    const departamento2Promise = Departamento.findOne({ NumeroDepartamento: Departamento2Id })
      .then(departamento => {
        if (!departamento) {
          throw new Error('El ID del Departamento2 no existe');
        }
        updateData.Departamento2Id = Departamento2Id;
      });
    promises.push(departamento2Promise); // Agregar la promesa a la lista
  }

  // Validación para Departamento3Id
  if (Departamento3Id) {
    const departamento3Promise = Departamento.findOne({ NumeroDepartamento: Departamento3Id })
      .then(departamento => {
        if (!departamento) {
          throw new Error('El ID del Departamento3 no existe');
        }
        updateData.Departamento3Id = Departamento3Id;
      });
    promises.push(departamento3Promise); // Agregar la promesa a la lista
  }

  // Esperamos a que todas las validaciones se resuelvan
  Promise.all(promises)
    .then(() => {
      if (Nombre) updateData.Nombre = Nombre;
      if (Apellido) updateData.Apellido = Apellido;
      if (Edad) updateData.Edad = Edad;
      if (Genero) updateData.Genero = Genero;

      return Empleado.findOneAndUpdate(
        { NumeroEmpleado: id },
        { $set: updateData },
        { new: true }
      );
    })
    .then(updatedEmpleado => {
      if (!updatedEmpleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      res.status(200).json(updatedEmpleado);
    })
    .catch(e => {
      if (e.message.includes('El ID del Departamento')) {
        return res.status(400).json({ message: e.message });
      }
      res.status(500).json({ message: 'Error al actualizar el empleado', error: e.message });
    });
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     tags: [Empleado]
 *     summary: Eliminar un empleado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Empleado.findOneAndDelete({ NumeroEmpleado: id })
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      res.json({ message: 'Empleado eliminado exitosamente', data });
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al eliminar el empleado', error: e });
    });
});

module.exports = router;

