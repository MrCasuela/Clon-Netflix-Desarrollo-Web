
<template>
  <section class="container py-8">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-white">Películas Populares</h1>
      <select v-model.number="genreId" class="bg-gray-900 border border-red-600 rounded-md px-4 py-2 text-white focus:border-red-500 focus:outline-none">
        <option :value="0">Todos los géneros</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
    </header>

    <div class="grid gap-6" style="grid-template-columns: repeat(auto-fill,minmax(200px,1fr));">
      <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
    </div>

    <div v-if="loading && movies.length === 0" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-400">Cargando películas...</p>
    </div>

    <div class="flex justify-center my-8" v-if="movies.length > 0">
      <button 
        @click="load" 
        class="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50" 
        :disabled="loading"
      >
        {{ loading ? 'Cargando...' : 'Cargar más películas' }}
      </button>
    </div>

    <div v-if="movies.length === 0 && !loading" class="text-center py-12">
      <div class="text-6xl mb-4">🎬</div>
      <p class="text-gray-400 text-xl mb-4">No se encontraron películas</p>
      <p class="text-gray-500 text-sm">Verifica tu conexión a internet y la configuración de la API</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { getTrending, discoverByGenre, getGenres } from '../services/tmdb'
import { tmdbFetch } from '../services/tmdb-fetch'
import { tmdbDirect } from '../services/tmdb-direct'

const movies = ref<any[]>([])
const page = ref(1)
const loading = ref(false)
const genreId = ref(0)
const genres = ref<{id:number;name:string}[]>([])

async function load(){
  if (loading.value) return
  console.log('Loading movies...', { genreId: genreId.value, page: page.value })
  loading.value = true
  try {
    // Probamos la versión directa primero
    console.log('Trying direct fetch...')
    const data = await tmdbDirect.getTrending(page.value)
    console.log('Movies loaded successfully:', data)
    movies.value.push(...data.results)
    page.value++
  } catch (error) {
    console.error('Error loading movies:', error)
  } finally {
    loading.value = false
  }
}

async function loadGenres() {
  try {
    console.log('Loading genres...')
    // Probamos la versión directa primero
    genres.value = await tmdbDirect.getGenres()
    console.log('Genres loaded successfully:', genres.value)
  } catch (error) {
    console.error('Error loading genres:', error)
  }
}

watch(genreId, async ()=>{ 
  movies.value = []
  page.value = 1
  await load() 
})

onMounted(async () => {
  console.log('Component mounted, starting to load data...')
  console.log('Environment variables:', {
    VITE_TMDB_BASE_URL: import.meta.env.VITE_TMDB_BASE_URL,
    VITE_TMDB_TOKEN: import.meta.env.VITE_TMDB_TOKEN ? 'Set' : 'Not set',
    VITE_TMDB_IMG: import.meta.env.VITE_TMDB_IMG,
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV
  })
  await loadGenres()
  await load()
})
</script>
