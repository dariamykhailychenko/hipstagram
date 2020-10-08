import axios from "axios";

axios.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('access_token'),
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const loginFetch = async (userData) => {
    const {data} = await axios.post('https://hipstagram-api.herokuapp.com/auth/login', userData);
    return data;
}

export const registrationFetch = async (userData) => {
    const {data} = await axios.post('https://hipstagram-api.herokuapp.com/auth/registration', userData);
    return data;
}
