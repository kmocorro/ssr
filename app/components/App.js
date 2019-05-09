import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Auth from './Auth'
import RMP from './RMP'
import Login from './Login'
import Logout from './Logout'

export default (metaDashboard) => {
    function isLoggedIn(){
        let tokener = getToken();
        return tokener; //blnk false
    }

    function getToken(){
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ldap_token');
        }
    }

    return (
        <div>
            { isLoggedIn()
                ? 
                <div>
                    <Switch>
                        <Route path="/" exact render={() => <Home {...metaDashboard}/>}/>
                        <Route path="/uploader/rmp" component={RMP}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
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