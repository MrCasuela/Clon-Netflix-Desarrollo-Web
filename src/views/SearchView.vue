
<template>
  <section class="container py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-4">Buscar Películas</h1>
      <input 
        v-model="q" 
        type="search" 
        placeholder="¿Qué película buscas?" 
        class="w-full bg-gray-900 border border-red-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none text-lg"
      />
    </div>
    
    <div class="grid gap-6 mt-8" style="grid-template-columns: repeat(auto-fill,minmax(200px,1fr));" v-if="results.length > 0">
      <MovieCard v-for="m in results" :key="m.id" :movie="m" />
    </div>
    
    <div class="flex justify-center my-8" v-if="results.length > 0">
      <button 
        @click="load" 
        class="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50" 
        :disabled="loading"
      >
        {{ loading ? 'Cargando...' : 'Más resultados' }}
      </button>
    </div>

    <div v-if="q && results.length === 0 && !loading" class="text-center py-12">
      <p class="text-gray-400 text-lg">No se encontraron resultados para "{{ q }}"</p>
    </div>

    <div v-if="!q" class="text-center py-12">
      <p class="text-gray-400 text-lg">Escribe el nombre de una película para buscar</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { searchMovies } from '../services/tmdb'
import { useDebounce } from '../composables/useDebounce'

const q = ref('')
const debouncedQ = useDebounce(q, 500)
const results = ref<any[]>([])
const page = ref(1)
const loading = ref(false)

async function load(){
  if (!debouncedQ.value || loading.value) return
  loading.value = true
  const data = await searchMovies(debouncedQ.value, page.value)
  results.value.push(...data.results)
  page.value++
  loading.value = false
}

watch(debouncedQ, async ()=>{ results.value=[]; page.value=1; if (debouncedQ.value) await load() })
</script>
