import axios from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

import { authOptions } from './auth'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api', // URL base del backend
  timeout: 10000 // Timeout de 10 segundos
})

// Interceptor para manejar errores globales
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error.response?.data || error.message)

    return Promise.reject(error.response?.data || error.message)
  }
)

axiosInstance.interceptors.request.use(async config => {
  let session

  // En el servidor usamos getServerSession
  if (typeof window === 'undefined') {
    session = await getServerSession(authOptions)
  } else {
    // En el cliente usamos getSession
    session = await getSession()
  }

  // Si hay un token de acceso, lo agregamos a las cabeceras
  if (session?.accessToken) {
    config.headers['Authorization'] = `Bearer ${session.accessToken}`
  }
  // console.log('config', config)
  return config
})

export default axiosInstance
