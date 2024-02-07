import axios from 'axios';
const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});


// Manejo de errores global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes hacer el manejo global de errores
    console.error('Error en la solicitud archivo /services/api:', error);

    // Puedes propagar el error para que se maneje en el lugar donde se hizo la solicitud
    return Promise.reject(error);
  }
);



export default api;
