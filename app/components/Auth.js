import React, { useState } from 'react';
import axios from 'axios';

export default () => {

    const username = useCredential();
    const password = useCredential();

    function useCredential(){
        const [ value, setValue ] = useState('');

        function handleChange(e){
            setValue(e.target.value);
        }

        return {
            value,
            onChange: handleChange
        }

    }

    function handleLoginSubmit(e){
        e.preventDefault();
        document.getElementById('loginSubmit').disabled = true;

        if(!loggedIn()){
            let credentials = {username: username.value, password: password.value};
            
            login(credentials);

        } else {
            console.log('Already signed in.');
            console.log(getToken());
        }
        
    }

    function login(credentials){
        return axios.post(`http://dev-metaspf401.sunpowercorp.com:8080/api/login`, credentials, {withCredentials: true})
        .then(res => {
            if(res.status >= 200 && res.status < 300 ){
                let token = res.data.token // api/login return object {token: e...}
                
                setToken(token);
                window.location.reload(); // uhm...
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    function setToken(token){
        localStorage.setItem('ldap_token', token);
    }

    function getToken(){
        return localStorage.getItem('ldap_token');
    }

    function loggedIn(){
        const token = getToken();
        return !!token;
    }

    return (
        <div>
            <div className="col-md-3">
                <form
                    onSubmit={handleLoginSubmit}
                >   
                    <fieldset>
                        <div className="form-group">
                        <div className="col-md-12">
                            <h2 style={{textAlign: 'center', padding:'10px'}}>meta/fab4</h2>
                        </div>
                        <small className="form-text">Username</small>
                            <input type="text" placeholder="username" className="form-control form-control-sm" required value={username.value} onChange={username.onChange} />
                        </div>

                        <div className="form-group">    
                        <small className="form-text">Password</small>
                            <input type="password" placeholder="password" className="form-control form-control-sm" required value={password.value} onChange={password.onChange} />
                        </div>
                        <small className="form-text text-muted" style={{paddingTop: '10px', paddingBottom: '10px'}}>By logging in, you indicate that you have read and agree meta's Terms of Service.</small>
                        <input type="submit" id="loginSubmit" value="login" disabled={false} className="btn btn-outline-primary btn-block" />
                    </fieldset>
                </form>
            </div>
        </div>
    )

}