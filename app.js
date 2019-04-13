import express from 'express';
import dotenv from 'dotenv';
import routes from './server/routes/routes';

dotenv.config();

const app = express();
app.use(express.json());
routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Banka listens on port ${port}`));
module.exports = app;
