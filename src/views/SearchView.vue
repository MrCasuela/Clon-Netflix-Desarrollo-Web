
<template>
  <section class="container py-4">
    <input v-model="q" type="search" placeholder="Buscar..." class="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2" />
    <div class="grid gap-4 mt-4" style="grid-template-columns: repeat(auto-fill,minmax(160px,1fr));">
      <MovieCard v-for="m in results" :key="m.id" :movie="m" />
    </div>
    <div class="flex justify-center my-6" v-if="results.length">
      <button @click="load" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Más resultados' }}
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { searchMovies } from '../services/tmdb'

const q = ref('')
const results = ref<any[]>([])
const page = ref(1)
const loading = ref(false)

async function load(){
  if (!q.value || loading.value) return
  loading.value = true
  const data = await searchMovies(q.value, page.value)
  results.value.push(...data.results)
  page.value++
  loading.value = false
}

watch(q, async ()=>{ results.value=[]; page.value=1; if (q.value) await load() })
</script>
