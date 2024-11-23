// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Importar el modelo Book

// Ruta para obtener todos los libros
router.get('/', (req, res) => {
  Book.find()
    .then(data => {
      res.json(data); 
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener los libros', error: e });
    });
});

// Ruta para crear un nuevo libro
router.post('/', (req, res) => {
  const { title, description } = req.body; 
  // Crear un nuevo libro con los datos recibidos
  const newBook = new Book({
    title: title,
    description: description
  });

  // Guardar el nuevo libro en la base de datos
  newBook.save()
    .then(data => {
      res.status(201).json(data); 
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al crear el libro', error: e });
    });
});

// Ruta para obtener un libro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params; 

  Book.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Libro no encontrado' });
      } else {
        res.json(data); 
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al obtener el libro', error: e });
    });
});

// Ruta para actualizar un libro por ID
router.put('/:id', (req, res) => {
  const { id } = req.params; 
  const { title, description } = req.body; 
  // Buscar y actualizar el libro
  Book.findByIdAndUpdate(id, { title, description }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Libro no encontrado' });
      } else {
        res.json(data); 
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al actualizar el libro', error: e });
    });
});

// Ruta para eliminar un libro por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; 

  Book.findByIdAndDelete(id, {new: true})
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Libro no encontrado' });
      } else {
        res.json({ message: 'Libro eliminado exitosamente', data });
      }
    })
    .catch(e => {
      res.status(500).json({ message: 'Error al eliminar el libro', error: e });
    });
});

module.exports = router;
