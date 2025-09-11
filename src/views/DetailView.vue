
<template>
  <section class="container py-8" v-if="movie">
    <!-- Hero Section con Backdrop -->
    <div 
      v-if="movie.backdrop_path" 
      class="relative h-96 mb-8 rounded-lg overflow-hidden"
      :style="`background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(movie.backdrop_path, 'w1280')}); background-size: cover; background-position: center;`"
    >
      <div class="absolute bottom-0 left-0 p-8">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">{{ movie.title }}</h1>
        <div class="flex items-center gap-4 text-white/90">
          <span v-if="movie.release_date" class="text-lg">{{ new Date(movie.release_date).getFullYear() }}</span>
          <span v-if="movie.vote_average" class="flex items-center text-yellow-400 text-lg">
            ⭐ {{ movie.vote_average.toFixed(1) }}/10
          </span>
          <span v-if="movie.runtime" class="text-lg">{{ movie.runtime }} min</span>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="grid gap-8 md:grid-cols-[300px,1fr]">
      <!-- Poster (solo si no hay backdrop) -->
      <div v-if="!movie.backdrop_path" class="flex justify-center md:justify-start">
        <img 
          :src="poster" 
          :alt="movie.title" 
          class="rounded-lg shadow-2xl w-[300px] aspect-[2/3] object-cover" 
        />
      </div>
      
      <!-- Información de la película -->
      <div class="space-y-6" :class="{ 'md:col-span-2': movie.backdrop_path }">
        <!-- Título (si no hay backdrop) -->
        <div v-if="!movie.backdrop_path">
          <h1 class="text-4xl font-bold text-white mb-2">{{ movie.title }}</h1>
          <div class="flex items-center gap-4 text-gray-300 mb-4">
            <span v-if="movie.release_date" class="text-sm">{{ new Date(movie.release_date).getFullYear() }}</span>
            <span v-if="movie.vote_average" class="flex items-center text-yellow-400">
              ⭐ {{ movie.vote_average.toFixed(1) }}/10
            </span>
            <span v-if="movie.runtime" class="text-sm">{{ movie.runtime }} min</span>
          </div>
        </div>
        
        <!-- Botones de acción -->
        <div class="flex gap-4">
          <button 
            class="px-8 py-3 font-semibold rounded-md transition-all duration-200 transform hover:scale-105"
            :class="inWatchlist 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'"
            @click="toggleWL()"
          >
            {{ inWatchlist ? '✓ En mi lista' : '+ Agregar a mi lista' }}
          </button>
          
          <button 
            v-if="trailerUrl"
            @click="showTrailer = true"
            class="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            ▶️ Ver Trailer
          </button>
        </div>

        <!-- Sinopsis -->
        <div v-if="movie.overview">
          <h3 class="text-xl font-semibold text-white mb-3">Sinopsis</h3>
          <p class="text-gray-300 leading-relaxed text-lg">{{ movie.overview }}</p>
        </div>

        <!-- Información adicional en grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Géneros -->
          <div v-if="movie.genres && movie.genres.length > 0">
            <h3 class="text-lg font-semibold text-white mb-3">Géneros</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="genre in movie.genres" 
                :key="genre.id"
                class="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-red-500 transition-colors"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>

          <!-- Cast principal -->
          <div v-if="movie.credits && movie.credits.cast && movie.credits.cast.length > 0">
            <h3 class="text-lg font-semibold text-white mb-3">Reparto</h3>
            <div class="space-y-1">
              <p 
                v-for="actor in movie.credits.cast.slice(0, 5)" 
                :key="actor.id"
                class="text-gray-300 text-sm"
              >
                <span class="font-medium">{{ actor.name }}</span>
                <span v-if="actor.character" class="text-gray-500"> como {{ actor.character }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Información técnica -->
        <div class="grid md:grid-cols-3 gap-4 p-4 bg-gray-900/50 rounded-lg">
          <div v-if="movie.release_date">
            <h4 class="text-sm font-semibold text-gray-400 mb-1">Fecha de estreno</h4>
            <p class="text-white">{{ new Date(movie.release_date).toLocaleDateString('es-ES') }}</p>
          </div>
          <div v-if="movie.original_language">
            <h4 class="text-sm font-semibold text-gray-400 mb-1">Idioma original</h4>
            <p class="text-white uppercase">{{ movie.original_language }}</p>
          </div>
          <div v-if="movie.budget">
            <h4 class="text-sm font-semibold text-gray-400 mb-1">Presupuesto</h4>
            <p class="text-white">${{ movie.budget.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal del Trailer -->
    <div 
      v-if="showTrailer && trailerUrl"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="showTrailer = false"
    >
      <div class="relative w-full max-w-4xl aspect-video" @click.stop>
        <button 
          @click="showTrailer = false"
          class="absolute -top-10 right-0 text-white hover:text-red-500 text-2xl font-bold z-10"
        >
          ✕ Cerrar
        </button>
        <iframe 
          :src="trailerUrl + '?autoplay=1'"
          class="w-full h-full rounded-lg"
          frameborder="0"
          allowfullscreen
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  </section>

  <!-- Loading State -->
  <div v-else class="container py-20 text-center">
    <div class="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
    <p class="text-gray-400">Cargando película...</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMovie, getImageUrl, getTrailerUrl } from '../services/tmdb'
import { useUser } from '../stores/useUser'

const route = useRoute()
const user = useUser()
const movie = ref<any|null>(null)
const showTrailer = ref(false)

onMounted(async () => { 
  movie.value = await getMovie(route.params.id as string) 
})

const poster = computed(() => getImageUrl(movie.value?.poster_path))
const trailerUrl = computed(() => {
  if (!movie.value?.videos?.results) return null
  return getTrailerUrl(movie.value.videos.results)
})

const inWatchlist = computed(() => !!movie.value && user.watchlist.some(m => m.id === movie.value.id))

function toggleWL() {
  if (!movie.value) return
  user.toggle({ id: movie.value.id, title: movie.value.title, poster_path: movie.value.poster_path })
}
</script>
