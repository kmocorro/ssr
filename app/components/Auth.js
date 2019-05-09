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
            fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif !important",
            fontSize: "14px",
            width: "360px",
            /* max-height: 100vh; */
            borderRadius: "5px",
            whiteSpace: "normal",
            backgroundColor: "#fff",
            backgroundColor: "#fff",
            boxShadow: "0 12px 40px rgba(0, 0, 0, .12)",
            color: "#46526b",
            msOverflowStyle: "none",
            overflowY: "scroll",
        }}>
            <div style={{
                opacity: "0.9",
                transition: "opacity 0.3s ease-in 0s",
                background: "radial-gradient(#40404b, #111118) rgba(34, 34, 40, .94)",
                position: "fixed",
                top: "0",
                bottom: "0",
                right: "0",
                left: "0",
                zIndex: "-1",
                opacity: "0",
                transition: "opacity 0.2s ease-in 0.4s"
            }}>
                <form
                    onSubmit={handleLoginSubmit}
                    style={{
                        opacity: "1",
                        WebkitTransform: "translateY(0%) scale(1)",
                        transform: "translateY(0%) scale(1)",
                        margin: "0",
                        padding: "0",
                        position: "relative",
                        display: "block",
                    }}
                >   
                    <fieldset>
                        <div>
                        <div>
                            <h2 style={{textAlign: 'center', padding:'10px'}}>meta/fab4</h2>
                        </div>
                        <small>Username</small>
                            <div>
                            <input type="text" placeholder="username" required value={username.value} onChange={username.onChange} style={{
                                    WebkitAppearance: "none",
                                    textAlign: "left",
                                    border: "1px solid #b3bac7",
                                    marginTop: "-1px",
                                    fontFamily: "inherit",
                                    fontSize: "14px",
                                    color: "#333C4D",
                                    height: "48px",
                                    outline: "none",
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                    width: "100%",
                                    transition: "border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
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
    )

}