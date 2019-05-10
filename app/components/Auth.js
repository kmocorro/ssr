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
        cookies.set('ldap_token', token, {path: '/'});
    }

    function getToken(){
        return cookies.get('ldap_token');
        
    }

    function loggedIn(){
        const token = getToken();
        return !!token;
    }

    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
        }}>
            <div style={{
                width: "100%",
                minHeight: "100vh",
                display: "-webkit-box",
                display: "-webkit-flex",
                display: "-moz-box",
                display: "-ms-flexbox",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                background: "#f2f2f2",
            }}>
                <div style={{
                    width: "390px",
                    background: "#fff",
                    borderRadius: "10px",
                    overflow: "hidden",
                    padding: "77px 55px 33px 55px",
                }}>
                    <form
                        onSubmit={handleLoginSubmit}
                        style={{
                            width: "100%",
                            margin: "0px",
                            padding: "0px",
                            boxSizing: "border-box"
                        }}
                    >   
                        <fieldset>
                            <div>
                                <div>
                                    <h2 style={{
                                        display: "block",
                                        fontFamily: "Poppins-Bold",
                                        fontSize: "30px",
                                        color: "#333333",
                                        lineHeight: "1.2",
                                        textAlign: "center",
                                        paddingBottom: "26px",
                                    }}>meta/fab4</h2>
                                </div>
                                <small>Username</small>
                                    <div style={{
                                    }}>
                                        <input type="text" placeholder="username" required value={username.value} onChange={username.onChange} 
                                            style={{
                                        }} />
                                    </div>
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
        </div>
    )

}