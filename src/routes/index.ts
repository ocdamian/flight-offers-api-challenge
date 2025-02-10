import { Application, Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from '../utils/swaggerOptions';

import offerRoutes from './flights.routes';
import airportRoutes from './airports.routes';

const specs = swaggerJsDoc(options);
const version = 'v1';
const routerApi = (app: Application) => {
    const router = Router();
    app.use(`/api/${version}`, router);
    app.use(`/api/${version}/docs`, swaggerUI.serve, swaggerUI.setup(specs));
    router.use('/', offerRoutes);
    router.use('/', airportRoutes);
}

export default routerApi;