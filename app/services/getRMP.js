import axios from 'axios'

export default (token) => {
    return axios.get(`http://dev-metaspf401.sunpowercorp.com:8081/api/rmp/${token}`, {withCredentials: true});
}