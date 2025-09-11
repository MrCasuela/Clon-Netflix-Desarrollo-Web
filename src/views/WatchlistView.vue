
<template>
  <section class="container py-8">
    <h2 class="text-3xl font-bold text-white mb-8">Mi Lista</h2>
    
    <div v-if="!items.length" class="text-center py-12">
      <div class="text-6xl mb-4">🎬</div>
      <p class="text-gray-400 text-xl mb-4">Tu lista está vacía</p>
      <p class="text-gray-500">Agrega películas desde los detalles para verlas aquí</p>
      <RouterLink 
        :to="{name:'home'}" 
        class="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
      >
        Explorar películas
      </RouterLink>
    </div>
    
    <div class="grid gap-6" style="grid-template-columns: repeat(auto-fill,minmax(200px,1fr));" v-else>
      <MovieCard v-for="m in items" :key="m.id" :movie="{ id:m.id, title:m.title, poster_path:m.poster_path }" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUser } from '../stores/useUser'
import MovieCard from '../components/MovieCard.vue'
import { RouterLink } from 'vue-router'

const user = useUser()
const { watchlist: items } = storeToRefs(user)
</script>
