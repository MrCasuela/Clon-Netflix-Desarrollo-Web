
<template>
  <section class="container py-4">
    <header class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Tendencias</h1>
      <select v-model.number="genreId" class="bg-gray-900 border border-gray-800 rounded-md px-3 py-2">
        <option :value="0">Todos</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
    </header>

    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill,minmax(160px,1fr));">
      <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
    </div>

    <div class="flex justify-center my-6">
      <button @click="load" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Cargar más' }}
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { getTrending, discoverByGenre, getGenres } from '../services/tmdb'

const movies = ref<any[]>([])
const page = ref(1)
const loading = ref(false)
const genreId = ref(0)
const genres = ref<{id:number;name:string}[]>([])

async function load(){
  if (loading.value) return
  loading.value = true
  const data = genreId.value ? await discoverByGenre(genreId.value, page.value) : await getTrending(page.value)
  movies.value.push(...data.results)
  page.value++
  loading.value = false
}

genres.value = await getGenres()
watch(genreId, async ()=>{ movies.value=[]; page.value=1; await load() }, { immediate:true })
</script>
