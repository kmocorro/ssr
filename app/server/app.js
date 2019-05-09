import path from 'path'
import express from 'express'
import cors from 'cors'

import routes from './routes'
import renderFullPage from './renderFullPage'
import getDashboard from '../services/getDashboard'
import App from '../components/App'

import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

// controllolers
app.get('*', (req, res) => {
    const match = routes.reduce((acc, route) =>
        matchPath(req.url, {
            path: route,
            exact: true
        }) || acc, null
    );

    if(!match){
        res.status(404).send('Page not found.');
    }
});

// home/auth
app.get('/', (req, res) => {
    function isLoggedIn(){
        let tokener = getToken();
        return tokener; //blnk false
    }

    function getToken(){
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ldap_token');
        }
    }

    if(isLoggedIn()){
        window.location.reload(); // uhm...

        return getDashboard()
        .then(response => {
            const metaDashboard = { data: response.data }

            const context = {}
            console.log(metaDashboard);
            
            const html = renderToString(
                <StaticRouter context={context} location={req.url} >
                    <App meta={metaDashboard}/>
                </StaticRouter>
            )

            res.status(200).send(renderFullPage(html, metaDashboard));
        })
        .catch(err => res.status(404).send(`${err}: gg sir.`));

    } else {
        const context = {}
        
        const html = renderToString(
            <StaticRouter context={context} location={req.url} >
                <App />
            </StaticRouter>
        )
        
        res.status(200).send(renderFullPage(html, {}));
    }


});


export default app;