import axios from 'axios'

export default () => {
    const baseUrl = 'http://dev-metaspf401.sunpowercorp.com:8080/';
    return axios.get(`${baseUrl}`)
}