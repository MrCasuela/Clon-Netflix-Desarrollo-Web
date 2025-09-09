
import axios from 'axios'
const http = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
})
export default http
