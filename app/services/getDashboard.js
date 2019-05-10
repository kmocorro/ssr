import axios from 'axios'

export default () => {
    return axios.get(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard`, {withCredentials: true});
}