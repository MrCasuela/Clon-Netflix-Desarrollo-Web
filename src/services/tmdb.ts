
import http from './http'

export const getTrending = (page=1) =>
  http.get('/trending/movie/week',{ params:{ page } }).then(r=>r.data)

export const getGenres = () =>
  http.get('/genre/movie/list').then(r=>r.data.genres)

export const discoverByGenre = (genreId:number, page=1) =>
  http.get('/discover/movie',{ params:{ with_genres: genreId, page, sort_by:'popularity.desc' } }).then(r=>r.data)

export const searchMovies = (q:string, page=1) =>
  http.get('/search/movie',{ params:{ query:q, page, include_adult:false } }).then(r=>r.data)

export const getMovie = (id:string|number) =>
  http.get(`/movie/${id}`,{ params:{ append_to_response:'videos,images,credits' } }).then(r=>r.data)

// Funciones adicionales que podrías usar
export const getPopularMovies = (page=1) =>
  http.get('/movie/popular',{ params:{ page } }).then(r=>r.data)

export const getTopRatedMovies = (page=1) =>
  http.get('/movie/top_rated',{ params:{ page } }).then(r=>r.data)

export const getNowPlayingMovies = (page=1) =>
  http.get('/movie/now_playing',{ params:{ page } }).then(r=>r.data)

// Obtener videos/trailers de una película
export const getMovieVideos = (id: string | number) =>
  http.get(`/movie/${id}/videos`).then(r => r.data.results)

// Helper para construir URLs de imágenes
export const getImageUrl = (path: string | null, size = 'w500'): string => {
  if (!path) return '/placeholder.png'
  return `${import.meta.env.VITE_TMDB_IMG.replace('w500', size)}${path}`
}

// Helper para obtener trailer de YouTube
export const getTrailerUrl = (videos: any[]): string | null => {
  if (!videos || videos.length === 0) return null
  
  // Buscar trailer oficial en YouTube
  const trailer = videos.find(video => 
    video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser') &&
    video.official === true
  )
  
  // Si no hay trailer oficial, buscar cualquier trailer
  const anyTrailer = videos.find(video => 
    video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  )
  
  const selectedVideo = trailer || anyTrailer
  
  return selectedVideo ? `https://www.youtube.com/embed/${selectedVideo.key}` : null
}
