import axios from 'axios'
import { paths } from "../paths"

const instance = axios.create({
    baseURL: paths.host
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance
