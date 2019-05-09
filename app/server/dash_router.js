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

    if(req.url !== '/'){
        
        const context = {}

        const html = renderToString(
            <StaticRouter context={context} location={req.url} >
                <App meta={}/>
            </StaticRouter>
        )

        res.status(200).send(renderFullPage(html, {}));

    } else {

        return getDashboard()
        .then(response => {
            const metaDashboard = { data: response.data }

            const context = {}

            console.log(metaDashboard)
            
            const html = renderToString(
                <StaticRouter context={context} location={req.url} >
                    <App meta={metaDashboard}/>
                </StaticRouter>
            )

            res.status(200).send(renderFullPage(html, metaDashboard));
        })
        .catch(err => res.status(404).send(`${err}: gg sir.`));
    }

    

}