import axios from 'axios'
import Router from "next/router";


export const baseURL = ''
export const server = axios.create({
    baseURL,
})
export const API = axios.create({
    baseURL,
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Token')}`
    return config
})

API.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
        Router.push('/login')
    }
    return Promise.reject(error)
})