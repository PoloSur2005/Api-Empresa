const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');
const Encargado = require('../models/Encargado');
const Area = require('../models/Area');
const Empleado = require('../models/Empleado');

// Función auxiliar para obtener la información completa de un departamento
async function getAllDepartamento(id) {
  try {
    const departamento = await Departamento.findOne({ NumeroDepartamento: id });

    if (!departamento) {
      throw new Error('Departamento no encontrado');
    }

    const encargado = await Encargado.findOne({ IdEncargado: departamento.IdEncargado });
    const area = await Area.findOne({ IdArea: departamento.IdArea });

    if (!encargado || !area) {
      throw new Error('El encargado o el área no existen');
    }

    let respuesta = departamento.toObject();
    respuesta.encargado = encargado;
    respuesta.area = area;
    delete respuesta.IdArea;
    delete respuesta.IdEncargado;

    return respuesta;
  } catch (error) {
    console.error('Error al obtener el departamento:', error);
    throw error;
  }
}

/**
 * @swagger
 * tags:
 *   name: Departamento
 *   description: API para gestionar departamentos en la empresa
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     tags: [Departamento]
 *     summary: Obtener todos los departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   NumeroDepartamento:
 *                     type: integer
 *                   Nombre:
 *                     type: string
 *                   IdEncargado:
 *                     type: integer
 *                   IdArea:
 *                     type: integer
 */
router.get('/', (req, res) => {
  Departamento.find()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener los departamentos', error: e });
    });
});

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     tags: [Departamento]
 *     summary: Crear un nuevo departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             NumeroDepartamento: 101
 *             Nombre: "Desarrollo"
 *             IdEncargado: 2
 *             IdArea: 3
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 NumeroDepartamento:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 IdEncargado:
 *                   type: integer
 *                 IdArea:
 *                   type: integer
 */
router.post('/', (req, res) => {
  const { NumeroDepartamento, Nombre, IdEncargado, IdArea } = req.body;

  Encargado.findOne({ IdEncargado })
    .then(encargado => {
      if (!encargado) {
        return res.status(400).json({ message: 'El ID del encargado no existe' });
      }

      Area.findOne({ IdArea })
        .then(area => {
          if (!area) {
            return res.status(400).json({ message: 'El ID del área no existe' });
          }

          const newDepartamento = new Departamento({
            NumeroDepartamento,
            Nombre,
            IdEncargado,
            IdArea
          });

          newDepartamento.save()
            .then(data => {
              res.status(201).json(data);
            })
            .catch(e => {
              res.status(500).json({ message: 'Error al crear el departamento', error: e });
            });
        })
        .catch(e => {
          res.status(500).json({ message: 'Error al verificar el ID del área', error: e });
        });
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al verificar el ID del encargado', error: e });
    });
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     tags: [Departamento]
 *     summary: Obtener un departamento por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 NumeroDepartamento:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 encargado:
 *                   type: object
 *                 area:
 *                   type: object
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  getAllDepartamento(id)
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener el departamento', error: e });
    });
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   patch:
 *     tags: [Departamento]
 *     summary: Actualizar un departamento por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del departamento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre: "Desarrollo"
 *             IdEncargado: 5
 *             IdArea: 6
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *       404:
 *         description: Departamento no encontrado
 *       400:
 *         description: Campos faltantes o inválidos
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, IdEncargado, IdArea } = req.body;

  const updateData = {};
  const promises = [];

  if (Nombre) updateData.Nombre = Nombre;

  if (IdEncargado) {
    const encargadoPromise = Encargado.findOne({ IdEncargado })
      .then(encargado => {
        if (!encargado) throw new Error('El ID del encargado no existe');
        updateData.IdEncargado = IdEncargado;
      });
    promises.push(encargadoPromise);
  }

  if (IdArea) {
    const areaPromise = Area.findOne({ IdArea })
      .then(area => {
        if (!area) throw new Error('El ID del área no existe');
        updateData.IdArea = IdArea;
      });
    promises.push(areaPromise);
  }

  Promise.all(promises)
    .then(() => {
      return Departamento.findOneAndUpdate(
        { NumeroDepartamento: id },
        { $set: updateData },
        { new: true }
      );
    })
    .then(updatedDepartamento => {
      if (!updatedDepartamento) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
      res.status(200).json(updatedDepartamento);
    })
    .catch(e => {
      if (e.message === 'El ID del encargado no existe' || e.message === 'El ID del área no existe') {
        return res.status(400).json({ message: e.message });
      }
      res.status(500).json({ message: 'Error al actualizar el departamento', error: e.message });
    });
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     tags: [Departamento]
 *     summary: Eliminar un departamento por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del departamento a eliminar
 *     responses:
 *       200:
 *         description: Departamento eliminado
 *       400:
 *         description: El departamento está en uso por un empleado
 *       404:
 *         description: Departamento no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const empleado = await Empleado.findOne({
      $or: [
        { Departamento1Id: id },
        { Departamento2Id: id },
        { Departamento3Id: id }
      ]
    });

    if (empleado) {
      return res.status(400).json({ message: 'Este departamento no se puede eliminar porque está en uso por un empleado.' });
    }

    const departamentoEliminado = await Departamento.findOneAndDelete({ NumeroDepartamento: id });

    if (!departamentoEliminado) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }

    res.json({ message: 'Departamento eliminado exitosamente', data: departamentoEliminado });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el departamento', error: error.message });
  }
});

module.exports = { getAllDepartamento, router };
