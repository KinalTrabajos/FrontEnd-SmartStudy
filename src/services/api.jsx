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

export const createTask = async(data) => {
    try {
        return await apiStudy.post('/toDoList/create-ToDoList',data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getTask = async() => {
    try {
        return await apiStudy.get('/toDoList/get-ToDosList')
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const deleteTask = async(id) => {
    try {
        return await apiStudy.delete(`/toDoList/delete-ToDoList/${id}`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const updateTask = async (id ,data) => {
    try {
        return await apiStudy.put(`/toDoList/update-ToDoList/${id}`, data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getCategory = async() => {
    try {
        return await apiStudy.get('/categorySubject/viewSubject')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getEvents = async() => {
    try {
        return await apiStudy.get('/event/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createEvent = async(data) => {
    try {
        return await apiStudy.post('/event/',data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
} 

export const updateEvent = async(id, data) => {
    try {
        return await apiStudy.put(`/event/${id}`,data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getInformationUser = async() => {
    try {
        return await apiStudy.get(`/users/viewUserbyId`)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}