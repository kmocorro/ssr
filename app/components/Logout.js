import React from 'react';
import { Redirect } from 'react-router-dom';

export default () => {

    function logout(){
        if (typeof window !== 'undefined') {
            localStorage.removeItem('ldap_token');
        }
    }

    logout();
    
    return (
        <Redirect to='/' />
    )

}