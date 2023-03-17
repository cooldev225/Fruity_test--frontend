import axios from 'axios';
import { baseUrl } from '../services/settings';

const instance = axios.create({
    baseURL: baseUrl(''),
});

// instance.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });

instance.interceptors.request.use(function (config) {
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
});


export default instance;