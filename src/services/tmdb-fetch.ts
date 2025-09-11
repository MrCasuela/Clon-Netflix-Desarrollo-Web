// Servicio alternativo usando fetch nativo para debugging
const API_KEY = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// Verificar que las variables estén definidas
console.log('TMDB Service Configuration:', {
  API_KEY: API_KEY || 'MISSING',
  BASE_URL: BASE_URL || 'MISSING',
  env: import.meta.env
})

export const tmdbFetch = {
  async getTrending(page = 1) {
    console.log('Fetching trending movies...', { 
      API_KEY: API_KEY ? 'Set' : 'Not set', 
      BASE_URL,
      page 
    })
    
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    console.log('Request URL:', url)
    
    try {
      const response = await fetch(url)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('HTTP Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      return data
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  },

  async getGenres() {
    console.log('Fetching genres...')
    
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    console.log('Genres URL:', url)
    
    try {
      const response = await fetch(url)
      console.log('Genres response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Genres HTTP Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Genres data:', data)
      
      return data.genres
    } catch (error) {
      console.error('Genres fetch error:', error)
      throw error
    }
  }
}
