import Cookies from 'universal-cookie'

export default () => {
    const cookies = new Cookies(req.headers.cookie);

    const cookie_ = cookies.get('ldap_token');

    console.log();
    return cookie_;
}