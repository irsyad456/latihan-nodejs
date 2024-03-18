import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded && decoded.exp > Date.now() / 1000;
    }
    return false;
};

export default isAuthenticated;