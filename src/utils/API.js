import axios from 'axios'
import Router from "next/router";
import Cookies from 'js-cookie'

export const baseURL = 'http://45.82.68.151:9000'
export const API = axios.create({
    baseURL,
})
export const server = axios.create({
    baseURL,
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('Token')}`
    return config
})

API.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
        Router.push('/login')
    }
    return Promise.reject(error)
})