import axios from 'axios';

const apiStudy = axios.create({
    baseURL: 'http://localhost:8080/TDAHSystem/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

apiStudy.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const token = JSON.parse(user).token;
            config.headers['x-token'] = token; 
        }
        return config;
    },
    (e) => Promise.reject(e)
)


export const login = async (data) => {
    try {
        return await apiStudy.post('/auth/login', data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const register = async(data) => {
    try {
        return await apiStudy.post('/auth/register',data)        
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

