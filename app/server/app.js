import path from 'path'
import express from 'express'
import cors from 'cors'

import router from './router'

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());

app.use(assets);

app.get('/*', router);
app.get('/logout', (req, res) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('ldap_token');
    }
    res.status(200).send('You have been logged out.');
})

export default app;