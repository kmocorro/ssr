import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderFullPage from './renderFullPage'
import getDashboard from '../services/getDashboard'
import App from '../components/App'

import Cookies from 'universal-cookie'

export default function router(req, res){

    const cookies = new Cookies(req.headers.cookie);
    const cookie_ldap = cookies.get('ldap_token');

    const match = routes.reduce((acc, route) =>
        matchPath(req.url, {
            path: route,
            exact: true
        }) || acc, null
    );

    if(!match){
        res.status(404).send('Page not found.');
    }

    if(cookie_ldap){
        
        return getDashboard()
        .then(response => {
            const meta_api = { data: response.data }

            const context = {}
            console.log(meta_api);
            
            const html = renderToString(
                <StaticRouter context={context} location={req.url} >
                    <App meta={meta_api}/>
                </StaticRouter>
            )
    
            res.status(200).send(renderFullPage(html, meta_api));

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

    
}