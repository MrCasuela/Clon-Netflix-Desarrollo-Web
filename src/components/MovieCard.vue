
<template>
  <article class="group cursor-pointer transform transition-all duration-300 hover:scale-105" @click="$router.push({ name:'detail', params:{ id: movie.id } })">
    <div class="relative overflow-hidden rounded-lg shadow-lg">
      <img 
        :src="imgUrl" 
        :alt="movie.title" 
        class="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div class="text-white">
          <h3 class="font-bold text-sm mb-2 line-clamp-2">{{ movie.title }}</h3>
          <div class="flex items-center justify-between">
            <small v-if="movie.vote_average" class="flex items-center text-yellow-400">
              ⭐ {{ movie.vote_average.toFixed(1) }}
            </small>
            <small class="text-gray-300 text-xs">Ver más</small>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-3 px-1">
      <h3 class="font-medium text-white text-sm line-clamp-1 group-hover:text-red-500 transition-colors">
        {{ movie.title }}
      </h3>
    </div>
  </article>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { getImageUrl } from '../services/tmdb'

const props = defineProps<{ movie: { id:number; title:string; poster_path:string|null; vote_average?:number } }>()
const imgUrl = computed(() => getImageUrl(props.movie.poster_path))
</script>
