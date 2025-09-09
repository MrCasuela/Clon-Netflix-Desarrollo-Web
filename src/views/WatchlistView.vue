
<template>
  <section class="container py-6">
    <h2 class="text-xl font-semibold mb-4">Mi Watchlist</h2>
    <p v-if="!items.length" class="text-gray-400">Aún no agregas películas.</p>
    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill,minmax(160px,1fr));" v-else>
      <MovieCard v-for="m in items" :key="m.id" :movie="{ id:m.id, title:m.title, poster_path:m.poster_path }" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUser } from '../stores/useUser'
import MovieCard from '../components/MovieCard.vue'

const user = useUser()
const { watchlist: items } = storeToRefs(user)
</script>
