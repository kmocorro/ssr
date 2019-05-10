import axios from 'axios'

export default () => {
    return axios.post(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard`);
}