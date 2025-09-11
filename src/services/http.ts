
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_TOKEN
  },
  headers: { 
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejar errores
http.interceptors.response.use(
  response => {
    console.log('API Success:', response.config.url, response.data)
    return response
  },
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      apiKey: import.meta.env.VITE_TMDB_TOKEN ? 'Set' : 'Not set'
    })
    return Promise.reject(error)
  }
)

export default http
