import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Cookies from 'universal-cookie'

import Home from './Home'
import Auth from './Auth'
import RMP from './RMP'
import Login from './Login'

export default (metaDashboard) => {

    const cookies = new Cookies();
    const cookie_ldap = cookies.get('ldap_token');

    return (
        <div>
            { cookie_ldap
                ? 
                <div>
                <Switch>
                    <Route path="/" exact render={() => <Home {...metaDashboard}/>}/>
                    <Route path="/uploader/rmp" component={RMP}/>
                    <Route path="/login" component={Login}/>
                </Switch>
                </div>
                : 
                <div>

                <Auth />
                </div>
            }
        </div>
    )
}