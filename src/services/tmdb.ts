
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
