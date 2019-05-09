import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default () => {

    const username = useCredential();
    const password = useCredential();
    const cookies = new Cookies();

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
                console.log(token);
                
                location.reload();

            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    function setToken(token){
        cookies.set('ldap_token', token, {path: '*'});
    }

    function getToken(){
        return cookies.get('ldap_token');
        
    }

    function loggedIn(){
        const token = getToken();
        return !!token;
    }

    return (
        <div>
            <div>
                <form
                    onSubmit={handleLoginSubmit}
                >   
                    <fieldset>
                        <div>
                        <div>
                            <h2 style={{textAlign: 'center', padding:'10px'}}>meta/fab4</h2>
                        </div>
                        <small>Username</small>
                            <input type="text" placeholder="username" required value={username.value} onChange={username.onChange} />
                        </div>

                        <div>    
                        <small>Password</small>
                            <input type="password" placeholder="password" required value={password.value} onChange={password.onChange} />
                        </div>
                        <small style={{paddingTop: '10px', paddingBottom: '10px'}}>By logging in, you indicate that you have read and agree meta's Terms of Service.</small>
                        <input type="submit" id="loginSubmit" value="login" disabled={false}/>
                    </fieldset>
                </form>
            </div>
        </div>
    )

}