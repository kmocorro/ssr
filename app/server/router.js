import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

import routes from './routes'
import renderFullPage from './renderFullPage'
import getDashboard from '../services/getDashboard'
import getRMP from '../services/getRMP'
import App from '../components/App'

export default function router(req, res){

    let cookie_ldap = req.universalCookies.get('ldap_token');

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
        
        return getDashboard(cookie_ldap).then((dashboard) => {
            return getRMP(cookie_ldap).then((rmp) => {
                const apiResponse = {...dashboard, ...rmp};
                const context = {};

                console.log(apiResponse);
                
                const html = renderToString(
                    <StaticRouter context={context} location={req.url} >
                        <App meta={apiResponse}/>
                    </StaticRouter>
                )
                res.status(200).send(renderFullPage(html, apiResponse));
            }).catch(err => res.status(404).send(`${err}: gg sir.`));
        }).catch(err => res.status(404).send(`${err}: gg sir.`));

        
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