import axios from 'axios'

export default () => {
    const baseUrl = 'http://dev-metaspf401.sunpowercorp.com:8080/api/dashboard';
    return axios.get(`${baseUrl}`)
}