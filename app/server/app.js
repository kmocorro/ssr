import path from 'path'
import express from 'express'
import cors from 'cors'

import dash_router from './dash_router'

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());

app.use(assets);

app.get('/', dash_router);
app.get('/uploader/rmp', dash_router);

export default app;