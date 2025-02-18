import axios from 'axios'

const API_URL = 'http://yddfzaez-m3.wsr.ru'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Интерцептор для добавления токена авторизации
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const airportAPI = {
    search: (query) => api.get('/api/airport', { params: { query } })
}

export const flightAPI = {
    search: (params) => api.get('/api/flight', { params }),
    getBooking: (code) => api.get(`/api/booking/${code}`),
    createBooking: (data) => api.post('/api/booking', data),
    setSeat: (code, data) => api.patch(`/api/booking/${code}/seat`, data)
}

export const authAPI = {
    login: (credentials) => api.post('/api/login', credentials),
    register: (userData) => api.post('/api/register', userData),
    getProfile: () => api.get('/user'),
    getBookings: () => api.get('/user/booking')
}

export default api 