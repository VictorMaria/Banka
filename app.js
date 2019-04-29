import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './server/routes/routes';

dotenv.config();

const app = express();
app.use(express.json());
routes(app);

const swaggerDefinition = {
  info: {
    title: 'Banka',
    version: '1.0.0',
    description: 'A light weight banking app',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger-doc/*.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'No such endpoints on this server',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Banka listens on port ${port}`));
module.exports = app;
