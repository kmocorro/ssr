import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderFullPage from './renderFullPage'
import getDashboard from '../services/getDashboard'
import App from '../components/App'

export default function router(req, res){
    const match = routes.reduce((acc, route) =>
        matchPath(req.url, {
            path: route,
            exact: true
        }) || acc, null
    );

    if(!match){
        res.status(404).send('Page not found.');
    }

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
        console.log('okay loggedin. there\'s token. now what? ');
        return getDashboard()
        .then(response => {
            const meta_api = { data: response.data }
    
            if(meta_api.data.code === 1){
    
                const context = {}
                console.log(meta_api);
                
                const html = renderToString(
                    <StaticRouter context={context} location={req.url} >
                        <App meta={meta_api}/>
                    </StaticRouter>
                )
        
                res.status(200).send(renderFullPage(html, meta_api));
    
            } else {
    
                const context = {}
                console.log(meta_api);
                
                const html = renderToString(
                    <StaticRouter context={context} location={req.url} >
                        <App meta={meta_api}/>
                    </StaticRouter>
                )
    
                res.status(200).send(renderFullPage(html, meta_api));
            }
    
        })
        .catch(err => res.status(404).send(`${err}: gg sir.`));
        
    } else {
        console.log('Cant read token. what\'s happening');
        const context = {}

        const html = renderToString(
            <StaticRouter context={context} location={req.url} >
                <App />
            </StaticRouter>
        )

        res.status(200).send(renderFullPage(html, {}));
    }

    
}