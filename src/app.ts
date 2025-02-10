import express, { Application } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import routerApi from './routes/index';

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 3000;

app.use( cors() );
app.use(express.json());  


routerApi(app);

app.listen(port, () => {
    console.log(`server running in port ${port}`);
});

export default app;


