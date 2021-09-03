import { Request, Router } from 'express'
import { Response } from 'express-serve-static-core';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter)

export default routes;