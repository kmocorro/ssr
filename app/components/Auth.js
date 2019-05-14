import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default () => {

    const username = useCredential();
    const password = useCredential();
    const cookies = new Cookies();
    
    const [ loginResponse, setLoginResponse ] = useState(null);

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
                
                if(token){

                    setToken(token);
                    console.log(token);
                    
                    location.reload();
                } else {

                    location.reload();

                }

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
                background: "#fff",
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
                                <div>
                                    <input type="password" placeholder="password" required value={password.value} onChange={password.onChange} />
                                </div>
                            </div>
                            <small style={{
                                margin: '10px',
                                opacity: "0.5"
                            }}>By logging in, you indicate that you have read and agree meta's Terms of Service.
                            </small>
                            <div>
                                <input type="submit" id="loginSubmit" value="login" disabled={false} style={{
                                    display: "inline-flex",
                                    verticalAlign: "middle",
                                    WebkitBoxAlign: "center",
                                    alignItems: "center",
                                    WebkitBoxPack: "center",
                                    justifyContent: "center",
                                    minWidth: "96px",
                                    minHeight: "38px",
                                    lineHeight: "38px",
                                    marginTop: "0px",
                                    marginLeft: "0px",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                    letterSpacing: "1px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    color: "rgb(250, 250, 250)",
                                    opacity: "1",
                                    cursor: "pointer",
                                    background: "rgb(235, 84, 36)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgb(235, 84, 36)",
                                    borderImage: "initial",
                                    borderRadius: "3px",
                                    padding: "0px 24px",
                                    transition: "border-color 0.25s ease 0s, background 0.25s ease 0s",
                                }}/>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
                
            </div>
        </div>
    )

}