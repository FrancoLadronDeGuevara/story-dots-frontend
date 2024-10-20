import axios from 'axios';
import Cookies from 'js-cookie';

const clientAxios = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


clientAxios.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


clientAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 400 && error.response.data.errors) {
                return Promise.reject(error.response.data.errors);
              }
              return Promise.reject(error.response.data.message || 'Error en la solicitud');
        } else if (error.request) {
            return Promise.reject('No se recibió respuesta del servidor');
        } else {
            return Promise.reject('Error en la configuración de la solicitud');
        }
    }
);

export default clientAxios;
