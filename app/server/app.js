import path from 'path'
import express from 'express'
import cors from 'cors'

import router from './router'
import cookiesMiddleware from 'universal-cookie-express'

const app = express();
app.use(cookiesMiddleware());
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

app.get('*', router);

export default app;