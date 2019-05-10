import axios from 'axios'

export default () => {
    //axios.defaults.withCredentials = true;

    return axios.post(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard`, {withCredentials: true});

}