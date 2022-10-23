import dayjs from 'dayjs';
import express from 'express';
import helmet from 'helmet';

import errors from './middlewares/errors.js';
//import planetsRoutes from './routes/planets-routes.js';
import studentsRoutes from './routes/students-routes.js';
import studentsStatsRoutes from './routes/students-statistics-routes.js';

const app = express();
app.use(express.json()); //Permettre à notre serveur de comprendre le json reçu

app.use('/students/statistics', studentsStatsRoutes);
app.use('/students', studentsRoutes);

app.use(helmet);
app.use(errors);

export default app;