import axios from 'axios'

export default (token) => {
    //axios.defaults.withCredentials = true;

    return axios.post(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard`, token, {withCredentials: true});

}