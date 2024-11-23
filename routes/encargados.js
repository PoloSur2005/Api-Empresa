const express = require('express');
const router = express.Router();
const Encargado = require('../models/Encargado'); // Importar el modelo de Encargado
const Departamento = require ('../models/Departamento');

// Documentación Swagger para el recurso "Encargado"

/**
 * @swagger
 * tags:
 *   name: Encargado
 *   description: API para gestionar encargados en la empresa
 */

/**
 * @swagger
 * /api/encargados:
 *   get:
 *     tags: [Encargado]
 *     summary: Obtener todos los encargados
 *     responses:
 *       200:
 *         description: Lista de encargados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   IdEncargado:
 *                     type: integer
 *                   Nombre:
 *                     type: string
 *                   Estudio:
 *                     type: string
 *                   Turno:
 *                     type: string
 */
router.get('/', (req, res) => {
  Encargado.find()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener los encargados', error: e });
    });
});

/**
 * @swagger
 * /api/encargados/{id}:
 *   get:
 *     tags: [Encargado]
 *     summary: Obtener un encargado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del encargado
 *     responses:
 *       200:
 *         description: Encargado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdEncargado:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Estudio:
 *                   type: string
 *                 Turno:
 *                   type: string
 *       404:
 *         description: Encargado no encontrado
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Encargado.findOne({ IdEncargado: id })  // Buscar por IdEncargado
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Encargado no encontrado' });
      } else {
        res.json(data);
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener el encargado', error: e });
    });
});

/**
 * @swagger
 * /api/encargados:
 *   post:
 *     tags: [Encargado]
 *     summary: Crear un nuevo encargado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             IdEncargado: 80
 *             Nombre: "El Pepe"
 *             Estudio: "Software"
 *             Turno: "Noche"
 *     responses:
 *       201:
 *         description: Encargado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdEncargado:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Estudio:
 *                   type: string
 *                 Turno:
 *                   type: string
 */
router.post('/', (req, res) => {
  const { IdEncargado, Nombre, Estudio, Turno } = req.body;

  // Crear un nuevo encargado con los datos recibidos
  const newEncargado = new Encargado({
    IdEncargado,
    Nombre,
    Estudio,
    Turno
  });

  // Guardar el nuevo encargado en la base de datos
  newEncargado.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al crear el encargado', error: e });
    });
});

/**
 * @swagger
 * /api/encargados/{id}:
 *   patch:
 *     tags: [Encargado]
 *     summary: Actualizar un encargado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del encargado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Nombre: "El Pepe"
 *             Estudio: "Software"
 *             Turno: "Noche"
 *     responses:
 *       200:
 *         description: Encargado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 IdEncargado:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 Estudio:
 *                   type: string
 *                 Turno:
 *                   type: string
 *       404:
 *         description: Encargado no encontrado
 *       400:
 *         description: Campos faltantes
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Estudio, Turno } = req.body;

  if (!Nombre || !Estudio || !Turno) {
    return res.status(400).json({ message: 'Faltan campos necesarios (Nombre, Estudio y Turno)' });
  }

  // Actualizar el encargado con los nuevos datos
  Encargado.findOneAndUpdate(
    { IdEncargado: id },
    { Nombre, Estudio, Turno },
    { new: true }  // Retorna el documento actualizado
  )
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Encargado no encontrado' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al actualizar el encargado', error: e });
    });
});

/**
 * @swagger
 * /api/encargados/{id}:
 *   delete:
 *     tags: [Encargado]
 *     summary: Eliminar un encargado por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del encargado a eliminar
 *     responses:
 *       200:
 *         description: Encargado eliminado exitosamente
 *       400:
 *         description: El encargado está en uso en un departamento y no se puede eliminar
 *       404:
 *         description: Encargado no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const departamento = await Departamento.findOne({ IdEncargado: id });

    if (departamento) {
      return res.status(400).json({ message: 'Este encargado está en uso en un departamento y no se puede eliminar.' });
    }

    const data = await Encargado.findOneAndDelete({ IdEncargado: id });

    if (!data) {
      return res.status(404).json({ message: 'Encargado no encontrado' });
    }

    res.json({ message: 'Encargado eliminado exitosamente', data });

  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar el encargado', error: e.message });
  }
});

module.exports = router;
