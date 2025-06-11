const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express JWT Example API',
      version: '1.0.0',
      description: 'API documentation for Express JWT authentication example',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Employee: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            id: { type: 'integer', description: 'Auto-generated ID' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            jobTitle: { type: 'string' },
            department: { type: 'string' },
            salary: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          },
          example: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            jobTitle: 'Software Engineer',
            department: 'IT',
            salary: 80000,
            createdAt: '2025-06-11T12:00:00.000Z',
            updatedAt: '2025-06-11T12:00:00.000Z'
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/auth.js', './routes/employees.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Enable persistAuthorization for Swagger UI
const swaggerUiOptions = {
  swaggerOptions: {
    persistAuthorization: true
  }
};

module.exports = { swaggerUi, swaggerSpec, swaggerUiOptions };
