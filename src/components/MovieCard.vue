
<template>
  <article class="cursor-pointer" @click="$router.push({ name:'detail', params:{ id: movie.id } })">
    <img :src="imgUrl" :alt="movie.title" class="rounded-md w-full aspect-[2/3] object-cover" />
    <div class="flex items-center justify-between mt-2 text-sm">
      <h3 class="font-medium line-clamp-1">{{ movie.title }}</h3>
      <small v-if="movie.vote_average">⭐ {{ movie.vote_average.toFixed(1) }}</small>
    </div>
  </article>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ movie: { id:number; title:string; poster_path:string|null; vote_average?:number } }>()
const base = import.meta.env.VITE_TMDB_IMG
const imgUrl = computed(()=> props.movie.poster_path ? `${base}${props.movie.poster_path}` : '/placeholder.png')
</script>
