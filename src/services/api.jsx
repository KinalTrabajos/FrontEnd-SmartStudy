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

export const addPublication = async(data)=>{
    try {
        return await apiStudy.post('/publications/',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewPublication = async()=> {
    try {
        return await apiStudy.get('/publications/')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const deletePublication = async(id) => {
    try {
        return await apiStudy.delete(`/publications/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const updatePublication = async(id, data)=>{
    try {
        return await apiStudy.put(`/publications/${id}`,data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const addComent = async(data) => {
    try {
        return await apiStudy.post('/comments', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const viewCommentidpublication = async(id) => {
    try {
        return await apiStudy.get(`/comments/post/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

