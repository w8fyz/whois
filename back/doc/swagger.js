// swaggerConfig.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'whois API',
            version: '1.0.0',
            description: 'A simpler API for a simpler way to remember.',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local' },
            { url: 'https://whois-mkgt.onrender.com', description: 'Production' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        profilePicture64: { type: 'string', nullable: true },
                        isAdmin: { type: 'boolean' },
                    },
                },
                UserCreate: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'password'],
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                        profilePicture64: { type: 'string', nullable: true },
                    },
                },
                Contact: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phoneNumber: { type: 'string', nullable: true },
                        company: { type: 'string', nullable: true },
                        notes: { type: 'string', nullable: true },
                        userId: { type: 'string' },
                    },
                },
                ContactCreate: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phoneNumber: { type: 'string', nullable: true },
                        company: { type: 'string', nullable: true },
                        notes: { type: 'string', nullable: true },
                    },
                },
                ContactUpdate: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        phoneNumber: { type: 'string', nullable: true },
                        company: { type: 'string', nullable: true },
                        notes: { type: 'string', nullable: true },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        user: { $ref: '#/components/schemas/User' },
                    },
                },
            },
        },
    },
    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
