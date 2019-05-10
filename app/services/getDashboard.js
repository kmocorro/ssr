import axios from 'axios'

export default (token) => {
    return axios.get(`http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard/${token}`, {withCredentials: true});
}