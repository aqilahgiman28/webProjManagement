import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://192.168.68.130:3001/',
    // baseURL: 'https://pms.lepak.xyz/',
    timeout: 30 * 1000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
    }
})

apiService.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        const basicAuth = localStorage.getItem('userToken');
        if (basicAuth) {
            config.headers.Authorization = `Bearer ${basicAuth}`;
            config.headers['x-auth-token'] = basicAuth;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default apiService;
