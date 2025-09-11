// Test directo sin variables de entorno
export const tmdbDirect = {
  async getTrending(page = 1) {
    console.log('Direct fetch - getTrending...')
    
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=fa19cf8c49d6a5226f514893a8aeaec8&page=${page}`
    console.log('Direct URL:', url)
    
    try {
      const response = await fetch(url)
      console.log('Direct response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Direct HTTP Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Direct response data:', data)
      
      return data
    } catch (error) {
      console.error('Direct fetch error:', error)
      throw error
    }
  },

  async getGenres() {
    console.log('Direct fetch - getGenres...')
    
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=fa19cf8c49d6a5226f514893a8aeaec8`
    console.log('Direct genres URL:', url)
    
    try {
      const response = await fetch(url)
      console.log('Direct genres response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Direct genres HTTP Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Direct genres data:', data)
      
      return data.genres
    } catch (error) {
      console.error('Direct genres fetch error:', error)
      throw error
    }
  }
}
