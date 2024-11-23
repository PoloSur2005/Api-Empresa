// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentacion de la API', // Título de la documentación
        version: '1.0.0', // Versión de la API
        description: 'Documentacion de la API Proyecto Final', // Descripción del proyecto
    },
    servers: [
        {
            url: 'http://localhost:3000/', // URL del servidor de desarrollo
            description: 'Servidor de Desarrollo',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Ajusta la ruta de los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    // Configuración adicional para Swagger UI
    const swaggerOptions = {
        swaggerOptions: {
            docExpansion: 'none', // Establece que las secciones de tags estén contraídas por defecto
        },
    };

    // Usar swagger-ui-express con la configuración adicional
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
}

module.exports = setupSwagger;
