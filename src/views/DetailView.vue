
<template>
  <section class="container py-6" v-if="movie">
    <header class="grid gap-4 md:grid-cols-[200px,1fr]">
      <img :src="poster" :alt="movie.title" class="rounded-md w-[200px] aspect-[2/3] object-cover" />
      <div>
        <h1 class="text-2xl font-semibold mb-2">{{ movie.title }}</h1>
        <p class="text-gray-300 mb-4">{{ movie.overview }}</p>
        <button class="bg-red-600 hover:bg-red-700 rounded-md px-4 py-2" @click="toggleWL()">
          {{ inWatchlist ? 'Quitar de Watchlist' : 'Agregar a Watchlist' }}
        </button>
      </div>
    </header>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMovie } from '../services/tmdb'
import { useUser } from '../stores/useUser'

const route = useRoute()
const user = useUser()
const movie = ref<any|null>(null)
const base = import.meta.env.VITE_TMDB_IMG

onMounted(async ()=>{ movie.value = await getMovie(route.params.id as string) })

const poster = computed(()=> movie.value?.poster_path ? `${base}${movie.value.poster_path}` : '/placeholder.png')
const inWatchlist = computed(()=> !!movie.value && user.watchlist.some(m=>m.id===movie.value.id))
function toggleWL(){
  if (!movie.value) return
  user.toggle({ id: movie.value.id, title: movie.value.title, poster_path: movie.value.poster_path })
}
</script>
