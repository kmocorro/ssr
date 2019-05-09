import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderFullPage from './renderFullPage'
//import getDashboard from '../services/getDashboard'
import App from '../components/App'

import axios from 'axios'

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

    console.log(cookie_ldap);

    function getDashboard(){
        return axios.get(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard`, {withCredentials: true}).then(response => {
            const meta_api = { data: response.data }

            console.log(meta_api);
    
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
                
                const html = renderToString(
                    <StaticRouter context={context} location={req.url} >
                        <App meta={meta_api}/>
                    </StaticRouter>
                )
    
                res.status(200).send(renderFullPage(html, meta_api));
            }
        })
        .catch(err => res.status(404).send(`${err}: gg sir.`));
    }

    if(cookie_ldap){
        console.log('okay loggedin. there\'s token. now what? ');
        
        getDashboard();
        
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