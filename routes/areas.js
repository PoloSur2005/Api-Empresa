const express = require('express');
const router = express.Router();
const Area = require('../models/Area');
const Departamento = require('../models/Departamento');

/**
 * @swagger
 * tags:
 *   name: Area
 *   description: API para gestionar áreas en la empresa
 */

/**
 * @swagger
 * /api/areas:
 *   get:
 *     tags: [Area]
 *     summary: Obtener todos los áreas
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   IdArea:
 *                     type: integer
 *                   Nombre:
 *                     type: string
 *                   Edificio:
 *                     type: string
 */
router.get('/', (req, res) => {
  Area.find()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener las áreas', error: e });
    });
});

/**
 * @swagger
 * /api/areas:
 *   post:
 *     tags: [Area]
 *     summary: Crear un nuevo área
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             IdArea: 1
 *             Nombre: "Administración"
 *             Edificio: "Edificio A"
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdArea:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Edificio:
 *                   type: string
 */
router.post('/', (req, res) => {
  const { IdArea, Nombre, Edificio } = req.body;

  const newArea = new Area({
    IdArea,
    Nombre,
    Edificio
  });

  newArea.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al crear el área', error: e });
    });
});

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     tags: [Area]
 *     summary: Obtener un área por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdArea:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Edificio:
 *                   type: string
 *       404:
 *         description: Área no encontrada
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Area.findOne({ IdArea: id })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Área no encontrada' });
      } else {
        res.json(data);
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener el área', error: e });
    });
});

/**
 * @swagger
 * /api/areas/{id}:
 *   patch:
 *     tags: [Area]
 *     summary: Actualizar un área por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre: "Administración"
 *             Edificio: "Edificio A"
 *     responses:
 *       200:
 *         description: Área actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdArea:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Edificio:
 *                   type: string
 *       400:
 *         description: Campos faltantes
 *       404:
 *         description: Área no encontrada
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Edificio } = req.body;

  if (!Nombre || !Edificio) {
    return res.status(400).json({ message: 'Faltan campos necesarios (Nombre y Edificio)' });
  }

  Area.findOneAndUpdate(
    { IdArea: id },
    { Nombre, Edificio },
    { new: true, runValidators: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Área no encontrada' });
      }
      res.status(200).json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al actualizar el área', error: e.message });
    });
});

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     tags: [Area]
 *     summary: Eliminar un área por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área a eliminar
 *     responses:
 *       200:
 *         description: Área eliminada
 *       400:
 *         description: El área está en uso en un departamento
 *       404:
 *         description: Área no encontrada
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const departamento = await Departamento.findOne({ IdArea: id });

    if (departamento) {
      return res.status(400).json({ message: 'Este área está en uso en un departamento y no se puede eliminar.' });
    }

    const areaEliminada = await Area.findOneAndDelete({ IdArea: id });

    if (!areaEliminada) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }

    res.json({ message: 'Área eliminada exitosamente', data: areaEliminada });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el área', error: error.message });
  }
});

module.exports = router;


