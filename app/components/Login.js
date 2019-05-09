import React from 'react';
import Auther from './Auth';
import { Redirect } from 'react-router-dom';

export default () => {

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
                ? <Redirect to='/' />
                : <Auther />
            }
        </div>

    )
}
