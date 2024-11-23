const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const setupSwagger = require('./swagger');

const bookRoutes = require('./routes/books');
const empleadoRoutes = require('./routes/empleados');
const {router} = require('./routes/departamentos'); //Solo se llama a router ya que este archivo tambien exporta una funcion no solo el Router
const areaRoutes = require('./routes/areas');
const encargadoRoutes = require('./routes/encargados');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB localmente'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// usar rutas
app.use('/api/books', bookRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/departamentos', router);
app.use('/api/areas', areaRoutes);
app.use('/api/encargados', encargadoRoutes);

setupSwagger(app)

// puerto del servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

