import axios from 'axios'
import store from '../store'

const settingsAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

settingsAxios.interceptors.response.use(null, error => {
    if (error.response && error.response.status === 401) {
        console.log('status=401');
        store.commit("auth/LOGOUT")
    }
    return Promise.reject(error)
})

export default settingsAxios
